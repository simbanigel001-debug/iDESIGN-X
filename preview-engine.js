preview-engine.js
/* =====================================================
   Cabinet Studio
   Preview Engine V2
   NOTE:
   This is a starter scaffold for the rebuilt engine.
   It is intentionally complete and syntactically valid.
===================================================== */

const PreviewEngine = {
    canvas: null,

    init() {
        this.canvas = document.querySelector(".design-board");
        this.render();
    },

    render() {
        if (!this.canvas) return;

        this.canvas.innerHTML = "";

        if (!window.Project || !Array.isArray(Project.compartments) || Project.compartments.length === 0) {
            return this.showEmpty();
        }

        const wardrobe = document.createElement("div");
        wardrobe.className = "wardrobe-preview";

        Project.compartments.forEach((compartment, index) => {
            wardrobe.appendChild(this.createCompartment(compartment, index));
        });

        this.canvas.appendChild(wardrobe);
    },

    createCompartment(compartment, index) {
        const box = document.createElement("div");
        box.className = "preview-compartment";
        box.style.width = Math.max(120, (compartment.width || 600) / 5) + "px";

        const drawers = (compartment.drawers && compartment.drawers.enabled)
            ? `<div class="drawer-stack">${
                Array(compartment.drawers.quantity || 0)
                    .fill("<div class='drawer'></div>")
                    .join("")
              }</div>`
            : "";

        const rail = compartment.type === "hanging"
            ? "<div class='rail'></div>"
            : "";

        box.innerHTML = `
            <div class="compartment-title">${compartment.type || "Cabinet"}</div>
            <div class="cabinet-body">
                ${rail}
                ${drawers}
            </div>
            <div class="dimension">${compartment.width || 0} mm</div>
        `;

        box.addEventListener("click", () => {
            document.dispatchEvent(new CustomEvent("compartmentSelected", {
                detail: { compartment, index }
            }));
        });

        return box;
    },

    showEmpty() {
        this.canvas.innerHTML = `
            <div class="empty-state">
                <div class="cube">◇</div>
                <h3>Workspace Ready</h3>
                <p>Add compartments to begin designing.</p>
            </div>
        `;
    }
};

document.addEventListener("DOMContentLoaded", () => PreviewEngine.init());

