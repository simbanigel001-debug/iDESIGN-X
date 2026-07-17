/* =====================================================
   Three.js Initializer
   Ensures ThreeSetup is available globally
===================================================== */

// 1. Declare the global object immediately so other files can find it
window.ThreeSetup = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000),
    renderer: new THREE.WebGLRenderer({ antialias: true })
};

function initThree() {
    const viewer = document.getElementById('threeViewer');
    if (!viewer) {
        console.error("ThreeSetup: #threeViewer div not found in HTML!");
        return;
    }

    // Set background color
    ThreeSetup.scene.background = new THREE.Color(0x151923);

    // Setup Renderer
    ThreeSetup.renderer.setSize(viewer.clientWidth, viewer.clientHeight);
    viewer.appendChild(ThreeSetup.renderer.domElement);

    // Position Camera
    ThreeSetup.camera.position.set(1000, 1000, 1000);
    ThreeSetup.camera.lookAt(0, 0, 0);

    // Add Lights (So the boxes are visible!)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ThreeSetup.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(1000, 1000, 1000);
    ThreeSetup.scene.add(dirLight);

    // Basic Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        ThreeSetup.renderer.render(ThreeSetup.scene, ThreeSetup.camera);
    }
    animate();

    console.log("ThreeSetup: Scene, Camera, and Renderer initialized.");
}

// Initialize on load
window.addEventListener('DOMContentLoaded', initThree);
