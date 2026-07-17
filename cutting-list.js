/* =====================================================
   Cabinet Studio
   Cutting List Processor
   Milestone 2
===================================================== */


const CuttingList = {


    generate(parts){


        const grouped = {};



        parts.forEach(part => {


            const key =
            `${part.name}_${part.width}_${part.height}`;



            if(!grouped[key]){


                grouped[key] = {


                    name:
                    part.name,


                    width:
                    part.width,


                    height:
                    part.height,


                    quantity:
                    0


                };


            }



            grouped[key].quantity +=
            part.quantity;



        });




        return Object.values(grouped);



    },









    categorise(parts){



        const result = {


            carcass: [],

            doors: [],

            drawers: [],

            hardware: []


        };




        parts.forEach(part => {



            const name =
            part.name.toLowerCase();




            if(
                name.includes("door")
            ){

                result.doors.push(part);

            }


            else if(

                name.includes("drawer")

            ){

                result.drawers.push(part);

            }


            else if(

                name.includes("rail")

            ){

                result.hardware.push(part);

            }


            else {

                result.carcass.push(part);

            }



        });



        return result;



    },









    print(parts){



        console.log(
            "=============================="
        );


        console.log(
            "CUTTING LIST"
        );


        console.log(
            "=============================="
        );




        parts.forEach(part=>{


            console.log(

                `${part.name}
                 ${part.width} x ${part.height}
                 Qty: ${part.quantity}`

            );


        });



    }






};





console.log(
    "Cutting List Processor Loaded"
);
