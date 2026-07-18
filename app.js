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
// Central Log Manager
window.iDesign.Log = (function() {
    const DEBUG = true; // Set this to FALSE when you go to production

    return {
        info: function(msg) {
            if (DEBUG) console.log(`[iDesign] ${msg}`);
        },
        error: function(msg) {
            console.error(`[iDesign ERROR] ${msg}`);
        }
    };
})();
