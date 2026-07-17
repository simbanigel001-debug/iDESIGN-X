/* =====================================================
   Cabinet Studio
   Layout Preview Synchronisation
   Milestone 6
===================================================== */


const LayoutPreviewSync = {



    refresh(){



        PreviewEngine.render();



        DimensionSystem.update();



        this.updateStats();



    },









    updateStats(){



        const stats =

        document.querySelector(
            ".stats-panel"
        );



        if(
            !stats
        ){

            return;

        }






        const totalWidth =

        Project.getTotalWidth();





        const count =

        Project.compartments.length;







        stats.innerHTML = `



        <div>

        Total Width

        <strong>

        ${totalWidth}mm

        </strong>

        </div>





        <div>

        Compartments

        <strong>

        ${count}

        </strong>

        </div>





        <div>

        Height

        <strong>

        2700mm

        </strong>

        </div>



        `;



    }






};








/*
    Override automatic generation refresh
*/


const originalGenerateLayout =

AutoLayoutUI.generate;





AutoLayoutUI.generate = function(){



    originalGenerateLayout.call(
        this
    );



    LayoutPreviewSync.refresh();



};








document.addEventListener(

"DOMContentLoaded",

()=>{


    LayoutPreviewSync.refresh();


});
