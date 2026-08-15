/* =====================================================
   Cabinet Studio
   Application Core
   Milestone 1
===================================================== */


const App = {

    version: "1.0",

    project: {

        name: "Untitled Project",

        cabinets: 0,

        parts: 0,

        sheets: 0

    },


    settings: {

        theme: "dark"

    },


    init(){

        this.bindEvents();

        this.load();

        this.updateStats();

        this.notify(
            "System initialized successfully"
        );

    },





    bindEvents(){

        const themeBtn = document.getElementById("themeBtn");
        if (themeBtn) {
            themeBtn.addEventListener("click", () => this.toggleTheme());
        }

        const commandBtn = document.getElementById("commandBtn");
        if (commandBtn) {
            commandBtn.addEventListener("click", () => this.openCommand());
        }

        const startBtn = document.getElementById("startBtn");
        if (startBtn) {
            startBtn.addEventListener("click", () => this.createProject());
        }

        const generateBtn = document.getElementById("generateBtn");
        if (generateBtn) {
            generateBtn.addEventListener("click", () => this.generate());
        }

        const saveBtn = document.getElementById("saveBtn");
        if (saveBtn) {
            saveBtn.addEventListener("click", () => this.save());
        }

        const newProjectBtn = document.getElementById("newProjectBtn");
        if (newProjectBtn) {
            newProjectBtn.addEventListener("click", () => this.openNewProjectModal());
        }

        // Inspector generate / auto layout bindings
        const generateInspector = document.getElementById('generateBtnInspector');
        if (generateInspector) {
            generateInspector.addEventListener('click', () => this.generate());
        }
        const autoLayoutBtn = document.getElementById('autoLayoutBtn');
        if (autoLayoutBtn && window.AutoLayoutUI) {
            autoLayoutBtn.addEventListener('click', () => AutoLayoutUI.generate());
        }
        const autoDesignBtn = document.querySelector('.btn-special');
        if (autoDesignBtn && window.AutoLayoutUI) {
            autoDesignBtn.addEventListener('click', () => AutoLayoutUI.generate());
        }

        const commandPalette = document.getElementById("commandPalette");
        if (commandPalette) {
            commandPalette.addEventListener("click", (e)=>{
                if (e.target.id === "commandPalette") {
                    this.closeCommand();
                }
            });
        }

        const commandInput = document.getElementById("commandInput");
        if (commandInput) {
            commandInput.addEventListener("keydown", (e)=>{
                if (e.key === "Enter") {
                    this.executeCommand(e.target.value);
                }
            });
        }

        // Material select: populate from PGBoardCatalog and wire change
        const materialSelect = document.getElementById('materialSelect');
        if (materialSelect && window.PGBoardCatalog) {
            try {
                const list = window.PGBoardCatalog.list();
                materialSelect.innerHTML = list.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
                // set current value from Project if available
                if (typeof Project !== 'undefined' && Project.settings && Project.settings.materialId) {
                    materialSelect.value = Project.settings.materialId;
                }
                materialSelect.addEventListener('change', (e) => {
                    const id = e.target.value;
                    if (typeof Project !== 'undefined' && Project.settings) {
                        Project.settings.materialId = id;
                    }
                    try { DesignStorage.saveProject(Project); } catch (err) { /* ignore */ }
                    this.notify('Material selected: ' + (window.PGBoardCatalog.get(id)?.name || id));
                });
            } catch (err) {
                console.warn('Failed to populate material select', err);
            }
        }

        document.addEventListener("keydown", (e)=>{
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                this.openCommand();
            }

            if (e.key === "Escape") {
                this.closeCommand();
            }
        });

    },





    createProject(){


        this.project.cabinets = 1;

        this.project.parts = 12;

        this.project.sheets = 2;


        this.updateStats();


        this.notify(
            "New cabinet project created"
        );


    },





    generate(){

        const sourceProject = typeof Project !== "undefined" ? Project : this.project;
        const parts = (typeof CabinetEngine !== "undefined" && typeof CabinetEngine.generate === "function")
            ? CabinetEngine.generate(sourceProject)
            : [];

        const tableBody = document.querySelector("#cutListTable tbody");
        if (tableBody) {
            tableBody.innerHTML = "";
            parts.forEach(part => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${part.name}</td>
                    <td>${Number(part.width || 0).toFixed(1)}</td>
                    <td>${Number(part.height || 0).toFixed(1)}</td>
                    <td>${Number(part.material === "Melamine" ? 16 : 0) || 16}</td>
                    <td>${part.quantity || 1}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        this.project.cabinets = sourceProject && Array.isArray(sourceProject.compartments) ? sourceProject.compartments.length : 0;
        this.project.parts = parts.length;
        this.project.sheets = Math.max(1, Math.ceil(this.project.parts / 4));
        this.updateStats();

        // Open 3D modal with canvas and initialize engine inside it
        this.open3DModal();
        if (window.iDesign && window.iDesign.Cabinet && typeof window.iDesign.Cabinet.build === "function") {
            // build will render into the engine's scene; ensure engine init targets the modal container
            if (window.iDesign.Engine && typeof window.iDesign.Engine.init === 'function') {
                window.iDesign.Engine.init('threeViewerModal');
            }
            window.iDesign.Cabinet.build(sourceProject && sourceProject.settings ? sourceProject.settings : {});
        }

        this.notify(parts.length ? "Cabinet generated successfully" : "Generator ready for cabinet engine");

    },

    // 3D modal control
    open3DModal(){
        let modal = document.getElementById('threeModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'threeModal';
            modal.style.position = 'fixed';
            modal.style.top = '50%';
            modal.style.left = '50%';
            modal.style.transform = 'translate(-50%, -50%)';
            modal.style.width = '80%';
            modal.style.height = '80%';
            modal.style.background = 'var(--gh-canvas)';
            modal.style.border = '1px solid var(--gh-border)';
            modal.style.borderRadius = '8px';
            modal.style.zIndex = 2000;
            modal.style.display = 'flex';
            modal.style.flexDirection = 'column';

            const header = document.createElement('div');
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.padding = '8px';
            header.style.borderBottom = '1px solid var(--gh-border)';

            const title = document.createElement('div');
            title.textContent = '3D Preview';
            title.style.color = 'var(--gh-text)';

            const closeBtn = document.createElement('button');
            closeBtn.textContent = 'Close';
            closeBtn.className = 'btn-danger';
            closeBtn.style.marginLeft = '8px';
            closeBtn.addEventListener('click', () => modal.remove());

            header.appendChild(title);
            header.appendChild(closeBtn);
            modal.appendChild(header);

            const viewer = document.createElement('div');
            viewer.id = 'threeViewerModal';
            viewer.style.flex = '1';
            viewer.style.minHeight = '300px';
            modal.appendChild(viewer);

            document.body.appendChild(modal);

            // make draggable
            this._makeDraggable(modal, header);
        }
    },

    _makeDraggable(el, handle){
        let isDown = false, startX=0, startY=0, origX=0, origY=0;
        handle.style.cursor = 'move';
        handle.addEventListener('pointerdown', (e)=>{ isDown=true; startX=e.clientX; startY=e.clientY; const rect=el.getBoundingClientRect(); origX=rect.left; origY=rect.top; e.preventDefault(); });
        document.addEventListener('pointermove', (e)=>{ if(!isDown) return; const dx=e.clientX-startX; const dy=e.clientY-startY; el.style.left=(origX+dx)+'px'; el.style.top=(origY+dy)+'px'; el.style.transform='none'; });
        document.addEventListener('pointerup', ()=>{ isDown=false; });
    },

    openNewProjectModal(){
        // create modal to collect project metadata
        let modal = document.getElementById('newProjectModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'newProjectModal';
            modal.style.position = 'fixed';
            modal.style.top = '50%';
            modal.style.left = '50%';
            modal.style.transform = 'translate(-50%, -50%)';
            modal.style.width = '480px';
            modal.style.background = 'var(--gh-canvas)';
            modal.style.border = '1px solid var(--gh-border)';
            modal.style.borderRadius = '8px';
            modal.style.padding = '12px';
            modal.style.zIndex = 2100;

            modal.innerHTML = `
                <h3 style="margin-top:0;color:var(--gh-text)">New Project Details</h3>
                <label>Customer Name</label>
                <input id="projCustomer" type="text" />
                <label>Project Type</label>
                <select id="projType"><option>Wardrobe</option><option>BIC</option></select>
                <label>Address</label>
                <input id="projAddress" type="text" />
                <label>Contact</label>
                <input id="projContact" type="text" />
                <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
                    <button id="projCancel" class="btn">Cancel</button>
                    <button id="projSave" class="btn-primary">Save</button>
                </div>
            `;
            document.body.appendChild(modal);
            document.getElementById('projCancel').addEventListener('click', ()=>modal.remove());
            document.getElementById('projSave').addEventListener('click', ()=>{
                const details = {
                    name: document.getElementById('projCustomer').value || 'Untitled',
                    type: document.getElementById('projType').value,
                    address: document.getElementById('projAddress').value || '',
                    contact: document.getElementById('projContact').value || ''
                };
                // persist
                DesignStorage.saveProject({ name: details.name, type: details.type, customer: details.name, address: details.address, contact: details.contact });
                modal.remove();
                App.notify('Project details saved');
            });
        }
    },






    newProject(){


        this.project = {

            name:
            "Untitled Project",

            cabinets:0,

            parts:0,

            sheets:0

        };


        this.updateStats();


        this.notify(
            "New project started"
        );


    },





    updateStats(){


        document
        .getElementById("cabinetCount")
        .textContent =
        this.project.cabinets;



        document
        .getElementById("partCount")
        .textContent =
        this.project.parts;



        document
        .getElementById("sheetCount")
        .textContent =
        this.project.sheets;



    },






    toggleTheme(){


        if(
            this.settings.theme==="dark"
        ){

            document.documentElement
            .style
            .setProperty(
                "--bg-main",
                "#f4f6fa"
            );


            document.documentElement
            .style
            .setProperty(
                "--bg-panel",
                "#ffffff"
            );


            document.documentElement
            .style
            .setProperty(
                "--text-primary",
                "#111827"
            );


            this.settings.theme="light";


            this.notify(
                "Light theme enabled"
            );


        }

        else {


            location.reload();


        }


    },






    openCommand(){

        let box = document.getElementById("commandPalette");
        if (!box) {
            box = document.createElement("div");
            box.id = "commandPalette";
            box.style.position = "fixed";
            box.style.top = "50%";
            box.style.left = "50%";
            box.style.transform = "translate(-50%, -50%)";
            box.style.padding = "1rem";
            box.style.background = "#111827";
            box.style.borderRadius = "12px";
            box.style.boxShadow = "0 20px 45px rgba(0,0,0,0.35)";
            box.style.zIndex = "1000";

            const input = document.createElement("input");
            input.id = "commandInput";
            input.type = "text";
            input.placeholder = "Type a command...";
            input.style.width = "280px";
            input.style.padding = "0.75rem";
            input.style.borderRadius = "8px";
            input.style.border = "1px solid #444";
            input.style.background = "#0b1220";
            input.style.color = "#fff";
            box.appendChild(input);
            document.body.appendChild(box);
        }

        box.classList.remove("hidden");
        box.style.display = "block";

        const input = document.getElementById("commandInput");
        if (input) {
            input.focus();
        }

    },





    closeCommand(){

        const box = document.getElementById("commandPalette");
        if (!box) {
            return;
        }

        box.classList.add("hidden");
        box.style.display = "none";

    },






    executeCommand(command){


        command =
        command
        .toLowerCase();


        if(
            command.includes(
                "cabinet"
            )
        ){

            this.createProject();

        }


        else if(
            command.includes(
                "generate"
            )
        ){

            this.generate();

        }


        else {


            this.notify(
                "Command not recognised"
            );


        }


        this.closeCommand();


    },






    notify(message){

        let area = document.getElementById("notifications");
        if (!area) {
            area = document.createElement("div");
            area.id = "notifications";
            area.className = "notifications";
            document.body.appendChild(area);
        }

        const item = document.createElement("div");
        item.className = "notification";
        item.textContent = message;

        area.appendChild(item);

        setTimeout(() => {
            item.remove();
        }, 3000);

    },






    save(){


        localStorage.setItem(
            "cabinetStudio",
            JSON.stringify(
                this.project
            )
        );


        this.notify(
            "Project saved locally"
        );


    },






    load(){


        const data =
        localStorage.getItem(
            "cabinetStudio"
        );


        if(data){

            this.project =
            JSON.parse(
                data
            );

        }


    }



};

window.App = App;

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        App.init();

    }
);
