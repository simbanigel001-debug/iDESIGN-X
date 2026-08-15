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
            newProjectBtn.addEventListener("click", () => this.newProject());
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

        if (window.iDesign && window.iDesign.Cabinet && typeof window.iDesign.Cabinet.build === "function") {
            window.iDesign.Cabinet.build(sourceProject && sourceProject.settings ? sourceProject.settings : {});
        }

        this.notify(parts.length ? "Cabinet generated successfully" : "Generator ready for cabinet engine");

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
