/* =====================================================
   Cabinet Studio
   Cabinet Engine Integration Layer
   Milestone 7
===================================================== */


const CabinetIntegration = {



    applyAccessories(project, compartment){



        /*
            DOORS
        */


        if(
            compartment.hasDoors
        ){


            const doors =

            DoorEngine.generate(
                compartment
            );



            doors.forEach(door=>{


                project.generatedParts.push(


                    new Part(

                        door.name,

                        door.width,

                        door.height,

                        1

                    )


                );


            });


        }







        /*
            DRAWERS
        */


        if(

            compartment.drawers

            &&

            compartment.drawers.enabled

        ){



            const drawers =

            DrawerEngine.generate(

                compartment

            );






            drawers.forEach(drawer=>{



                project.generatedParts.push(



                    new Part(

                        drawer.front.name,

                        drawer.front.width,

                        drawer.front.height,

                        1

                    )



                );







                project.generatedParts.push(



                    new Part(

                        "Drawer Side",

                        drawer.carcass.sideLength,

                        drawer.carcass.sideHeight,

                        drawer.carcass.sides

                    )



                );







                project.generatedParts.push(



                    new Part(

                        "Drawer Bottom",

                        drawer.bottom.width,

                        drawer.bottom.depth,

                        1

                    )



                );




            });



        }




    }






};





console.log(
    "Cabinet Integration Loaded"
);
