/* =====================================================
   Cabinet Studio
   Application Core
   Milestone 1
===================================================== */


const App = {

    version: "1.0",

    project: {

        name: "Untitled Project",

        cabinets: 0,

        parts: 0,

        sheets: 0

    },


    settings: {

        theme: "dark"

    },


    init(){

        this.bindEvents();

        this.load();

        this.updateStats();

        this.notify(
            "System initialized successfully"
        );

    },





    bindEvents(){



        document
        .getElementById("themeBtn")
        .addEventListener(
            "click",
            () => this.toggleTheme()
        );




        document
        .getElementById("commandBtn")
        .addEventListener(
            "click",
            () => this.openCommand()
        );




        document
        .getElementById("startBtn")
        .addEventListener(
            "click",
            () => this.createProject()
        );




        document
        .getElementById("generateBtn")
        .addEventListener(
            "click",
            () => this.generate()
        );




        document
        .getElementById("saveBtn")
        .addEventListener(
            "click",
            () => this.save()
        );




        document
        .getElementById("newProjectBtn")
        .addEventListener(
            "click",
            () => this.newProject()
        );




        document
        .getElementById("commandPalette")
        .addEventListener(
            "click",
            (e)=>{

                if(
                    e.target.id === 
                    "commandPalette"
                ){

                    this.closeCommand();

                }

            }
        );





        document
        .getElementById("commandInput")
        .addEventListener(
            "keydown",
            (e)=>{

                if(
                    e.key === "Enter"
                ){

                    this.executeCommand(
                        e.target.value
                    );

                }

            }
        );



        document.addEventListener(
            "keydown",
            (e)=>{


                if(
                    (e.ctrlKey || e.metaKey)
                    &&
                    e.key.toLowerCase()==="k"
                ){

                    e.preventDefault();

                    this.openCommand();

                }


                if(
                    e.key==="Escape"
                ){

                    this.closeCommand();

                }


            }
        );


    },






    createProject(){


        this.project.cabinets = 1;

        this.project.parts = 12;

        this.project.sheets = 2;


        this.updateStats();


        this.notify(
            "New cabinet project created"
        );


    },





    generate(){


        this.notify(
            "Generator ready for cabinet engine"
        );


    },





    newProject(){


        this.project = {

            name:
            "Untitled Project",

            cabinets:0,

            parts:0,

            sheets:0

        };


        this.updateStats();


        this.notify(
            "New project started"
        );


    },





    updateStats(){


        document
        .getElementById("cabinetCount")
        .textContent =
        this.project.cabinets;



        document
        .getElementById("partCount")
        .textContent =
        this.project.parts;



        document
        .getElementById("sheetCount")
        .textContent =
        this.project.sheets;



    },






    toggleTheme(){


        if(
            this.settings.theme==="dark"
        ){

            document.documentElement
            .style
            .setProperty(
                "--bg-main",
                "#f4f6fa"
            );


            document.documentElement
            .style
            .setProperty(
                "--bg-panel",
                "#ffffff"
            );


            document.documentElement
            .style
            .setProperty(
                "--text-primary",
                "#111827"
            );


            this.settings.theme="light";


            this.notify(
                "Light theme enabled"
            );


        }

        else {


            location.reload();


        }


    },






    openCommand(){


        const box =
        document.getElementById(
            "commandPalette"
        );


        box.classList
        .remove(
            "hidden"
        );


        document
        .getElementById(
            "commandInput"
        )
        .focus();


    },





    closeCommand(){


        document
        .getElementById(
            "commandPalette"
        )
        .classList
        .add(
            "hidden"
        );


    },






    executeCommand(command){


        command =
        command
        .toLowerCase();


        if(
            command.includes(
                "cabinet"
            )
        ){

            this.createProject();

        }


        else if(
            command.includes(
                "generate"
            )
        ){

            this.generate();

        }


        else {


            this.notify(
                "Command not recognised"
            );


        }


        this.closeCommand();


    },






    notify(message){


        const area =
        document.getElementById(
            "notifications"
        );


        const item =
        document.createElement(
            "div"
        );


        item.className =
        "notification";


        item.textContent =
        message;



        area.appendChild(
            item
        );



        setTimeout(
            ()=>{

                item.remove();

            },
            3000
        );


    },






    save(){


        localStorage.setItem(
            "cabinetStudio",
            JSON.stringify(
                this.project
            )
        );


        this.notify(
            "Project saved locally"
        );


    },






    load(){


        const data =
        localStorage.getItem(
            "cabinetStudio"
        );


        if(data){

            this.project =
            JSON.parse(
                data
            );

        }


    }



};





document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        App.init();

    }
);
