/* =====================================================
   Cabinet Studio
   Property Inspector
   Milestone 9
===================================================== */


const PropertyInspector = {



    selected:null,






    init(){


        this.bind();



    },









    bind(){



        document.addEventListener(

            "cabinetSelected",

            (event)=>{


                this.selected =

                event.detail;



                this.render();



            }

        );



    },









    render(){



        const panel =

        document.querySelector(

            ".inspector"

        );





        if(
            !panel
        ){

            return;

        }






        panel.innerHTML = `



        <h3>

        Cabinet Properties

        </h3>





        <label>

        Type

        </label>



        <select id="editType">


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







        <label>

        Width

        </label>



        <input

        id="editWidth"

        type="number"

        value="${this.selected.compartment.width}"

        >







        <label class="check">


        <input

        id="editDoors"

        type="checkbox"

        ${

        this.selected.compartment.hasDoors

        ?

        "checked"

        :

        ""

        }

        >


        Doors


        </label>







        <label class="check">


        <input

        id="editDrawers"

        type="checkbox"

        ${

        this.selected.compartment.drawers.enabled

        ?

        "checked"

        :

        ""

        }

        >


        Drawers


        </label>







        <label>

        Drawer Profile

        </label>



        <select id="drawerProfile">


        <option value="standard">

        Standard

        </option>



        <option value="gola">

        Gola

        </option>



        </select>







        <button id="saveCabinet">


        Update


        </button>



        `;





        this.connectEvents();



    },









    connectEvents(){



        document

        .getElementById(

            "saveCabinet"

        )

        .onclick =

        ()=>this.save();



    },









    save(){



        const c =

        this.selected.compartment;






        c.type =

        document.getElementById(

            "editType"

        )

        .value;






        c.width =

        Number(

            document.getElementById(

                "editWidth"

            )

            .value

        );







        c.hasDoors =

        document.getElementById(

            "editDoors"

        )

        .checked;








        c.drawers.enabled =

        document.getElementById(

            "editDrawers"

        )

        .checked;






        c.drawers.profile =

        document.getElementById(

            "drawerProfile"

        )

        .value;







        PreviewEngine.render();



        DimensionSystem.update();




        App.notify(

            "Cabinet updated"

        );



    }





};







document.addEventListener(

"DOMContentLoaded",

()=>{


    PropertyInspector.init();


});
