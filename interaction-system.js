/* =====================================================
   Cabinet Studio
   Dimension Annotation System
   Milestone 5
===================================================== */


const DimensionSystem = {



    init(){


        this.attach();


    },









    attach(){



        document.addEventListener(

            "DOMContentLoaded",

            ()=>{


                this.createPanel();


                this.update();


            }

        );


    },









    createPanel(){



        const area =

        document.querySelector(
            ".canvas-header"
        );



        const box =

        document.createElement(
            "div"
        );



        box.id =
        "dimensionPanel";



        box.className =
        "dimension-panel";



        area.appendChild(
            box
        );



    },









    update(){



        const panel =

        document.getElementById(
            "dimensionPanel"
        );



        if(
            !panel
        ){

            return;

        }





        const totalWidth =

        Project.getTotalWidth();






        panel.innerHTML = `



        <span>
        Width:
        <strong>
        ${totalWidth}mm
        </strong>
        </span>



        <span>
        Height:
        <strong>
        2700mm
        </strong>
        </span>



        <span>
        Depth:
        <strong>
        600mm
        </strong>
        </span>



        `;



    }






};





document.addEventListener(

"DOMContentLoaded",

()=>{


    DimensionSystem.init();


});
