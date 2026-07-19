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
        
        // Define hardcoded parts for now until Engineering integration is fully mapped
        const parts = [
            { w: 18, h: settings.height, d: settings.depth, x: -settings.width/2000, y: settings.height/2000, z: 0, type: 'carcass' },
            { w: 18, h: settings.height, d: settings.depth, x: settings.width/2000, y: settings.height/2000, z: 0, type: 'carcass' },
            { w: settings.width - 36, h: 18, d: settings.depth, x: 0, y: 0.05, z: 0, type: 'carcass' },
            { w: settings.width - 36, h: 18, d: settings.depth, x: 0, y: settings.height/1000, z: 0, type: 'carcass' },
            { w: settings.width, h: settings.height, d: 5, x: 0, y: settings.height/2000, z: -settings.depth/2000, type: 'masonite' }
        ];

        parts.forEach(part => this.renderPart(part));
    },

    renderPart: function(part) {
        const geometry = new THREE.BoxGeometry(part.w / 1000, part.h / 1000, part.d / 1000);
        const material = (part.type === 'masonite') ? 
            new THREE.MeshLambertMaterial({ color: 0x444444 }) : 
            new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(part.x, part.y, part.z);
        window.iDesign.Engine.scene.add(mesh);
    },

    clearScene: function() {
        const scene = window.iDesign.Engine.scene;
        for (let i = scene.children.length - 1; i >= 0; i--) {
            if (scene.children[i].type !== 'DirectionalLight' && scene.children[i].type !== 'AmbientLight') {
                scene.remove(scene.children[i]);
            }
        }
    }
};

iDesign.register('Cabinet', iDesign.Cabinet);
