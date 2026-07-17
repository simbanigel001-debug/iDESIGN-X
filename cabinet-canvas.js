/* =====================================================
   Cabinet Studio
   Interactive Cabinet Canvas
   Milestone 9
===================================================== */


const CabinetCanvas = {



    selected:null,





    init(){


        this.canvas =

        document.querySelector(

            ".design-board"

        );



        this.bind();



        this.render();



    },









    render(){



        if(
            !this.canvas
        ){

            return;

        }




        this.canvas.innerHTML="";






        const wrapper =

        document.createElement(

            "div"

        );



        wrapper.className =

        "cabinet-canvas";







        Project.compartments

        .forEach(

            (compartment,index)=>{



                wrapper.appendChild(

                    this.createObject(

                        compartment,

                        index

                    )

                );



            }

        );








        this.canvas.appendChild(

            wrapper

        );



    },









    createObject(

        compartment,

        index

    ){



        const object =

        document.createElement(

            "div"

        );





        object.className =

        "cabinet-object";






        object.style.width =


        (

            compartment.width /

            4

        )

        +"px";






        object.innerHTML = `



        <div class="cabinet-label">


        ${compartment.type}



        </div>




        <div class="cabinet-size">


        ${compartment.width}mm



        </div>


        `;







        object.onclick = ()=>{


            this.select(

                object,

                compartment,

                index

            );


        };







        return object;



    },









    select(

        element,

        compartment,

        index

    ){



        document

        .querySelectorAll(

            ".cabinet-object"

        )

        .forEach(

            item=>{


                item.classList

                .remove(

                    "active"

                );


            }

        );





        element.classList.add(

            "active"

        );





        this.selected = {


            element,

            compartment,

            index


        };






        document.dispatchEvent(


            new CustomEvent(

                "cabinetSelected",

                {

                    detail:this.selected

                }

            )


        );




    }







};









document.addEventListener(

"DOMContentLoaded",

()=>{


    CabinetCanvas.init();


});
