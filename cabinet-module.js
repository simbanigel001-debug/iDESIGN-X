/**
 * iDESIGN X | Cabinet Module
 * Handles Cabinet Geometry instantiation and state.
 */
window.iDesign = window.iDesign || {};

iDesign.Cabinet = {
    // Default settings
    defaults: {
        width: 600,
        height: 2700,
        depth: 600
    },

    // Public Method: Build a cabinet from input data
    build: function(config = {}) {
        const settings = { ...this.defaults, ...config };
        console.log(`[iDesign.Cabinet] Building carcass: ${settings.width}x${settings.height}x${settings.depth}`);
        this.generateGeometry(settings);
    },

    // Internal Logic: Create geometry
    generateGeometry: function(settings) {
        // 1. Safety Check
        if (!window.iDesign.Engine || !window.iDesign.Engine.scene) {
            console.error("[iDesign.Cabinet] Cannot build: Engine or Scene is not initialized yet.");
            return;
        }

        // 2. Setup
        const w = settings.width / 1000;
        const h = settings.height / 1000;
        const d = settings.depth / 1000;

        // 3. Geometry
        const geometry = new THREE.BoxGeometry(w, h, d);
        const material = new THREE.MeshLambertMaterial({ 
            color: 0x8B4513, 
            wireframe: false 
        });

        // 4. Mesh
        const cabinetMesh = new THREE.Mesh(geometry, material);
        cabinetMesh.position.y = h / 2;

        // 5. Add to scene
        window.iDesign.Engine.scene.add(cabinetMesh);
        console.log("[iDesign.Cabinet] Geometry successfully added to scene.");
    }
};

// Register the module
iDesign.register('Cabinet', iDesign.Cabinet);
