import ApiGenericServices from 'service/ApiGenericServices';
import { request_security  } from 'service/Api';

export default class ApiGenericServicesSecurity extends ApiGenericServices{
    constructor(moduleName){
        super(moduleName,request_security);
    }
}