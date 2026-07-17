/* =====================================================
   Cabinet Studio
   Undo / Redo History System
   Milestone 9
===================================================== */


const HistoryManager = {



    undoStack:[],


    redoStack:[],






    init(){


        this.save();


        this.bindButtons();



    },









    save(){



        const state =


        JSON.stringify(

            Project.compartments

        );






        this.undoStack.push(

            state

        );






        this.redoStack=[];



    },









    undo(){



        if(

            this.undoStack.length <= 1

        ){


            App.notify(

                "Nothing to undo"

            );


            return;


        }







        const current =

        this.undoStack.pop();







        this.redoStack.push(

            current

        );







        const previous =

        this.undoStack[

            this.undoStack.length-1

        ];








        this.restore(

            previous

        );



    },









    redo(){



        if(

            !this.redoStack.length

        ){


            App.notify(

                "Nothing to redo"

            );


            return;


        }








        const next =

        this.redoStack.pop();







        this.undoStack.push(

            next

        );







        this.restore(

            next

        );



    },









    restore(state){



        Project.compartments =


        JSON.parse(

            state

        );







        PreviewEngine.render();



        DimensionSystem.update();






        App.notify(

            "Design restored"

        );



    },









    bindButtons(){



        const undo =

        document.getElementById(

            "undoButton"

        );





        const redo =

        document.getElementById(

            "redoButton"

        );







        if(undo){



            undo.onclick =

            ()=>this.undo();



        }







        if(redo){



            redo.onclick =

            ()=>this.redo();



        }



    }





};







document.addEventListener(

"DOMContentLoaded",

()=>{


    HistoryManager.init();


});
