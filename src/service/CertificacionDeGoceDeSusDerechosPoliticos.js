import ApiGenericServicesData from 'service/ApiGenericServicesData';

export default class CertificacionDeGoceDeSusDerechosPoliticos extends ApiGenericServicesData{
    constructor(){
        super("certificacionDeGoceDeSusDerechosPoliticos");
    }

    openFile(fileName) {         return this.customGET("openFile/"+fileName);    }    
}