
import ApiGenericServicesData from 'service/ApiGenericServicesData';

export default class Company extends ApiGenericServicesData{
    constructor(){
        super("company");
    }
    
    listRegister() {
        return this.request({
            url: "/"+this.moduleName+"/list",
            method: 'GET'
        });
    }


}