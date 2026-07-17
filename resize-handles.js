/* =====================================================
   Cabinet Studio
   Cabinet Resize Handles
   Milestone 9
===================================================== */


const ResizeHandles = {



    minWidth:300,


    maxWidth:1200,






    init(){


        this.attach();


    },









    attach(){



        document.addEventListener(

            "cabinetSelected",

            (event)=>{


                this.addHandle(

                    event.detail

                );


            }

        );



    },









    addHandle(data){



        const element =

        data.element;






        const old =

        element.querySelector(

            ".resize-handle"

        );





        if(old){

            return;

        }







        const handle =

        document.createElement(

            "div"

        );



        handle.className =

        "resize-handle";





        element.appendChild(

            handle

        );





        this.enableDrag(

            handle,

            data

        );



    },









    enableDrag(
        handle,
        data
    ){



        let startX;



        let startWidth;







        handle.onmousedown =

        (event)=>{



            startX =

            event.clientX;



            startWidth =

            data.compartment.width;



            document.onmousemove =

            move;



            document.onmouseup =

            stop;



        };









        const move =

        (event)=>{



            let difference =


            event.clientX -

            startX;







            let newWidth =


            startWidth +

            difference * 4;








            newWidth =

            Math.max(

                this.minWidth,

                Math.min(

                    this.maxWidth,

                    Math.round(
                        newWidth
                    )

                )

            );







            data.compartment.width =

            newWidth;







            data.element.style.width =

            (

                newWidth /

                4

            )

            +"px";







            DimensionSystem.update();




        };









        const stop =

        ()=>{



            document.onmousemove=null;

            document.onmouseup=null;




            App.notify(

                "Cabinet width updated"

            );



        };



    }






};







document.addEventListener(

"DOMContentLoaded",

()=>{


    ResizeHandles.init();


});
