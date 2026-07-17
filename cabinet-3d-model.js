/* =====================================================
   Cabinet Studio
   3D Cabinet Model Generator - Optimized
===================================================== */

const Cabinet3DModel = {
    objects: [],

    clear() {
        // Only attempt to remove if ThreeSetup exists
        if (window.ThreeSetup && ThreeSetup.scene) {
            this.objects.forEach(object => {
                ThreeSetup.scene.remove(object);
            });
            this.objects = [];
        }
    },

    createBox(width, height, depth, x, y, z, name) {
        // SAFETY CHECK: Does the scene exist yet?
        if (!window.ThreeSetup || !ThreeSetup.scene) {
            console.error("Cabinet3DModel: Cannot create box because ThreeSetup.scene is null!");
            return null;
        }

        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({ color: 0x8b7355 });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);
        mesh.name = name;

        // Now it is safe to add
        ThreeSetup.scene.add(mesh);
        this.objects.push(mesh);
        return mesh;
    },

    build() {
        // 1. Verify Project data
        if (typeof Project === 'undefined' || !Project.compartments) {
            console.error("Cabinet3DModel: Project data not found.");
            return;
        }

        // 2. Clear previous objects
        this.clear();

        // 3. Check if scene is ready
        if (!window.ThreeSetup || !ThreeSetup.scene) {
            console.error("Cabinet3DModel: Build failed. ThreeSetup.scene is missing.");
            return;
        }

        const height = 2700;
        const depth = 600;
        let currentX = 0;

        Project.compartments.forEach(compartment => {
            const width = compartment.width;

            // Generate parts
            this.createBox(16, height, depth, currentX, height / 2, 0, "Side Panel");
            this.createBox(16, height, depth, currentX + width, height / 2, 0, "Side Panel");
            this.createBox(width, 16, depth, currentX + width / 2, 2200, 0, "Shelf");
            this.createBox(width, 16, depth, currentX + width / 2, 100, 0, "Bottom");

            currentX += width;
        });

        console.log("Cabinet 3D Model: Build complete.");
    }
};

console.log("Cabinet 3D Model Loaded");
