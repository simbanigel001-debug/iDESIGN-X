/* =====================================================
   Cabinet Studio
   Engineering Rules Engine
   Milestone 4
===================================================== */


const EngineeringRules = {



    settings:{


        height:2700,

        depth:600,

        plinth:100,

        shelfDepth:584,

        shelfAllowance:32,

        maxShelfSpan:1000


    },







    shelfLength(compartmentWidth){


        return (

            compartmentWidth -

            this.settings.shelfAllowance

        );


    },








    requiresSplit(width){


        return (

            width >

            this.settings.maxShelfSpan

        );


    },








    calculateCabinetSplit(width){



        if(
            !this.requiresSplit(width)
        ){

            return [

                width

            ];

        }





        const sections = [];



        let remaining =
        width;



        while(
            remaining >
            this.settings.maxShelfSpan
        ){


            sections.push(
                this.settings.maxShelfSpan
            );


            remaining -=
            this.settings.maxShelfSpan;


        }





        if(
            remaining > 0
        ){

            sections.push(
                remaining
            );

        }




        return sections;



    },









    doorHeight(){


        return (

            this.settings.height -

            this.settings.plinth -

            4

        );


    },









    doorWidth(compartmentWidth){


        return (

            compartmentWidth -

            4

        );


    },









    drawerFaceWidth(compartmentWidth){


        return (

            this.shelfLength(
                compartmentWidth
            )

            -

            60

        );


    },









    drawerFaceHeight(count,profile){



        const available =

        this.settings.height -

        this.settings.plinth;



        let height =

        available /

        count;





        if(
            profile==="gola"
        ){

            height -=30;


        }

        else {


            height -=4;


        }



        return Math.round(
            height
        );



    }







};





console.log(
    "Engineering Rules Loaded"
);
