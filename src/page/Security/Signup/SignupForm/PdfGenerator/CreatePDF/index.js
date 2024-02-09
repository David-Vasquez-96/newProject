
import jsPDF from 'jspdf';
import FirstSheet from './firstSheet/data'
import SecondSheet from './secondSheet/data';

const dataFirstSheet = new FirstSheet();
const dataSecondSheet = new SecondSheet();

class CreatePDF{
    constructor(){
        this.data=null;
        this.date="";
        this.dia="";
        this.mes="";
        this.año="";
        this.DateAndTime="";
        this.doc="";
        this.DateInLetters="";
        this.FechaNacimiento="";
        this.seleccionarMesFechaNacimiento="";
        this.nombreCompleto="";
    }
    setData(data){this.data=data;}

    asignarDatosDeFechasActuales(){
        this.date = new Date();
        this.dia = this.date.getDate();
        this.mes = this.date.getMonth();
        this.año = this.date.getFullYear();
        this.DateAndTime = new Date().toLocaleString()
        this.seleccionarMesFechaNacimiento = this.data.birthDate.getMonth()+1;
        this.FechaNacimiento = this.data.birthDate.getDate()+"/"+this.seleccionarMesFechaNacimiento+"/"+this.data.birthDate.getFullYear();
    }
    
    asignarNombreCompleto(){
        if(this.data.marriedLastName === ""){
            this.nombreCompleto = this.data.firstName+" "+ this.data.secondName+" "+ this.data.thirdName + " "+ this.data.firstLastName + " "+this.data.secondLastName
        }else{
            this.nombreCompleto = this.data.firstName+" "+ this.data.secondName+" "+ this.data.thirdName + " "+ this.data.firstLastName + " "+this.data.secondLastName + " DE " + this.data.marriedLastName
        }        
    }

    crearDocumentoDePdf(){
        this.doc = new jsPDF(); 
    }

    asignarLogoInstitucion(){
        // institution logo        
        this.doc.addImage(dataFirstSheet.imagePath, "JPG", 2, 5, 205, 40);
    }
    asignarTituloInstitucion(){
        // institution title
        this.doc.setFontSize(22);
        this.doc.setFont("times", "bold");
        this.doc.text(dataFirstSheet.titlePDF, 105, 65, {maxWidth: 180, align: "center"});                    
    }

    crearCuerpoPrimeraPagina(){
        // document body, first page
        this.DateInLetters ="Guatemala, " + this.dia + " de " + dataFirstSheet.meses[this.mes] + " de " + this.año+"."
        this.doc.setFont("times", "normal");
        this.doc.setFontSize(12);
        this.doc.text(this.DateInLetters, 15, 90, {maxWidth: 180, align: "justify"});
        this.doc.text(dataFirstSheet.paragraphOne, 15, 100, {maxWidth: 180, align: "justify"});

        this.doc.text("Nombres: ",15, 125, {maxWidth: 180, align: "justify"});
            this.doc.text(this.data.firstName+" "+ this.data.secondName+" "+ this.data.thirdName,60, 125, {maxWidth: 180, align: "justify"});
        this.doc.text("Apellidos: ", 15, 130, {maxWidth: 180, align: "justify"});
        if(this.data.marriedLastName === ""){
            this.doc.text(this.data.firstLastName + " "+this.data.secondLastName, 60, 130, {maxWidth: 180, align: "justify"});
        }else{
            this.doc.text(this.data.firstLastName + " "+this.data.secondLastName + " DE " + this.data.marriedLastName, 60, 130, {maxWidth: 180, align: "justify"});
        }
        this.doc.text("CUI del DPI: ", 15, 135, {maxWidth: 180, align: "justify"});
            this.doc.text(this.data.cui, 60, 135, {maxWidth: 180, align: "justify"});
        this.doc.text("Fecha de Nacimiento: ", 15, 140, {maxWidth: 180, align: "justify"});
            this.doc.text(this.FechaNacimiento, 60, 140, {maxWidth: 180, align: "justify"});
        this.doc.text("Correo electrónico: ", 15, 145, {maxWidth: 180, align: "justify"});
            this.doc.text(this.data.email, 60, 145, {maxWidth: 180, align: "justify"});
        
        this.doc.text(dataFirstSheet.paragraphTwo, 15, 165, {maxWidth: 180, align: "justify"});
        
        this.doc.text(dataFirstSheet.paragraphThree, 15, 180, {maxWidth: 180, align: "justify"});        
    }

    firmaUsuario(){
        // firma del usuario
        this.doc.text("__________________________________________________", 105, 215, {maxWidth: 180, align: "center"});
        this.doc.text(this.nombreCompleto, 105, 220, {maxWidth: 180, align: "center"});
        this.doc.text("CUI del DPI: "+this.data.cui, 105, 225, {maxWidth: 180, align: "center"});        
    }

    FechaHoraCreacionSolicitud(){
        this.doc.setFontSize(10);
        this.doc.setFont("times", "bold");
        this.doc.text(this.DateAndTime, 183, 260, {maxWidth: 180, align: "right"});        
    }

    PieDePagina(){
        // document footer
        this.doc.setFontSize(9);
        this.doc.setFont("times", "normal");
        this.doc.text(dataFirstSheet.addressTSE, 98, 270, {maxWidth: 180, align: "center"});
        this.doc.text(dataFirstSheet.websiteAndEmailTSE, 105, 275, {maxWidth: 180, align: "center"});                
    }
    // segunda pagina
    crearEncabezadoSegundaPagina(){
        this.doc.addPage();
        this.asignarLogoInstitucion();
        this.doc.setFontSize(11.5);
        this.doc.text(dataSecondSheet.titleTermsAndConditions, 15, 50, {maxWidth: 180, align: "justify"});      
    }

    crearCuerpoSegundaPagina(){
        // terminos y condiciones
        this.doc.setFontSize(13);
        this.doc.setFont("times", "bold");
        this.doc.text(dataSecondSheet.titleTermsAndConditions1, 15, 60, {maxWidth: 180, align: "justify"});            
        this.doc.setFontSize(11.5);
        this.doc.setFont("times", "normal");
        this.doc.text(dataSecondSheet.termsAndConditions1, 15, 65, {maxWidth: 180, align: "justify"});      
        this.doc.text(dataSecondSheet.termsAndConditions2, 15, 85, {maxWidth: 180, align: "justify"});              
        
        //Password Responsability 
        this.doc.setFontSize(13);
        this.doc.setFont("times", "bold");
        this.doc.text(dataSecondSheet.titlePasswordResponsability1, 15, 115, {maxWidth: 180, align: "justify"});                                               
        this.doc.setFontSize(11.5);
        this.doc.setFont("times", "normal");
        this.doc.text(dataSecondSheet.PasswordResponsability1, 15, 120, {maxWidth: 180, align: "justify"});      
        this.doc.text(dataSecondSheet.PasswordResponsability2, 15, 145, {maxWidth: 180, align: "justify"});              

        //PRIVACY AND DATA PROTECTION.
        this.doc.setFontSize(13);
        this.doc.setFont("times", "bold");
        this.doc.text(dataSecondSheet.titlePrivacyAndDataProtection1, 15, 160, {maxWidth: 180, align: "justify"});                                               
        this.doc.setFontSize(11.5);
        this.doc.setFont("times", "normal");
        this.doc.text(dataSecondSheet.PrivacyAndDataProtection1, 15, 165, {maxWidth: 180, align: "justify"});      
        this.doc.text(dataSecondSheet.PrivacyAndDataProtection2, 15, 188, {maxWidth: 180, align: "justify"});      
        this.doc.text(dataSecondSheet.PrivacyAndDataProtection3, 15, 200, {maxWidth: 180, align: "justify"});              

        // ACCESS RESPONSIBILITY.            
        this.doc.setFontSize(13);
        this.doc.setFont("times", "bold");
        this.doc.text(dataSecondSheet.titleAcessResponsability, 15, 215, {maxWidth: 180, align: "justify"});                                               
        this.doc.setFontSize(11.5);
        this.doc.setFont("times", "normal");
        this.doc.text(dataSecondSheet.AcessResponsability, 15, 220, {maxWidth: 180, align: "justify"});     
        
        // CHANGES IN THE TERMS AND CONDITIONS.
        this.doc.setFontSize(13);
        this.doc.setFont("times", "bold");
        this.doc.text(dataSecondSheet.titleChangesInTheTermsAndConditions, 15, 250, {maxWidth: 180, align: "justify"});                                               
        this.doc.setFontSize(11.5);
        this.doc.setFont("times", "normal");
        this.doc.text(dataSecondSheet.ChangesInTheTermsAndConditions, 15, 255, {maxWidth: 180, align: "justify"});           
    }

    guardarDocumentoPDF(){
        this.doc.save("Solicitud de creación de usuario.pdf");    // save the pdf document
    }

    generarPDF(){
        this.asignarDatosDeFechasActuales();
        this.asignarNombreCompleto();
        this.crearDocumentoDePdf();
        // add some text to pdf document, first page ------------------------------------------------------------------------------------
        this.asignarLogoInstitucion();
        this.asignarTituloInstitucion();
        this.crearCuerpoPrimeraPagina();
        this.firmaUsuario();
        this.FechaHoraCreacionSolicitud();
        this.PieDePagina();
        // add some text to pdf document, second page  ------------------------------------------------------------------------------------
        this.crearEncabezadoSegundaPagina();
        this.crearCuerpoSegundaPagina();
        this.PieDePagina();
        this.guardarDocumentoPDF();
    }
}

export default CreatePDF;