/**
 * iDESIGN X | Cabinet Module
 * Handles Cabinet Geometry instantiation and state.
 */
window.iDesign = window.iDesign || {};

iDesign.Cabinet = (function() {
    // Private State
    const defaults = {
        width: 600,
        height: 2700,
        depth: 600
    };

    return {
        // Public Method: Build a cabinet from input data
        build: function(config = {}) {
            const settings = { ...defaults, ...config };
            console.log(`[iDesign.Cabinet] Building carcass: ${settings.width}x${settings.height}x${settings.depth}`);
            
            // Logic to create geometry
            // We interact with the Engine via the registry
            if (window.iDesign.Engine) {
                this.generateGeometry(settings);
            } else {
                console.error("[iDesign.Cabinet] Cannot build: Engine not ready.");
            }
        },

        // Inside iDesign.Cabinet
// Inside iDesign.Cabinet
generateGeometry: function(settings) {
    // 1. Safety Check: Does the Engine and the Scene actually exist?
    if (!window.iDesign.Engine || !window.iDesign.Engine.scene) {
        console.error("[iDesign.Cabinet] Cannot build: Engine or Scene is not initialized yet.");
        return; 
    }

    // 2. Create dimensions
    const w = settings.width / 1000;
    const h = settings.height / 1000;
    const d = settings.depth / 1000;

    // 3. Create the box geometry
    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshLambertMaterial({ 
        color: 0x8B4513, 
        wireframe: false 
    });

    // 4. Create the mesh
    const cabinetMesh = new THREE.Mesh(geometry, material);
    cabinetMesh.position.y = h / 2;

    // 5. Add to scene
    window.iDesign.Engine.scene.add(cabinetMesh);
    console.log("[iDesign.Cabinet] Geometry successfully added to scene.");
}
        window.iDesign.Engine.scene.add(cabinetMesh);
        console.log("[iDesign.Cabinet] Geometry added to scene.");
    } else {
        console.error("[iDesign.Cabinet] Engine scene not found!");
    }
}

// Register the module
iDesign.register('Cabinet', iDesign.Cabinet);
