/* =====================================================
   Cabinet Studio
   Sheet Management System
   Milestone 8
===================================================== */


const SheetManager = {



    sheets:[],





    defaultSheets:{


        melamine16:{


            width:2750,

            height:1830,

            thickness:16


        },



        melamine18:{


            width:2750,

            height:1830,

            thickness:18


        },



        mdf18:{


            width:2440,

            height:1220,

            thickness:18


        }


    },









    createSheet(material){



        const size =

        this.defaultSheets[material];




        const sheet = {


            id:

            Date.now(),



            material,



            width:

            size.width,



            height:

            size.height,



            usedArea:0,



            parts:[]



        };




        this.sheets.push(

            sheet

        );




        return sheet;



    },









    clear(){



        this.sheets=[];



    },









    addPartToSheet(
        sheet,
        part
    ){



        sheet.parts.push(

            part

        );



        sheet.usedArea +=


        (

            part.width *

            part.height

        );



    },









    sheetUsage(sheet){



        const total =


        sheet.width *

        sheet.height;





        return Math.round(

            (

                sheet.usedArea /

                total

            )

            *

            100

        );



    }






};





console.log(
    "Sheet Manager Loaded"
);
