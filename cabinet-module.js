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

        generateGeometry: function(settings) {
            // Placeholder for actual Three.js box geometry logic
            const geometry = new THREE.BoxGeometry(settings.width / 100, settings.height / 100, settings.depth / 100);
            const material = new THREE.MeshLambertMaterial({ color: 0xdddddd });
            const cube = new THREE.Mesh(geometry, material);
            
            window.iDesign.Engine.scene.add(cube);
            console.log("[iDesign.Cabinet] Geometry added to scene.");
        }
    };
})();

// Register the module
iDesign.register('Cabinet', iDesign.Cabinet);
