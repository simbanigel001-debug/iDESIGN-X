/* =====================================================
   Cabinet Studio
   Engineering Cabinet Engine (Integrated)
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
            case "hanging": this.hanging(project, shelfWidth); break;
            case "folding": this.folding(project, shelfWidth); break;
            case "open": this.open(project, shelfWidth); break;
        }

        CabinetIntegration.applyAccessories(project, compartment);
    },

    hanging(project, width) {
        ["Top Shelf", "Bottom Shelf", "Inner Shelf", "Hanging Shelf"].forEach(name => {
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

    addPart(project, name, width, height, quantity) {
        project.generatedParts.push(new Part(name, width, height, quantity));
    }
};

// --- iDesign Engine Initialization ---
window.iDesign.Engine = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer: new THREE.WebGLRenderer({ antialias: true }),
    logic: CabinetEngine
};

// Lighting for visual clarity
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
window.iDesign.Engine.scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 5, 5);
window.iDesign.Engine.scene.add(dirLight);

// Renderer setup
window.iDesign.Engine.renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(window.iDesign.Engine.renderer.domElement);
window.iDesign.Engine.camera.position.set(2, 2, 2);

// Rendering Loop
function animate() {
    requestAnimationFrame(animate);
    window.iDesign.Engine.renderer.render(window.iDesign.Engine.scene, window.iDesign.Engine.camera);
}
animate();

// --- Integrated Build Method ---
window.iDesign.Cabinet = {
    build: function(settings) {
        window.iDesign.Engine.scene.clear(); // Wipe for fresh build
        
        // Re-add lights to scene
        window.iDesign.Engine.scene.add(ambientLight);
        window.iDesign.Engine.scene.add(dirLight);

        const parts = CabinetEngine.generate(Project);

        parts.forEach(part => {
            const isBack = part.name.toLowerCase().includes('back');
            const thickness = isBack ? 0.003 : 0.016; 
            const geometry = new THREE.BoxGeometry(part.width / 1000, part.height / 1000, thickness);

            // Naming convention: Carcass vs Masonite
            const matName = isBack ? "Masonite" : "Carcass";
            
            const material = new THREE.MeshLambertMaterial({ 
                color: isBack ? 0x8b4513 : 0xcccccc, 
                name: matName 
            }); 

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, part.height / 2000, 0); 
            window.iDesign.Engine.scene.add(mesh);
        });
        
        console.log("[iDesign] Build complete: Using Carcass/Masonite specifications.");
    }
};

// Canvas styling
const canvas = window.iDesign.Engine.renderer.domElement;
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';

console.log("Engineering Cabinet Engine Loaded and Ready.");
