/* =====================================================
   Cabinet Studio
   Design Storage System
===================================================== */

const DesignStorage = {

    // Save the project to the browser's local memory
    save(project) {
        try {
            const data = JSON.stringify(project);
            localStorage.setItem("CabinetStudioProject", data);
            console.log("DesignStorage: Project saved successfully.");
            return true;
        } catch (error) {
            console.error("DesignStorage: Failed to save project.", error);
            return false;
        }
    },

    // Load the project from the browser's local memory
    load() {
        try {
            const data = localStorage.getItem("CabinetStudioProject");
            if (!data) {
                console.log("DesignStorage: No saved project found.");
                return null;
            }
            const project = JSON.parse(data);
            console.log("DesignStorage: Project loaded successfully.");
            return project;
        } catch (error) {
            console.error("DesignStorage: Failed to load project.", error);
            return null;
        }
    },

    // Clear saved project
    clear() {
        localStorage.removeItem("CabinetStudioProject");
        console.log("DesignStorage: Project data cleared.");
    }

};

console.log("DesignStorage Loaded");
