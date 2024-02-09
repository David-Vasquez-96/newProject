import ApiGenericServicesData from 'service/ApiGenericServicesData';

export default class ConstanciaDeInscripcionComoDirectivo extends ApiGenericServicesData{
    constructor(){
        super("constanciaDeInscripcionComoDirectivo");
    }

    openFile(fileName) {         return this.customGET("openFile/"+fileName);    }    
}