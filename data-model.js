/* =====================================================
   Cabinet Studio
   Project Data Model
   Milestone 2
===================================================== */


class CabinetProject {


    constructor(){

        this.id =
        crypto.randomUUID();


        this.name =
        "Untitled Wardrobe";


        this.settings = {

            height: 2700,

            depth: 600,

            plinth: 100,

            material:
            "Melamine"

        };



        this.compartments = [];


        this.generatedParts = [];


    }





    addCompartment(data){


        const compartment =
        new Compartment(data);



        this.compartments.push(
            compartment
        );


        return compartment;


    }





    removeCompartment(id){


        this.compartments =
        this.compartments.filter(
            item =>
            item.id !== id
        );


    }





    getTotalWidth(){


        return this.compartments
        .reduce(
            (total,item)=>
            total + item.width,
            0
        );


    }





    clearParts(){


        this.generatedParts = [];


    }



}









class Compartment {


    constructor(data){


        this.id =
        crypto.randomUUID();


        this.width =
        data.width || 450;


        this.type =
        data.type || "hanging";


        this.hasDoors =
        data.hasDoors ?? true;



        this.doorType =
        data.doorType ||
        "melamine";



        this.drawers = {

            enabled:
            false,

            quantity:
            0,

            profile:
            "standard"

        };



        this.shelves = [];



        this.sidePanels = true;



        this.settings = {

            hangingRail:
            this.type==="hanging"

        };



    }








    addDrawer(quantity,profile){


        this.drawers.enabled =
        true;


        this.drawers.quantity =
        quantity;


        this.drawers.profile =
        profile ||
        "standard";


    }





    addShelf(height){


        this.shelves.push({

            height:
            height,

            depth:
            584

        });


    }



}









class Part {


    constructor(name,width,height,qty){


        this.id =
        crypto.randomUUID();


        this.name =
        name;


        this.width =
        width;


        this.height =
        height;


        this.quantity =
        qty || 1;



        this.material =
        "Melamine";


    }



}








/* =====================================================
   DEFAULT PROJECT INSTANCE
===================================================== */


const Project =
new CabinetProject();





/* =====================================================
   TEST DATA
   Remove later when UI connects
===================================================== */


Project.addCompartment({

    width:600,

    type:"hanging",

    hasDoors:true

});



Project.compartments[0]
.addDrawer(
    3,
    "standard"
);



console.log(
    "Cabinet Studio Model Loaded",
    Project
);
