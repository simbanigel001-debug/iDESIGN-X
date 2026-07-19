/**
 * iDESIGN X | Cabinet Module
 */
window.iDesign = window.iDesign || {};

iDesign.Cabinet = {
    defaults: {
        width: 600,
        height: 2700,
        depth: 600
    },

    build: function(config = {}) {
        const settings = { ...this.defaults, ...config };
        console.log(`[iDesign.Cabinet] Building: ${settings.width}x${settings.height}x${settings.depth}`);
        this.generateGeometry(settings);
    },

    generateGeometry: function(settings) {
        if (!window.iDesign.Engine || !window.iDesign.Engine.scene) {
            console.error("[iDesign.Cabinet] Engine not initialized.");
            return;
        }
        this.clearScene();
        
        // Ensure Engineering is loaded before calling it
        if (window.iDesign.Engineering && typeof window.iDesign.Engineering.getPartList === 'function') {
            const parts = window.iDesign.Engineering.getPartList(settings);
            parts.forEach(part => this.renderPart(part));
        } else {
            console.warn("[iDesign.Cabinet] Engineering module not found, building fallback cube.");
            this.renderPart({ w: settings.width, h: settings.height, d: settings.depth, x: 0, y: settings.height/2000, z: 0, type: 'carcass' });
        }
    },

    renderPart: function(part) {
        const geometry = new THREE.BoxGeometry(part.w / 1000, part.h / 1000, part.d / 1000);
        const material = this.getMaterial(part.type);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(part.x / 1000, part.y, part.z / 1000);
        window.iDesign.Engine.scene.add(mesh);
    },

    getMaterial: function(type) {
        return (type === 'masonite') ? 
            new THREE.MeshLambertMaterial({ color: 0x444444 }) : 
            new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    },

    clearScene: function() {
        const scene = window.iDesign.Engine.scene;
        for (let i = scene.children.length - 1; i >= 0; i--) {
            if (scene.children[i].type !== 'DirectionalLight' && scene.children[i].type !== 'AmbientLight') {
                scene.remove(scene.children[i]);
            }
        }
    }
}; // <--- This closing brace is vital

// Register the module
iDesign.register('Cabinet', iDesign.Cabinet);
