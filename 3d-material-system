/* =====================================================
   Cabinet Studio
   3D Material System
   Milestone 10
===================================================== */


const Material3DSystem = {



    library:{



        whiteMatt:{


            name:"White Matt",


            color:0xf2f2f2,


            roughness:0.8,


            metalness:0



        },





        blackMatt:{


            name:"Black Matt",


            color:0x111111,


            roughness:0.9,


            metalness:0



        },





        oakWood:{


            name:"Natural Oak",


            color:0xb88752,


            roughness:0.7,


            metalness:0



        },





        walnut:{


            name:"Walnut",


            color:0x5b3820,


            roughness:0.75,


            metalness:0



        },





        glossWhite:{


            name:"Gloss White",


            color:0xffffff,


            roughness:0.15,


            metalness:0



        }



    },









    current:"whiteMatt",







    apply(materialName){



        if(

            !this.library[materialName]

        ){

            return;

        }







        this.current =

        materialName;






        const material =

        this.library[materialName];








        ThreeSetup.scene

        .traverse(

            object=>{





                if(

                    object.isMesh

                ){



                    object.material =

                    new THREE.MeshStandardMaterial({



                        color:

                        material.color,



                        roughness:

                        material.roughness,



                        metalness:

                        material.metalness



                    });



                }





            }

        );







        App.notify(

            material.name +

            " applied"

        );



    }






};





console.log(
    "3D Material System Loaded"
);
