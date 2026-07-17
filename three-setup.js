/* =====================================================
   Cabinet Studio
   Three.js 3D Engine Setup
   Milestone 10
===================================================== */


const ThreeSetup = {



    scene:null,

    camera:null,

    renderer:null,

    controls:null,








    init(){



        const container =

        document.getElementById(

            "threeViewer"

        );





        if(
            !container
        ){

            return;

        }








        this.scene =

        new THREE.Scene();








        this.camera =

        new THREE.PerspectiveCamera(


            45,


            container.clientWidth /

            container.clientHeight,


            0.1,


            10000


        );







        this.camera.position.set(

            2500,

            1800,

            2500

        );








        this.renderer =

        new THREE.WebGLRenderer({

            antialias:true

        });







        this.renderer.setSize(

            container.clientWidth,

            container.clientHeight

        );








        container.appendChild(

            this.renderer.domElement

        );









        const light =

        new THREE.AmbientLight(

            0xffffff,

            1

        );





        this.scene.add(

            light

        );









        const directional =

        new THREE.DirectionalLight(

            0xffffff,

            1

        );





        directional.position.set(

            1000,

            2000,

            1000

        );





        this.scene.add(

            directional

        );








        this.animate();



    },









    animate(){



        requestAnimationFrame(

            ()=>this.animate()

        );







        this.renderer.render(

            this.scene,

            this.camera

        );



    }






};









document.addEventListener(

"DOMContentLoaded",

()=>{


    ThreeSetup.init();


});
