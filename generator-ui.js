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
        // Check if there are compartments
        if(Project.compartments.length === 0){
            console.log("Validation: Add a compartment first");
            return;
        }

        // Generate the cutting list data
        const parts = CabinetEngine.generate(Project);
        const report = ProductionOutput.generate(Project);
        
        // Display the output
        ProductionOutput.display(report);
        this.render(parts);

        // Bridge to the 3D Renderer
        if (window.iDesign && window.iDesign.Cabinet) {
            console.log("Triggering 3D Build...");
            window.iDesign.Cabinet.build(Project.settings);
        } else {
            console.warn("iDesign Cabinet engine not found.");
        }

        console.log("Cutting list and 3D model generated successfully");
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
