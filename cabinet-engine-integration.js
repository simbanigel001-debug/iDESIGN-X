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

                        1,

                        compartment.id

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

                        1,

                        compartment.id

                    )



                );







                project.generatedParts.push(



                    new Part(

                        "Drawer Side",

                        drawer.carcass.sideLength,

                        drawer.carcass.sideHeight,

                        drawer.carcass.sides,

                        compartment.id

                    )



                );







                project.generatedParts.push(



                    new Part(

                        "Drawer Bottom",

                        drawer.bottom.width,

                        drawer.bottom.depth,

                        1,

                        compartment.id

                    )



                );




            });



        }




    }






};





console.log(
    "Cabinet Integration Loaded"
);
