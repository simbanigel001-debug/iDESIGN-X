/* PG Board Catalog
   Provides material metadata for boards used in rendering and exports */
window.PGBoardCatalog = (function(){
    const catalog = {
        brook_hill: { id: 'brook_hill', name: 'Brook Hill', finish: 'matte', colorHex: '#8b5a2b', textureUrl: '' },
        oak_board: { id: 'oak_board', name: 'Oak Board', finish: 'wood-grain', colorHex: '#a67c52', textureUrl: '' },
        blanco: { id: 'blanco', name: 'Blanco / White', finish: 'matte', colorHex: '#ffffff', textureUrl: '' }
    };

    return {
        list() { return Object.values(catalog); },
        get(id) { return catalog[id] || null; },
        defaultId() { return 'blanco'; }
    };
})();

console.log('PGBoardCatalog loaded');