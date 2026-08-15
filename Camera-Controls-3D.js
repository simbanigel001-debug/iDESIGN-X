/**
 * ARCHITECTURAL BRIDGE
 * Redirecting legacy reference to the new iDesign Registry.
 */
// Defensive bridge: create the namespace if it's missing
window.iDesign = window.iDesign || {};
window.iDesign.Engine = window.iDesign.Engine || {};
const ThreeSetup = window.iDesign.Engine;
const CameraControls3D = {

    controls: null,

    init() {
        // Ensure camera + renderer exist before creating OrbitControls
        if (!ThreeSetup.camera || !ThreeSetup.renderer) {
            // Do not throw — other modules may initialize engine later
            console.warn('[CameraControls3D] Camera or renderer not ready; skipping controls init.');
            return;
        }

        try {
            this.controls = new THREE.OrbitControls(ThreeSetup.camera, ThreeSetup.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.08;
            this.controls.minDistance = 500;
            this.controls.maxDistance = 6000;

            if (this.controls.target && typeof this.controls.target.set === 'function') {
                this.controls.target.set(1200, 1200, 0);
            }

            this.controls.update();
        } catch (e) {
            console.warn('[CameraControls3D] Failed to initialize controls:', e);
            this.controls = null;
        }
    },

    // Helper to ensure camera & controls are present; attempt to init controls if missing
    _ensureReady() {
        if (!ThreeSetup.camera || !ThreeSetup.camera.position) {
            console.warn('[CameraControls3D] Camera is not initialized yet.');
            return false;
        }
        if (!this.controls) {
            // Try to initialize controls on demand
            this.init();
            if (!this.controls) {
                console.warn('[CameraControls3D] Controls are not available.');
                return false;
            }
        }
        return true;
    },

    reset() {
        if (!this._ensureReady()) return;

        // Guard position setter
        if (ThreeSetup.camera && ThreeSetup.camera.position && typeof ThreeSetup.camera.position.set === 'function') {
            ThreeSetup.camera.position.set(2500, 1800, 2500);
        } else {
            console.warn('[CameraControls3D] Camera position unavailable for reset.');
        }

        if (this.controls && this.controls.target && typeof this.controls.target.set === 'function') {
            this.controls.target.set(1200, 1200, 0);
        }

        if (this.controls && typeof this.controls.update === 'function') {
            this.controls.update();
        }
    },

    frontView() {
        if (!this._ensureReady()) return;

        if (ThreeSetup.camera && ThreeSetup.camera.position && typeof ThreeSetup.camera.position.set === 'function') {
            ThreeSetup.camera.position.set(1200, 1300, 3500);
        } else {
            console.warn('[CameraControls3D] Camera position unavailable for frontView.');
        }

        if (this.controls && typeof this.controls.update === 'function') this.controls.update();
    },

    sideView() {
        if (!this._ensureReady()) return;

        if (ThreeSetup.camera && ThreeSetup.camera.position && typeof ThreeSetup.camera.position.set === 'function') {
            ThreeSetup.camera.position.set(3500, 1300, 800);
        } else {
            console.warn('[CameraControls3D] Camera position unavailable for sideView.');
        }

        if (this.controls && typeof this.controls.update === 'function') this.controls.update();
    },

    topView() {
        if (!this._ensureReady()) return;

        if (ThreeSetup.camera && ThreeSetup.camera.position && typeof ThreeSetup.camera.position.set === 'function') {
            ThreeSetup.camera.position.set(1200, 4000, 0);
        } else {
            console.warn('[CameraControls3D] Camera position unavailable for topView.');
        }

        if (this.controls && typeof this.controls.update === 'function') this.controls.update();
    }

};


document.addEventListener('DOMContentLoaded', () => {
    CameraControls3D.init();
});
