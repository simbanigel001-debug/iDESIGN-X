/* =====================================================
   Cabinet Studio
   Design Storage System
===================================================== */

const DesignStorage = {

    // Renamed to saveProject to match your HTML button
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

    // Renamed to loadProject to avoid future errors
    loadProject() {
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
    }

};

console.log("DesignStorage Loaded");
