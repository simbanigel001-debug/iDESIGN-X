/* =====================================================
   Cabinet Studio
   Cabinet Calculation Engine
   Milestone 2
===================================================== */


const CabinetEngine = {


    CONSTANTS:{


        HEIGHT:2700,

        DEPTH:600,

        PLINTH:100,

        SHELF_ALLOWANCE:32,

        SHELF_DEPTH:584,


        MAX_SHELF_SPAN:1000


    },






    generate(project){


        project.clearParts();



        project.compartments.forEach(
            compartment => {


                this.generateCompartment(
                    project,
                    compartment
                );


            }
        );



        return project.generatedParts;


    },








    generateCompartment(project,compartment){



        const width =
        compartment.width;



        /*
            Every compartment
            receives side panels
        */


        this.addPart(
            project,
            "Side Panel",
            this.CONSTANTS.HEIGHT,
            this.CONSTANTS.DEPTH,
            2
        );






        const shelfLength =
        width -
        this.CONSTANTS.SHELF_ALLOWANCE;







        /*
            Internal plinth
        */


        this.addPart(

            project,

            "Internal Plinth",

            shelfLength,

            this.CONSTANTS.PLINTH,

            1

        );









        /*
            Cabinet Type Logic
        */


        switch(
            compartment.type
        ){


            case "hanging":

                this.generateHanging(
                    project,
                    compartment,
                    shelfLength
                );

            break;



            case "folding":

                this.generateFolding(
                    project,
                    compartment,
                    shelfLength
                );

            break;




            case "open":

                this.generateOpen(
                    project,
                    compartment,
                    shelfLength
                );

            break;



            default:

                console.warn(
                    "Unknown compartment type"
                );



        }






        /*
            Doors
        */


        if(
            compartment.hasDoors
        ){

            this.generateDoor(
                project,
                compartment
            );

        }






        /*
            Drawers
        */


        if(
            compartment.drawers.enabled
        ){

            this.generateDrawers(
                project,
                compartment,
                shelfLength
            );

        }



    },









    generateHanging(
        project,
        compartment,
        shelfLength
    ){



        /*
            Top shelf
        */


        this.addShelf(
            project,
            shelfLength,
            "Top Shelf"
        );



        /*
            Bottom shelf
        */


        this.addShelf(
            project,
            shelfLength,
            "Bottom Shelf"
        );



        /*
            Inner shelf
        */


        this.addShelf(
            project,
            shelfLength,
            "Inner Shelf"
        );



        /*
            Hanging shelf
        */


        this.addShelf(
            project,
            shelfLength,
            "Hanging Shelf"
        );



        this.addPart(

            project,

            "Hanging Rail",

            shelfLength,

            40,

            1

        );



    },









    generateFolding(
        project,
        compartment,
        shelfLength
    ){



        /*
            Folding cabinet:
            standard 8 shelves
        */


        for(
            let i=0;
            i<8;
            i++
        ){


            this.addShelf(

                project,

                shelfLength,

                "Folding Shelf"

            );


        }



    },









    generateOpen(
        project,
        compartment,
        shelfLength
    ){



        this.addShelf(

            project,

            shelfLength,

            "Open Shelf"

        );


    },









    generateDoor(
        project,
        compartment
    ){


        let doorWidth =
        compartment.width - 4;



        let doorHeight =
        this.CONSTANTS.HEIGHT -
        this.CONSTANTS.PLINTH -
        4;



        this.addPart(

            project,

            "Door",

            doorWidth,

            doorHeight,

            1

        );


    },









    generateDrawers(
        project,
        compartment,
        shelfLength
    ){



        const drawerWidth =
        shelfLength - 60;




        for(
            let i=0;
            i<
            compartment.drawers.quantity;
            i++
        ){



            this.addPart(

                project,

                "Drawer Front",

                drawerWidth,

                120,

                1

            );



            this.addPart(

                project,

                "Drawer Side",

                450,

                120,

                2

            );



            this.addPart(

                project,

                "Drawer Bottom",

                drawerWidth-32,

                450,

                1

            );


        }



    },









    addShelf(
        project,
        width,
        name
    ){



        this.addPart(

            project,

            name,

            width,

            this.CONSTANTS.SHELF_DEPTH,

            1

        );


    },









    addPart(
        project,
        name,
        width,
        height,
        quantity
    ){


        project.generatedParts.push(

            new Part(

                name,

                width,

                height,

                quantity

            )

        );


    }







};





console.log(
    "Cabinet Engine Loaded"
);
