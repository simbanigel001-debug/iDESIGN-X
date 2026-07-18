/**
 * iDESIGN X | Core Engine
 * Encapsulated 3D Engine. Prevents global pollution.
 */
window.iDesign = window.iDesign || {};

iDesign.Engine = {
    scene: null,
    camera: null,
    renderer: null,
    container: null,

    init: function(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error("[iDesign.Engine] Container not found.");
            return;
        }

        // Initialize Scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.set(5, 5, 5);
        this.camera.lookAt(0, 0, 0);

        // Add Light
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        this.animate();
        console.log("[iDesign.Engine] System initialized.");
    },

    animate: function() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }
};

// Auto-initialize on load
window.addEventListener('DOMContentLoaded', () => {
    // Only init if the viewer exists
    if(document.getElementById('threeViewer')) {
        iDesign.Engine.init('threeViewer');
    }
});
