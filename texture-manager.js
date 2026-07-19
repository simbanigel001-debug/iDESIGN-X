const TextureManager = {
    loader: new THREE.TextureLoader(),

    applyToMesh(mesh, materialId) {
        const materialData = window.iDesign.Catalog.getMaterialById(materialId);
        
        if (!materialData) return;

        // Load texture
        this.loader.load(`./assets/textures/${materialData.texture}`, (texture) => {
            mesh.material = new THREE.MeshLambertMaterial({ 
                map: texture,
                side: THREE.DoubleSide 
            });
        }, undefined, (err) => {
            // Fallback to solid color if image not found
            mesh.material = new THREE.MeshLambertMaterial({ color: materialData.color });
        });
    }
};

window.iDesign.TextureManager = TextureManager;
