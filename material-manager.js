/* =====================================================
   Cabinet Studio
   Material Management System
   Milestone 7
===================================================== */


const MaterialManager = {



    materials:{


        melamine16:{


            name:
            "Melamine 16mm",


            thickness:
            16,


            sheetWidth:
            2750,


            sheetHeight:
            1830


        },



        melamine18:{


            name:
            "Melamine 18mm",


            thickness:
            18,


            sheetWidth:
            2750,


            sheetHeight:
            1830


        },



        mdf18:{


            name:
            "MDF 18mm",


            thickness:
            18,


            sheetWidth:
            2440,


            sheetHeight:
            1220


        }


    },









    projectMaterial:


    "melamine16",







    setMaterial(type){


        if(
            this.materials[type]
        ){


            this.projectMaterial =
            type;


        }



    },









    getCurrent(){



        return (

            this.materials[

                this.projectMaterial

            ]

        );



    },









    apply(parts){



        const material =

        this.getCurrent();





        return parts.map(part=>{


            return {


                ...part,


                material:

                material.name,



                thickness:

                material.thickness



            };


        });



    }







};





console.log(
    "Material Manager Loaded"
);
