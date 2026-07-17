const Cabinet3DModel = {
    objects: [],

    clear() {
        if (window.ThreeSetup && ThreeSetup.scene) {
            this.objects.forEach(obj => ThreeSetup.scene.remove(obj));
            this.objects = [];
        }
    },

    createBox(width, height, depth, x, y, z, name) {
        if (!window.ThreeSetup || !ThreeSetup.scene) return null;

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
        console.log("Build initiated...");
        this.clear();

        // 1. Get data, or use a default test compartment if empty
        let compartments = (typeof Project !== 'undefined' && Project.compartments) ? Project.compartments : [{ width: 600 }];
        
        if (compartments.length === 0) {
            console.warn("No compartments found. Using test data.");
            compartments = [{ width: 600 }];
        }

        let currentX = 0;
        compartments.forEach(c => {
            const width = c.width || 600;
            const h = 2700;
            const d = 600;

            // Generate parts
            this.createBox(16, h, d, currentX, h / 2, 0, "Left Side");
            this.createBox(16, h, d, currentX + width, h / 2, 0, "Right Side");
            this.createBox(width, 16, d, currentX + width / 2, 2200, 0, "Shelf");
            this.createBox(width, 16, d, currentX + width / 2, 100, 0, "Bottom");

            currentX += width + 20; // Add gap
        });

        // 2. FORCE CAMERA RESET (Crucial for visibility)
        if (window.ThreeSetup) {
            ThreeSetup.camera.position.set(1000, 1000, 1000);
            ThreeSetup.camera.lookAt(0, 0, 0);
        }

        console.log("Build successful.");
    }
};
