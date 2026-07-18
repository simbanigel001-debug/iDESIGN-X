/**
 * iDESIGN X | Core Architecture
 * This is the ONLY global variable allowed.
 */
window.iDesign = {
    modules: {},
    isReady: false,
    
    // Module Registering
    register: function(name, module) {
        this.modules[name] = module;
        console.log(`[iDesign] Module registered: ${name}`);
    },

    init: function() {
        console.log("[iDesign] Initializing System...");
        Object.keys(this.modules).forEach(key => {
            if (this.modules[key].init) this.modules[key].init();
        });
        this.isReady = true;
    }
};
