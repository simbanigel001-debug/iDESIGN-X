/**
 * ThreeEngine.js
 * The 3D Engine Service
 */

class ThreeEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.camera = null;
        this.renderer = null;
        
        if (!this.container) {
            console.error(`[ThreeEngine] Container #${containerId} not found.`);
            return;
        }

        this.init();
    }

    init() {
        // Setup Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);

        // Setup Camera
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.camera.position.set(5, 5, 5);
        this.camera.lookAt(0, 0, 0);

        // Setup Light
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        // Animation Loop
        this.animate();
        console.log("[ThreeEngine] Initialized Successfully");
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }

    addObject(mesh) {
        this.scene.add(mesh);
    }
}

// Global Export (The only global we will use)
window.Engine = new ThreeEngine('viewport');
