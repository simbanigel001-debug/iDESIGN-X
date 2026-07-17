/* =====================================================
   Cabinet Studio
   Visual Preview Engine
   Milestone 5
===================================================== */


const PreviewEngine = {



    init(){


        this.canvas =
        document.querySelector(
            ".design-board"
        );


        this.render();


    },









    render(){


        if(
            !this.canvas
        ){

            return;

        }



        this.canvas.innerHTML = "";



        if(
            Project.compartments.length===0
        ){


            this.showEmpty();

            return;


        }




        const wardrobe =
        document.createElement(
            "div"
        );



        wardrobe.className =
        "wardrobe-preview";





        Project.compartments
        .forEach(
            (compartment,index)=>{


                wardrobe.appendChild(

                    this.createCompartment(

                        compartment,

                        index

                    )

                );


            }
        );




        this.canvas.appendChild(
            wardrobe
        );



    },









    createCompartment(
        compartment,
        index
    ){


        const box =
        document.createElement(
            "div"
        );



        box.className =
        "preview-compartment";




        box.style.width =

        Math.max(
            120,
            compartment.width / 5
        )
        +"px";





        box.innerHTML = `


        <div class="compartment-title">

            ${compartment.type}

        </div>



        <div class="cabinet-body">



        ${
            compartment.type==="hanging"

            ?

            `

            <div class="rail">
            ─────────
            </div>

            `

            :

            ""

        }





        ${
            compartment.drawers.enabled

            ?

            `

            <div class="drawer-stack">

            ${
                Array(
                    compartment.drawers.quantity
                )
                .fill(
                    "<div class='drawer'></div>"
                )
                .join("")
            }

            </div>

            `

            :

            ""

        }




        </div>



        <div class="dimension">

        ${compartment.width}mm

        </div>


        `;




        box.onclick =
        ()=>{


            box.onclick =
()=>{


    document.dispatchEvent(

        new CustomEvent(
            "compartmentSelected",
            {

                detail:{

                    compartment:
                    compartment,

                    index:
                    index

                }

            }

        )

    );


};




        }




    showEmpty(){



        this.canvas.innerHTML = `


        <div class="empty-state">


        <div class="cube">
        ◇
        </div>


        <h3>
        Workspace Ready
        </h3>


        <p>
        Add compartments to begin designing.
        </p>


        </div>


        `;


    }





};








document.addEventListener(
"DOMContentLoaded",
()=>{


    PreviewEngine.init();


});
