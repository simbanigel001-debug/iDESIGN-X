/* =====================================================
   Cabinet Studio
   Production Export System
   Milestone 8
===================================================== */


const ProductionExport = {

    // Helper: build metadata header lines
    _buildHeader(project) {
        if(!project) return '';
        const lines = [];
        lines.push(`Project: ${project.name || 'Untitled'}`);
        if (project.type) lines.push(`Type: ${project.type}`);
        if (project.customer) lines.push(`Customer: ${project.customer}`);
        if (project.address) lines.push(`Address: ${project.address}`);
        if (project.contact) lines.push(`Contact: ${project.contact}`);
        lines.push(`Date: ${project.savedAt || new Date().toISOString()}`);
        return lines.join('\n') + '\n\n';
    },

    exportMaxCut(){
        const parts = Project.generatedParts || [];
        if(!parts.length){ App.notify('No parts available'); return; }

        const project = DesignStorage.loadProject();
        let content = this._buildHeader(project);
        // MaxCut: tab-separated: Part Name\tLength\tWidth\tQty\tMaterial\tEdging
        parts.forEach(p => {
            const material = (p.materialId && window.PGBoardCatalog && window.PGBoardCatalog.get(p.materialId)) ? window.PGBoardCatalog.get(p.materialId).name : (p.material || 'Melamine');
            const edging = p.edging || '';
            content += `${p.name}\t${p.height || p.length || 0}\t${p.width || 0}\t${p.quantity || 1}\t${material}\t${edging}\n`;
        });

        this.download(content, 'cabinet-maxcut.txt', 'text/plain');
    },

    exportCSV(){
        const parts = Project.generatedParts || [];
        if(!parts.length){ App.notify('No parts available'); return; }

        const project = DesignStorage.loadProject();
        let csv = this._buildHeader(project);
        csv += 'PART,WIDTH,HEIGHT,QTY,MATERIAL,EDGING\n';
        parts.forEach(part => {
            const material = (part.materialId && window.PGBoardCatalog && window.PGBoardCatalog.get(part.materialId)) ? window.PGBoardCatalog.get(part.materialId).name : (part.material || 'Melamine 16mm');
            const edging = part.edging || '';
            csv += `${part.name},${part.width},${part.height},${part.quantity},${material},${"\""+edging+"\""}\n`;
        });

        this.download(csv, 'cabinet-cutting-list.csv', 'text/csv');
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









    download(content,name, mime){
        const type = mime || 'text/csv';
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        link.click();
        URL.revokeObjectURL(url);
    }






};





console.log(
    "Production Export Loaded"
);
