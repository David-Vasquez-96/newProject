
import ApiGenericServicesData from 'service/ApiGenericServicesData';

export default class User extends ApiGenericServicesData{
    constructor(){
        super("solicitudUsuario");
    }
    create(){        return this.customPOST("create");    }
}