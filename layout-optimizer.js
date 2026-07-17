/* =====================================================
   Cabinet Studio
   Layout Optimisation Engine
   Milestone 6
===================================================== */


const LayoutOptimizer = {



    optimise(layout,totalWidth){



        let result =

        [...layout];







        result =

        this.balanceWidths(
            result,
            totalWidth
        );





        result =

        this.fixOpenShelves(
            result
        );





        result =

        this.prioritiseHanging(
            result
        );






        return result;



    },









    balanceWidths(layout,totalWidth){



        const target =

        Math.floor(

            totalWidth /

            layout.length

        );





        return layout.map(item=>{



            return {


                ...item,


                width:

                this.closestCabinetSize(
                    item.width ||
                    target
                )


            };



        });



    },









    closestCabinetSize(width){



        const common = [

            400,

            450,

            600,

            700,

            800,

            900,

            1000

        ];




        return common.reduce(

            (previous,current)=>{


                return (

                    Math.abs(
                        current-width
                    )

                    <

                    Math.abs(
                        previous-width
                    )

                )

                ?

                current

                :

                previous;


            }

        );



    },









    fixOpenShelves(layout){



        return layout.map(item=>{



            if(

                item.type==="open"

                &&

                item.width>800

            ){



                return {


                    ...item,


                    width:800


                };


            }





            return item;



        });



    },









    prioritiseHanging(layout){



        const hanging =

        layout.find(
            item=>
            item.type==="hanging"
        );





        if(
            hanging
        ){


            hanging.width =

            Math.max(

                hanging.width,

                700

            );


        }



        return layout;



    }






};





console.log(
    "Layout Optimizer Loaded"
);
