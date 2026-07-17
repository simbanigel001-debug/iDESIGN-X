/* =====================================================
   Cabinet Studio
   Design Save System
   Milestone 9
===================================================== */


const DesignStorage = {



    storageKey:

    "cabinetStudioProjects",







    saveProject(name){



        const projects =

        this.getProjects();







        const project = {



            id:

            Date.now(),



            name:

            name,



            created:

            new Date()

            .toISOString(),



            compartments:

            Project.compartments,



            settings:{



                height:2700,


                depth:600,


                plinth:100


            }



        };







        projects.push(

            project

        );







        localStorage.setItem(


            this.storageKey,


            JSON.stringify(

                projects

            )


        );








        App.notify(

            "Project saved"

        );



    },









    getProjects(){



        return JSON.parse(



            localStorage.getItem(

                this.storageKey

            )

            ||

            "[]"



        );



    },









    loadProject(id){



        const projects =

        this.getProjects();






        const project =

        projects.find(

            item=>

            item.id===id

        );






        if(
            !project
        ){

            App.notify(

                "Project not found"

            );


            return;


        }








        Project.compartments =

        project.compartments;








        PreviewEngine.render();



        DimensionSystem.update();






        App.notify(

            "Project loaded"

        );



    },









    deleteProject(id){



        let projects =

        this.getProjects();






        projects =

        projects.filter(

            item=>

            item.id!==id

        );







        localStorage.setItem(

            this.storageKey,


            JSON.stringify(

                projects

            )

        );






        App.notify(

            "Project deleted"

        );



    }






};





console.log(
    "Design Storage Loaded"
);
