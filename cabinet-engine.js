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
window.iDesign.Engine = window.iDesign.Engine || {};
// Register cabinet engine logic and defer renderer setup to the central engine initializer when available
window.iDesign.Engine.logic = CabinetEngine;

// Provide lights references for when an engine is instantiated
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 5, 5);

// If the core engine does not expose an init function, fall back to legacy immediate setup
if (!window.iDesign.Engine.init) {
    console.warn('[cabinet-engine] No engine.init detected — performing legacy renderer setup (appends canvas to body).');

    window.iDesign.Engine.scene = new THREE.Scene();
    window.iDesign.Engine.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    window.iDesign.Engine.renderer = new THREE.WebGLRenderer({ antialias: true });

    window.iDesign.Engine.scene.add(ambientLight);
    window.iDesign.Engine.scene.add(dirLight);

    window.iDesign.Engine.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(window.iDesign.Engine.renderer.domElement);
    window.iDesign.Engine.camera.position.set(2, 2, 2);

    // Rendering Loop
    function animate() {
        requestAnimationFrame(animate);
        if (window.iDesign.Engine && window.iDesign.Engine.renderer && window.iDesign.Engine.scene && window.iDesign.Engine.camera) {
            window.iDesign.Engine.renderer.render(window.iDesign.Engine.scene, window.iDesign.Engine.camera);
        }
    }
    animate();

    // Canvas styling for legacy flow
    try {
        const canvas = window.iDesign.Engine.renderer.domElement;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '-1';
    } catch (e) { /* ignore */ }
} else {
    console.log('[cabinet-engine] engine.init available — deferring renderer setup to central engine.');
}

// --- Integrated Build Method ---
window.iDesign.Cabinet = {
    build: function(settings) {
        if (!window.iDesign.Engine || !window.iDesign.Engine.scene) {
            console.error('[iDesign.Cabinet] Engine not initialized; cannot build 3D parts.');
            return;
        }

        // Clear scene safely
        if (typeof window.iDesign.Engine.scene.clear === 'function') {
            window.iDesign.Engine.scene.clear();
        } else {
            // remove children manually if older THREE.js
            while (window.iDesign.Engine.scene.children.length) {
                window.iDesign.Engine.scene.remove(window.iDesign.Engine.scene.children[0]);
            }
        }

        // Re-add lights
        try {
            window.iDesign.Engine.scene.add(ambientLight);
            window.iDesign.Engine.scene.add(dirLight);
        } catch (e) {
            console.warn('[iDesign.Cabinet] Failed to add lights', e);
        }

        const parts = (typeof CabinetEngine.generate === 'function') ? CabinetEngine.generate(Project) : [];

        parts.forEach(part => {
            const isBack = part.name && part.name.toLowerCase().includes('back');
            const thickness = isBack ? 0.003 : 0.016; 
            const geometry = new THREE.BoxGeometry((part.width || 0) / 1000, (part.height || 0) / 1000, thickness);

            const matName = isBack ? "Masonite" : "Carcass";
            const material = new THREE.MeshLambertMaterial({ 
                color: isBack ? 0x8b4513 : 0xcccccc, 
                name: matName 
            }); 

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, (part.height || 0) / 2000, 0); 
            window.iDesign.Engine.scene.add(mesh);
        });
        
        console.log("[iDesign] Build complete: Using Carcass/Masonite specifications.");
    }
};

console.log("Engineering Cabinet Engine Loaded and Ready.");
