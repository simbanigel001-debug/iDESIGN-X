/* =====================================================
   Cabinet Studio
   Nesting Settings System
   Milestone 8
===================================================== */


const NestingSettings = {



    values:{


        kerf:3,


        allowRotation:true,


        followGrain:true,


        edgeBand:1,


        minimumOffcut:100


    },









    set(
        option,
        value
    ){



        if(

            this.values
            .hasOwnProperty(option)

        ){


            this.values[option]=value;



        }



    },









    get(
        option
    ){



        return (

            this.values[option]

        );



    }






};





console.log(
    "Nesting Settings Loaded"
);
