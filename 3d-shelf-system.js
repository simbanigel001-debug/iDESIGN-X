/* =====================================================
   Cabinet Studio
   3D Interior System
   Milestone 10
===================================================== */


const Interior3DSystem = {



    objects:[],







    clear(){



        this.objects.forEach(

            object=>{


                ThreeSetup.scene.remove(

                    object

                );


            }

        );



        this.objects=[];



    },









    createPart(

        width,

        height,

        depth,

        x,

        y,

        z,

        color,

        name

    ){



        const geometry =

        new THREE.BoxGeometry(

            width,

            height,

            depth

        );






        const material =

        new THREE.MeshStandardMaterial({

            color

        });






        const mesh =

        new THREE.Mesh(

            geometry,

            material

        );






        mesh.position.set(

            x,

            y,

            z

        );






        mesh.name=name;






        ThreeSetup.scene.add(

            mesh

        );






        this.objects.push(

            mesh

        );






        return mesh;



    },









    build(){



        this.clear();





        let x=0;






        Project.compartments

        .forEach(

            compartment=>{





                const width =

                compartment.width;








                /*
                    Shelves
                */



                let shelfLevels =

                [


                    500,


                    900,


                    1300,


                    1700,


                    2100


                ];







                shelfLevels.forEach(

                    level=>{



                        this.createPart(


                            width,


                            16,


                            584,



                            x+

                            width/2,



                            level,



                            0,



                            0xc9b18a,



                            "Shelf"


                        );



                    }

                );









                /*
                    Hanging rail
                */



                if(

                    compartment.type ===

                    "hanging"

                ){



                    const geometry =

                    new THREE.CylinderGeometry(

                        15,

                        15,

                        width,

                        32

                    );





                    const material =

                    new THREE.MeshStandardMaterial({

                        color:0xaaaaaa

                    });






                    const rail =

                    new THREE.Mesh(

                        geometry,

                        material

                    );






                    rail.rotation.z =

                    Math.PI/2;






                    rail.position.set(

                        x+

                        width/2,

                        1500,

                        -200

                    );






                    ThreeSetup.scene.add(

                        rail

                    );






                    this.objects.push(

                        rail

                    );



                }









                /*
                    Drawers
                */



                if(

                    compartment.drawers

                    &&

                    compartment.drawers.enabled

                ){



                    for(

                        let i=0;

                        i<

                        compartment.drawers.quantity;

                        i++

                    ){



                        this.createPart(


                            width-60,


                            120,


                            450,



                            x+

                            width/2,



                            200+

                            (

                                i*150

                            ),



                            -200,



                            0x444444,



                            "Drawer Box"


                        );



                    }



                }







                x+=width;






            }

        );







        App.notify(

            "3D interior generated"

        );



    }






};





console.log(
    "Interior 3D System Loaded"
);
