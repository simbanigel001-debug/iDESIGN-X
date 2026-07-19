const PG_Bison_Catalog = {
    // These maps to your texture file names in /assets/textures/
    materials: [
        { id: 'melawood-folkstone', name: 'Melawood Folkstone Grey', texture: 'folkstone.jpg', color: '#8c8c8c' },
        { id: 'melawood-storm-grey', name: 'Melawood Storm Grey', texture: 'storm_grey.jpg', color: '#4d4d4d' },
        { id: 'melawood-supamatt', name: 'Melawood SupaMatt White', texture: 'supamatt.jpg', color: '#ffffff' }
    ],

    getMaterialById(id) {
        return this.materials.find(m => m.id === id);
    }
};

window.iDesign.Catalog = PG_Bison_Catalog;
