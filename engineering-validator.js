/* =====================================================
   Cabinet Studio
   Engineering Validation System
   Milestone 4
===================================================== */


const EngineeringValidator = {



    validate(project){


        const warnings = [];



        project.compartments
        .forEach((compartment,index)=>{



            this.checkWidth(
                compartment,
                index,
                warnings
            );



            this.checkDrawers(
                compartment,
                index,
                warnings
            );



            this.checkDoors(
                compartment,
                index,
                warnings
            );



        });




        return warnings;


    },









    checkWidth(
        compartment,
        index,
        warnings
    ){


        if(
            compartment.width >
            EngineeringRules.settings.maxShelfSpan
        ){


            warnings.push({

                level:"warning",

                message:

                `Compartment ${index+1} is ${compartment.width}mm wide. Automatic cabinet splitting required.`


            });


        }



    },









    checkDrawers(
        compartment,
        index,
        warnings
    ){


        if(
            compartment.drawers.enabled
        ){


            if(
                compartment.drawers.quantity < 1
            ){


                warnings.push({

                    level:"error",

                    message:

                    `Compartment ${index+1} has drawers enabled but no quantity set.`


                });


            }



            if(
                compartment.drawers.quantity > 8
            ){


                warnings.push({

                    level:"warning",

                    message:

                    `Compartment ${index+1} has too many drawers.`


                });


            }


        }



    },









    checkDoors(
        compartment,
        index,
        warnings
    ){



        if(
            compartment.hasDoors
        ){


            const height =

            EngineeringRules
            .doorHeight();




            if(
                height > 2600
            ){


                warnings.push({

                    level:"warning",

                    message:

                    `Compartment ${index+1} door height exceeds common handling size.`


                });


            }


        }



    }







};





console.log(
    "Engineering Validator Loaded"
);
