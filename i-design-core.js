/**
 * iDESIGN X | Master Core
 * This file contains the full architecture and must load first.
 */
window.iDesign = window.iDesign || {};
window.iDesign.modules = {};
window.iDesign.isReady = false;

// 1. Module Registering
window.iDesign.register = function(name, module) {
    this.modules[name] = module;
    console.log(`[iDesign] Module registered: ${name}`);
};

// 2. Central Log Manager
window.iDesign.Log = (function() {
    const DEBUG = true; 
    return {
        info: function(msg) { if (DEBUG) console.log(`[iDesign] ${msg}`); },
        error: function(msg) { console.error(`[iDesign ERROR] ${msg}`); }
    };
})();

// 3. System Initializer
window.iDesign.init = function() {
    console.log("[iDesign] Initializing System...");
    Object.keys(this.modules).forEach(key => {
        if (typeof this.modules[key].init === 'function') {
            this.modules[key].init();
        }
    });
    this.isReady = true;
};

console.log("[iDesign] Master Core initialized.");
