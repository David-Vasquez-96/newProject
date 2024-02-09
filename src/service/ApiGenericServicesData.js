import ApiGenericServices from 'service/ApiGenericServices';
import { request_data  } from 'service/Api';

export default class ApiGenericServicesData extends ApiGenericServices{
    constructor(moduleName){
        super(moduleName,request_data);
    }
}