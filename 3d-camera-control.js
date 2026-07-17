/* =====================================================
   Cabinet Studio
   3D Camera Controls
   Milestone 10
===================================================== */


const CameraControls3D = {



    controls:null,







    init(){



        if(
            !ThreeSetup.camera ||
            !ThreeSetup.renderer
        ){

            return;

        }






        this.controls =

        new THREE.OrbitControls(


            ThreeSetup.camera,

            ThreeSetup.renderer.domElement


        );







        this.controls.enableDamping = true;


        this.controls.dampingFactor = 0.08;


        this.controls.minDistance = 500;


        this.controls.maxDistance = 6000;







        this.controls.target.set(

            1200,

            1200,

            0

        );







        this.controls.update();



    },









    reset(){



        ThreeSetup.camera.position.set(

            2500,

            1800,

            2500

        );







        this.controls.target.set(

            1200,

            1200,

            0

        );







        this.controls.update();



    },









    frontView(){



        ThreeSetup.camera.position.set(

            1200,

            1300,

            3500

        );



        this.controls.update();



    },









    sideView(){



        ThreeSetup.camera.position.set(

            3500,

            1300,

            800

        );



        this.controls.update();



    },









    topView(){



        ThreeSetup.camera.position.set(

            1200,

            4000,

            0

        );



        this.controls.update();



    }






};







document.addEventListener(

"DOMContentLoaded",

()=>{


    CameraControls3D.init();


});
