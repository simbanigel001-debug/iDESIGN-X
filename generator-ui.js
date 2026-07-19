/* =====================================================
   Cabinet Studio
   Generator Interface
   Milestone 3
===================================================== */


const GeneratorUI = {

    init(){
        this.createOutputPanel();
        this.bind();
    },

    bind(){
        document
        .getElementById("generateBtn")
        .addEventListener("click", () => this.generate());
    },

   generate(){

        if(Project.compartments.length === 0){
            console.log("Validation: Add a compartment first");
            return;
        }

        // 1. Get the parts from your existing engine
        const parts = CabinetEngine.generate(Project);

        // 2. Generate the report/table (Existing UI logic)
        const report = ProductionOutput.generate(Project);
        ProductionOutput.display(report);
        this.render(parts);

        // 3. ADD THIS LINE: Trigger the 3D build using your current project settings
        // We pass the project settings so the cabinet is built to the right dimensions
        if (window.iDesign && window.iDesign.Cabinet) {
            window.iDesign.Cabinet.build(Project.settings);
        }

        App.notify("Cutting list and 3D model generated");
    },

    createOutputPanel(){
        const canvas = document.querySelector(".canvas-area");
        const panel = document.createElement("div");

        panel.id = "cuttingOutput";
        panel.className = "cutting-output";

        panel.innerHTML = `
            <h3>Cutting List</h3>
            <div id="outputTable">No parts generated</div>
        `;

        canvas.appendChild(panel);
    },

    render(parts){
        const table = document.getElementById("outputTable");
        table.innerHTML = "";

        const header = document.createElement("div");
        header.className = "cut-row header";
        header.innerHTML = `
            <span>Part</span>
            <span>Size</span>
            <span>Qty</span>
        `;

        table.appendChild(header);

        parts.forEach(part => {
            const row = document.createElement("div");
            row.className = "cut-row";
            row.innerHTML = `
                <span>${part.name}</span>
                <span>${part.width} x ${part.height}</span>
                <span>${part.quantity}</span>
            `;
            table.appendChild(row);
        });
    }

};

document.addEventListener("DOMContentLoaded", () => {
    GeneratorUI.init();
});
