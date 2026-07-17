/* =====================================================
   Cabinet Studio
   Design Storage System
===================================================== */

const DesignStorage = {

    // Saves the current project
    saveProject(project) {
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

    // Loads a specific project
    loadProject() {
        try {
            const data = localStorage.getItem("CabinetStudioProject");
            return data ? JSON.parse(data) : null;
        } catch (error) {
            return null;
        }
    },

    // NEW: Added this to fix the "getProjects is not a function" error
    getProjects() {
        try {
            const data = localStorage.getItem("CabinetStudioProject");
            // If data exists, return it in an array; otherwise return empty list
            return data ? [JSON.parse(data)] : [];
        } catch (error) {
            console.error("DesignStorage: Failed to get projects.", error);
            return [];
        }
    }

};

console.log("DesignStorage Loaded");
