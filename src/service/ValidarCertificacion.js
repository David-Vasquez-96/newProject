
import ApiGenericServicesData from 'service/ApiGenericServicesData';

export default class ValidarCertificacion extends ApiGenericServicesData{
    constructor(){
        super("certificacion");
    }
    validar(cve){ return this.customGETpublic("validar/"+cve);}
    autorizacion(cve){ return this.customGETpublic("autorizacion/"+cve);}
}