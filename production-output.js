/* =====================================================
   Cabinet Studio
   Production Output System
   Milestone 7
===================================================== */


const ProductionOutput = {



    generate(project){



        const parts =

        CuttingList.generate(

            project.generatedParts

        );




        const materialParts =

        MaterialManager.apply(

            parts

        );






        const warnings =

        EngineeringValidator.validate(

            project

        );







        return {



            date:

            new Date()
            .toLocaleDateString(),



            parts:

            materialParts,



            warnings:



            warnings



        };



    },









    display(report){



        const output =

        document.getElementById(

            "outputTable"

        );





        if(
            !output
        ){

            return;

        }





        output.innerHTML="";







        report.parts
        .forEach(part=>{



            const row =

            document.createElement(
                "div"
            );



            row.className =

            "cut-row";





            row.innerHTML = `


            <span>

            ${part.name}

            </span>



            <span>

            ${part.width}

            x

            ${part.height}

            </span>



            <span>

            ${part.quantity}

            </span>



            <span>

            ${part.material}

            </span>



            `;





            output.appendChild(

                row

            );



        });







        if(

            report.warnings.length

        ){


            App.notify(

            report.warnings.length +

            " engineering warnings"

            );


        }




    }






};





console.log(
    "Production Output Loaded"
);
