/**
 * iDESIGN X | Core Registry
 * This MUST load before any other modules.
 */
window.iDesign = window.iDesign || {};
window.iDesign.modules = {};

// Register function defined immediately
window.iDesign.register = function(name, module) {
    this.modules[name] = module;
    console.log(`[iDesign] Module registered: ${name}`);
};

console.log("[iDesign] Core Registry initialized.");
