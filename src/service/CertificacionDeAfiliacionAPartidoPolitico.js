
import ApiGenericServicesData from 'service/ApiGenericServicesData';

export default class CertificacionDeAfiliacionAPartidoPolitico extends ApiGenericServicesData{
    constructor(){
        super("certificacionDeAfiliacionAPartidoPolitico");
    }

    openFile(fileName) {         return this.customGET("openFile/"+fileName);    }    
}