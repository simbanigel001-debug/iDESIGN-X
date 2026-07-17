/* =====================================================
   Cabinet Studio
   Cutting Layout Integration
===================================================== */


const CuttingLayoutIntegration = {



    generate(){


        if(
            typeof NestingEngine === "undefined"
        ){

            App.notify(
                "Nesting engine not loaded"
            );

            return;

        }





        if(
            !Project.generatedParts ||
            Project.generatedParts.length === 0
        ){

            App.notify(
                "No cutting parts available"
            );

            return;

        }







        const sheets =

        NestingEngine.optimise(

            Project.generatedParts

        );







        if(
            typeof SheetManager !== "undefined"
        ){

            SheetManager.sheets = sheets;

        }







        if(
            typeof CuttingLayout !== "undefined"
        ){

            CuttingLayout.render(

                sheets

            );

        }







        App.notify(

            sheets.length +

            " cutting sheets generated"

        );



    }




};







console.log(

    "Cutting Layout Integration Loaded"

);
