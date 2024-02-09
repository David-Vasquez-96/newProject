
import ApiGenericServicesData from 'service/ApiGenericServicesData';

export default class ValidarDocumentsGeo extends ApiGenericServicesData{
    constructor(){
        super("empadronamiento");
    }
    constancia(cve){ return this.customGETpublic("constancia/"+cve);}
    solicitud(cve){ return this.customGETpublic("solicitud/"+cve);}
}