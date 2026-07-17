/* =====================================================
   Cabinet Studio
   Cutting Layout Visualiser
   Milestone 8
===================================================== */


const CuttingLayout = {



    render(sheets){



        const container =

        document.getElementById(

            "cuttingSheets"

        );





        if(
            !container
        ){

            return;

        }





        container.innerHTML="";








        sheets.forEach(

            (sheet,index)=>{



                const board =

                document.createElement(

                    "div"

                );



                board.className =

                "cutting-board";





                board.innerHTML = `


                <div class="sheet-title">


                Sheet ${index+1}

                <span>

                ${sheet.material}

                </span>


                </div>




                <div class="sheet-area">


                </div>




                <div class="sheet-info">


                Usage:

                ${SheetManager.sheetUsage(sheet)}%


                </div>


                `;







                const area =

                board.querySelector(

                    ".sheet-area"

                );







                this.placeParts(

                    area,

                    sheet

                );








                container.appendChild(

                    board

                );




            }

        );





    },









    placeParts(area,sheet){



        let x=10;

        let y=10;



        sheet.parts.forEach(part=>{



            const block =

            document.createElement(

                "div"

            );



            block.className =

            "cut-part";






            const scale =

            0.08;





            block.style.width =

            (

                part.width *

                scale

            )

            +"px";





            block.style.height =

            (

                part.height *

                scale

            )

            +"px";







            block.style.left =

            x+"px";



            block.style.top =

            y+"px";







            block.innerHTML = `


            ${part.name}


            <small>

            ${part.width}x${part.height}

            </small>


            `;






            area.appendChild(

                block

            );







            x +=

            (

                part.width *

                scale

            )

            +10;







            if(
                x>600
            ){

                x=10;

                y+=100;

            }





        });



    }






};





console.log(
    "Cutting Layout Loaded"
);
