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

   generateGeometry: function(settings) {
    if (!window.iDesign.Engine || !window.iDesign.Engine.scene) return;

    // 1. Get the list of parts from your Engineering module
    // We assume your Engineering module returns an array of part objects
    // Each part should have {x, y, z, w, h, d, materialType}
    const parts = window.iDesign.Engineering.generatePartList(settings);

    // 2. Clear existing geometry so we don't stack cabinets
    this.clearScene(); 

    // 3. Loop through the parts and render them
    parts.forEach(part => {
        this.renderPart(part);
    });

    console.log(`[iDesign.Cabinet] Rendered ${parts.length} parts from Engineering engine.`);
},

// Helper to create individual parts
renderPart: function(part) {
    const geometry = new THREE.BoxGeometry(part.w, part.h, part.d);
    
    // Select material based on user-defined types (Carcass vs Masonite)
    const material = this.getMaterial(part.materialType);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(part.x, part.y, part.z);
    
    window.iDesign.Engine.scene.add(mesh);
},

// Material Logic (Using your required naming conventions)
getMaterial: function(type) {
    if (type === 'masonite') {
        return new THREE.MeshLambertMaterial({ color: 0x444444 }); // Darker for backing
    }
    // Default to 'carcass'
    return new THREE.MeshLambertMaterial({ color: 0x8B4513 }); 
}

// Register the module
iDesign.register('Cabinet', iDesign.Cabinet);
