/* =====================================================
   Cabinet Studio
   Project UI Controller
   Milestone 3
===================================================== */


const ProjectUI = {



    init(){


        this.createInputPanel();


        this.bind();


        this.renderCompartments();


    },








    createInputPanel(){



        const sidebar =
        document.querySelector(
            ".sidebar"
        );



        const panel =
        document.createElement(
            "div"
        );


        panel.className =
        "project-controls";



        panel.innerHTML = `


        <div class="panel-title">
            WARDROBE INPUT
        </div>



        <label>
            Compartment Width
        </label>


        <input
            id="compartmentWidth"
            type="number"
            value="600"
        >



        <label>
            Type
        </label>


        <select id="compartmentType">


            <option value="hanging">
                Hanging
            </option>


            <option value="folding">
                Folding
            </option>


            <option value="open">
                Open
            </option>


        </select>



        <label class="check">


            <input
            id="doorToggle"
            type="checkbox"
            checked
            >

            Add Doors


        </label>





        <label class="check">


            <input
            id="drawerToggle"
            type="checkbox"
            >

            Add Drawers


        </label>




        <input
            id="drawerCount"
            type="number"
            value="3"
            min="1"
            max="8"
        >





        <button
        id="addCompartmentBtn">

            Add Compartment

        </button>


        `;



        sidebar.appendChild(
            panel
        );



    },









    bind(){



        document
        .getElementById(
            "addCompartmentBtn"
        )
        .addEventListener(
            "click",
            ()=>this.addCompartment()
        );



    },









    addCompartment(){



        const width =
        Number(
            document
            .getElementById(
                "compartmentWidth"
            )
            .value
        );




        const type =
        document
        .getElementById(
            "compartmentType"
        )
        .value;




        const doors =
        document
        .getElementById(
            "doorToggle"
        )
        .checked;





        const drawers =
        document
        .getElementById(
            "drawerToggle"
        )
        .checked;





        const compartment =
        Project.addCompartment({

            width:

            width,

            type:

            type,

            hasDoors:

            doors

        });





        if(drawers){


            const count =
            Number(
                document
                .getElementById(
                    "drawerCount"
                )
                .value
            );



            compartment.addDrawer(
                count,
                "standard"
            );


        }





        this.renderCompartments();



        App.notify(
            "Compartment added"
        );


    },









    renderCompartments(){



        const area =
        document.querySelector(
            ".design-board"
        );



        if(
            Project.compartments.length===0
        ){

            return;

        }





        area.innerHTML = "";



        const list =
        document.createElement(
            "div"
        );



        list.className =
        "compartment-list";




        Project.compartments
        .forEach((item,index)=>{


            const card =
            document.createElement(
                "div"
            );



            card.className =
            "compartment-card";



            card.innerHTML = `


            <strong>
            Compartment ${index+1}
            </strong>


            <p>
            ${item.width}mm
            </p>


            <p>
            ${item.type}
            </p>


            `;



            list.appendChild(
                card
            );



        });




        area.appendChild(
            list
        );



    }




};





document.addEventListener(
"DOMContentLoaded",
()=>{


    ProjectUI.init();


});
