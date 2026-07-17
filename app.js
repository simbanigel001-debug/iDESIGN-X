/* =====================================================
   Cabinet Studio
   Application Bootstrap
===================================================== */

const App = {

    version: "1.0.0",

    initialized: false,

    init() {

        console.log("=================================");
        console.log("Cabinet Studio Starting...");
        console.log("Version:", this.version);
        console.log("=================================");

        this.initialized = true;

        this.notify("Cabinet Studio Ready");

        this.initializeModules();

    },

    initializeModules() {

        const modules = [

            { name: "CabinetCanvas", object: window.CabinetCanvas },
            { name: "ResizeHandles", object: window.ResizeHandles },
            { name: "PropertyInspector", object: window.PropertyInspector },
            { name: "HistoryManager", object: window.HistoryManager },
            { name: "ThreeSetup", object: window.ThreeSetup },
            { name: "CameraControls3D", object: window.CameraControls3D }

        ];

        modules.forEach(module => {

            if (
                module.object &&
                typeof module.object.init === "function"
            ) {

                try {

                    module.object.init();

                    console.log(module.name + " initialized");

                } catch (error) {

                    console.error(
                        module.name + " failed:",
                        error
                    );

                }

            }

        });

    },

    notify(message) {

        console.log("[Cabinet Studio]", message);

        const notification = document.getElementById("notification");

        if (!notification) {
            return;
        }

        notification.textContent = message;

        notification.classList.add("show");

        clearTimeout(this.notificationTimer);

        this.notificationTimer = setTimeout(() => {

            notification.classList.remove("show");

        }, 3000);

    }

};

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});
