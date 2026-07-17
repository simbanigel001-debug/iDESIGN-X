const Cabinet3DModel = {
    objects: [],

    clear() {
        if (typeof ThreeSetup === 'undefined' || !ThreeSetup.scene) {
            console.error("Cabinet3DModel: ThreeSetup is not ready.");
            return;
        }
        this.objects.forEach(object => {
            ThreeSetup.scene.remove(object);
        });
        this.objects = [];
    },

    createBox(width, height, depth, x, y, z, name) {
        // Safety check
        if (typeof THREE === 'undefined') {
            console.error("Three.js is not loaded.");
            return;
        }

        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({ color: 0x8b7355 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.name = name;
        
        ThreeSetup.scene.add(mesh);
        this.objects.push(mesh);
        return mesh;
    },

    build() {
        // DIAGNOSTIC CHECKS: This tells us what is missing
        if (typeof Project === 'undefined') {
            console.error("CRITICAL ERROR: 'Project' object is missing. Is data-model.js loaded?");
            return;
        }
        if (typeof ThreeSetup === 'undefined') {
            console.error("CRITICAL ERROR: 'ThreeSetup' is missing. Is three-setup.js loaded?");
            return;
        }

        this.clear();
        const height = 2700;
        const depth = 600;
        let currentX = 0;

        // Check if compartments exist
        if (!Project.compartments || Project.compartments.length === 0) {
            console.warn("Project has no compartments to build.");
            return;
        }

        Project.compartments.forEach(compartment => {
            const width = compartment.width;

            // Left side
            this.createBox(16, height, depth, currentX, height / 2, 0, "Side Panel");
            // Right side
            this.createBox(16, height, depth, currentX + width, height / 2, 0, "Side Panel");
            // Shelves
            this.createBox(width, 16, depth, currentX + width / 2, 2200, 0, "Shelf");
            // Bottom
            this.createBox(width, 16, depth, currentX + width / 2, 100, 0, "Bottom");

            currentX += width;
        });

        App.notify("3D wardrobe generated");
        console.log("Cabinet 3D Model: Build successful.");
    }
};

console.log("Cabinet 3D Model Loaded");
