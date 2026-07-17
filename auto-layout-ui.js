/* =====================================================
   Cabinet Studio
   Automatic Layout Interface
   Milestone 6
===================================================== */


const AutoLayoutUI = {



    init(){


        this.createPanel();


        this.bind();



    },









    createPanel(){



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

        AUTO DESIGN

        </div>





        <label>

        Wardrobe Width

        </label>



        <input

        id="autoWidth"

        type="number"

        value="2400"

        >






        <label>

        Number Of Compartments

        </label>



        <input

        id="autoCount"

        type="number"

        value="3"

        min="1"

        max="8"

        >





        <label class="check">


        <input

        id="autoHanging"

        type="checkbox"

        checked

        >


        Hanging Section


        </label>






        <label class="check">


        <input

        id="autoOpen"

        type="checkbox"

        checked

        >


        Open Shelves


        </label>






        <button

        id="generateLayout">


        Generate Layout


        </button>



        `;



        sidebar.appendChild(
            panel
        );



    },









    bind(){



        document

        .getElementById(
            "generateLayout"
        )

        .addEventListener(

            "click",

            ()=>this.generate()

        );



    },









    generate(){



        const width =

        Number(

            document

            .getElementById(
                "autoWidth"
            )

            .value

        );





        const count =

        Number(

            document

            .getElementById(
                "autoCount"
            )

            .value

        );





        const hanging =

        document

        .getElementById(
            "autoHanging"
        )

        .checked;





        const open =

        document

        .getElementById(
            "autoOpen"
        )

        .checked;







       let layout =

LayoutEngine.generate({

    width,

    compartments:
    count,

    hanging,

    open

});



layout =

LayoutOptimizer.optimise(

    layout,

    width

); 







        Project.compartments = [];







        layout.forEach(item=>{


            Project.addCompartment(
                item
            );


        });







        PreviewEngine.render();



        DimensionSystem.update();




        App.notify(

        "Automatic wardrobe layout created"

        );



    }







};







document.addEventListener(

"DOMContentLoaded",

()=>{


    AutoLayoutUI.init();


});
