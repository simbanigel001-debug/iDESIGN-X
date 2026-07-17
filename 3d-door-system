/* =====================================================
   Cabinet Studio
   3D Door System
   Milestone 10
===================================================== */


const Door3DSystem = {



    doors:[],








    clear(){



        this.doors.forEach(

            door=>{


                ThreeSetup.scene.remove(

                    door.object

                );


            }

        );



        this.doors=[];



    },









    createDoor(

        width,

        height,

        depth,

        x,

        y,

        z,

        mirror=false

    ){



        const geometry =

        new THREE.BoxGeometry(

            width,

            height,

            depth

        );







        const material =

        mirror

        ?

        new THREE.MeshStandardMaterial({

            color:0xbfc7d5,

            metalness:0.6,

            roughness:0.2

        })

        :

        new THREE.MeshStandardMaterial({

            color:0xffffff

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







        mesh.userData = {


            open:false,


            closedRotation:0,


            openRotation:

            -Math.PI/2


        };







        ThreeSetup.scene.add(

            mesh

        );








        this.doors.push({


            object:mesh


        });







        return mesh;



    },









    build(){



        this.clear();







        let x=0;







        Project.compartments

        .forEach(

            compartment=>{





                if(

                    !compartment.hasDoors

                ){

                    x+=compartment.width;

                    return;


                }








                const doorCount =

                DoorEngine.calculateDoorCount(

                    compartment.width

                );








                const doorWidth =

                DoorEngine.calculateDoorWidth(

                    compartment.width,

                    doorCount

                );








                for(

                    let i=0;

                    i<doorCount;

                    i++

                ){





                    this.createDoor(



                        doorWidth,


                        2596,


                        20,



                        x+

                        (

                            doorWidth/2

                        ),



                        1398,



                        -320,



                        compartment.mirror || false



                    );





                    x += doorWidth;





                }






            }

        );







        App.notify(

            "3D doors created"

        );



    }








};





console.log(
    "3D Door System Loaded"
);
