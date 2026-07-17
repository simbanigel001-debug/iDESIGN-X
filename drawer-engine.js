/* =====================================================
   Cabinet Studio
   Drawer Calculation Engine
   Milestone 7
===================================================== */


const DrawerEngine = {



    settings:{


        standardDepth:450,

        standardGap:4,

        golaGap:30,


        commonHeights:[

            100,

            120,

            150

        ]


    },









    generate(compartment){



        const drawers=[];



        const quantity =

        compartment.drawers.quantity;



        const profile =

        compartment.drawers.profile || 

        "standard";





        const faceWidth =

        this.faceWidth(

            compartment.width

        );






        const faceHeight =

        this.faceHeight(

            quantity,

            profile

        );







        for(

            let i=0;

            i<quantity;

            i++

        ){



            drawers.push({


                front:{


                    name:

                    "Drawer Front",


                    width:

                    faceWidth,


                    height:

                    faceHeight



                },



                carcass:{


                    sides:2,


                    sideLength:

                    this.settings.standardDepth,


                    sideHeight:

                    faceHeight



                },



                bottom:{


                    width:

                    faceWidth-32,


                    depth:

                    this.settings.standardDepth



                }



            });



        }





        return drawers;



    },









    faceWidth(width){



        return (

            width -

            32 -

            60

        );



    },









    faceHeight(quantity,profile){



        let height =

        (

            2700 -

            100

        )

        /

        quantity;






        if(
            profile==="gola"
        ){


            height -=

            this.settings.golaGap;



        }

        else{


            height -=

            this.settings.standardGap;


        }




        return Math.round(
            height
        );



    }







};





console.log(
    "Drawer Engine Loaded"
);
