/* =====================================================
   Cabinet Studio
   Engineering Cabinet Engine
   Milestone 4
===================================================== */

const CabinetEngine = {

    generate(project) {
        project.clearParts();
        project.compartments.forEach(compartment => {
            const sections = this.prepareSections(compartment);
            sections.forEach(section => {
                this.generateCabinet(project, section);
            });
        });
        return project.generatedParts;
    },

    prepareSections(compartment) {
        const split = EngineeringRules.calculateCabinetSplit(compartment.width);
        return split.map(width => {
            return {
                ...compartment,
                width: width
            };
        });
    },

    generateCabinet(project, compartment) {
        const width = compartment.width;
        const shelfWidth = EngineeringRules.shelfLength(width);

        /* SIDE PANELS */
        this.addPart(project, "Side Panel", 2700, 600, 2);

        /* PLINTH */
        this.addPart(project, "Internal Plinth", shelfWidth, 100, 1);

        switch (compartment.type) {
            case "hanging":
                this.hanging(project, shelfWidth);
                break;
            case "folding":
                this.folding(project, shelfWidth);
                break;
            case "open":
                this.open(project, shelfWidth);
                break;
        }

        CabinetIntegration.applyAccessories(project, compartment);
    },

    hanging(project, width) {
        [
            "Top Shelf",
            "Bottom Shelf",
            "Inner Shelf",
            "Hanging Shelf"
        ].forEach(name => {
            this.addPart(project, name, width, 584, 1);
        });

        this.addPart(project, "Hanging Rail", width, 40, 1);
    },

    folding(project, width) {
        for (let i = 0; i < 8; i++) {
            this.addPart(project, "Folding Shelf", width, 584, 1);
        }
    },

    open(project, width) {
        this.addPart(project, "Open Shelf", width, 584, 1);
    },

    drawers(project, compartment, shelfWidth) {
        const faceWidth = EngineeringRules.drawerFaceWidth(compartment.width);
        const faceHeight = EngineeringRules.drawerFaceHeight(
            compartment.drawers.quantity,
            compartment.drawers.profile
        );

        for (let i = 0; i < compartment.drawers.quantity; i++) {
            this.addPart(project, "Drawer Front", faceWidth, faceHeight, 1);
            this.addPart(project, "Drawer Side", 450, 120, 2);
            this.addPart(project, "Drawer Bottom", shelfWidth - 32, 450, 1);
        }
    },

    addPart(project, name, width, height, quantity) {
        project.generatedParts.push(
            new Part(name, width, height, quantity)
        );
    }

}; // This closes the CabinetEngine object correctly
// --- Initialize Global Engine ---
window.iDesign = window.iDesign || {};

window.iDesign.Engine = {
    scene: new THREE.Scene(),
    // Add the camera here
    camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
    logic: CabinetEngine
};

// Set initial camera position so it can see the cabinet
window.iDesign.Engine.camera.position.set(0, 1, 5); 

console.log("[iDesign] Engine successfully initialized with global scene and camera.");

console.log("[iDesign] Engine successfully initialized with global scene.");
console.log("Engineering Cabinet Engine Loaded");
