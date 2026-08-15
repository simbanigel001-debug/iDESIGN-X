/* =====================================================
   Cabinet Studio
   Design Storage System
===================================================== */

const DesignStorage = {

    storageKey: 'CabinetStudioProjects',

    // Saves (adds) a project to the projects list
    saveProject(project) {
        try {
            const list = this.getProjects();
            const withMeta = Object.assign({ id: project.id || crypto.randomUUID(), savedAt: new Date().toISOString() }, project);
            list.unshift(withMeta);
            localStorage.setItem(this.storageKey, JSON.stringify(list));
            console.log("DesignStorage: Project saved successfully.");
            return true;
        } catch (error) {
            console.error("DesignStorage: Failed to save project.", error);
            return false;
        }
    },

    // Loads the most recent project
    loadProject() {
        try {
            const list = this.getProjects();
            return list.length ? list[0] : null;
        } catch (error) {
            return null;
        }
    },

    // Return all saved projects
    getProjects() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("DesignStorage: Failed to get projects.", error);
            return [];
        }
    },

    // Optional: find by id
    findProject(id) {
        return this.getProjects().find(p => p.id === id) || null;
    }

};

console.log("DesignStorage Loaded");
