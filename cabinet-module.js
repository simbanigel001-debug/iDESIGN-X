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
        if (!window.iDesign.Engine || !window.iDesign.Engine.scene) return;
        
        this.clearScene();

        // 1. Get rules from the Engineering engine we just registered
        const rules = window.iDesign.Engineering;
        
        // 2. Define panels based on your Engineering settings
        const parts = [
            // Left Side
            { w: 18, h: settings.height, d: settings.depth, x: -settings.width/2000, y: settings.height/2000, z: 0, type: 'carcass' },
            // Right Side
            { w: 18, h: settings.height, d: settings.depth, x: settings.width/2000, y: settings.height/2000, z: 0, type: 'carcass' },
            // Bottom (Sitting on plinth)
            { w: settings.width - 36, h: 18, d: settings.depth, x: 0, y: (rules.settings.plinth + 9)/1000, z: 0, type: 'carcass' },
            // Top
            { w: settings.width - 36, h: 18, d: settings.depth, x: 0, y: (settings.height - 9)/1000, z: 0, type: 'carcass' },
            // Back Panel (Using Masonite as requested)
            { w: settings.width, h: settings.height, d: 5, x: 0, y: settings.height/2000, z: -settings.depth/2000, type: 'masonite' }
        ];

        // 3. Render each part
        parts.forEach(part => this.renderPart(part));
        
        console.log(`[iDesign.Cabinet] Built with ${parts.length} engineered parts.`);
    },

// Register the module
iDesign.register('Cabinet', iDesign.Cabinet);
