/* =====================================================
   Cabinet Studio
   Production Export System
   Milestone 8
===================================================== */


const ProductionExport = {



    exportCSV(){



        const parts =

        Project.generatedParts;





        if(
            !parts.length
        ){


            App.notify(
                "No parts available"
            );


            return;


        }







        let csv =

        "PART,WIDTH,HEIGHT,QTY,MATERIAL\n";







        parts.forEach(part=>{



            csv +=

            `${part.name},${part.width},${part.height},${part.quantity},${part.material || "Melamine 16mm"}\n`;



        });







        this.download(

            csv,

            "cabinet-cutting-list.csv"

        );



    },









    exportSheets(){



        const sheets =

        SheetManager.sheets;






        let csv =

        "SHEET,MATERIAL,PARTS,USAGE\n";








        sheets.forEach(

            (sheet,index)=>{



                csv +=



                `Sheet ${index+1},${sheet.material},${sheet.parts.length},${SheetManager.sheetUsage(sheet)}%\n`;



            }

        );







        this.download(

            csv,

            "sheet-summary.csv"

        );



    },









    download(content,name){



        const blob =

        new Blob(

            [

                content

            ],

            {

                type:

                "text/csv"

            }

        );





        const url =

        URL.createObjectURL(

            blob

        );





        const link =

        document.createElement(

            "a"

        );





        link.href=url;



        link.download=name;



        link.click();





        URL.revokeObjectURL(

            url

        );



    }






};





console.log(
    "Production Export Loaded"
);
