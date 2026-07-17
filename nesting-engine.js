/* =====================================================
   Cabinet Studio
   Nesting Optimisation Engine
   Milestone 8
===================================================== */


const NestingEngine = {



    optimise(parts){



        SheetManager.clear();





        const sorted =

        [...parts]

        .sort(

            (a,b)=>

            (

                b.width *

                b.height

            )

            -

            (

                a.width *

                a.height

            )

        );








        sorted.forEach(part=>{



            this.placePart(

                part

            );



        });







        return SheetManager.sheets;



    },









    placePart(part){



        const material =

        this.getMaterialType(

            part

        );






        let placed = false;







        SheetManager.sheets

        .filter(

            sheet=>

            sheet.material===material

        )

        .forEach(sheet=>{



            if(
                !placed
                &&
                this.canFit(
                    sheet,
                    part
                )
            ){



                SheetManager.addPartToSheet(

                    sheet,

                    part

                );



                placed=true;



            }



        });







        if(
            !placed
        ){



            const sheet =

            SheetManager.createSheet(

                material

            );





            SheetManager.addPartToSheet(

                sheet,

                part

            );



        }



    },









    canFit(
        sheet,
        part
    ){



        const remaining =


        (

            sheet.width *

            sheet.height

        )

        -

        sheet.usedArea;





        return (

            part.width *

            part.height

        )

        <=

        remaining;



    },









    getMaterialType(part){



        if(
            part.material
        ){



            if(
                part.material
                .includes(
                    "MDF"
                )
            ){

                return "mdf18";

            }





            if(
                part.material
                .includes(
                    "18"
                )
            ){

                return "melamine18";

            }


        }






        return "melamine16";



    }






};





console.log(
    "Nesting Engine Loaded"
);
