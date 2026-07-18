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
generateGeometry: function(settings) {
    // 1. Create dimensions (converting mm to standard units if needed)
    // Here we divide by 1000 assuming 1 unit = 1 meter
    const w = settings.width / 1000;
    const h = settings.height / 1000;
    const d = settings.depth / 1000;

    // 2. Create the box geometry
    const geometry = new THREE.BoxGeometry(w, h, d);

    // 3. Create a basic material (Lambert responds to light)
    const material = new THREE.MeshLambertMaterial({ 
        color: 0x8B4513, // Wood-like color
        wireframe: false 
    });

    // 4. Create the mesh
    const cabinetMesh = new THREE.Mesh(geometry, material);

    // 5. Position the cabinet so it sits on the "floor" (y=0)
    // Since BoxGeometry is centered, we lift it by half its height
    cabinetMesh.position.y = h / 2;

    // 6. Add to the global scene provided by your Engine
    if (window.iDesign.Engine && window.iDesign.Engine.scene) {
        window.iDesign.Engine.scene.add(cabinetMesh);
        console.log("[iDesign.Cabinet] Geometry added to scene.");
    } else {
        console.error("[iDesign.Cabinet] Engine scene not found!");
    }
}

// Register the module
iDesign.register('Cabinet', iDesign.Cabinet);
