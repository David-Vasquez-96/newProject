
import ApiGenericServicesData from 'service/ApiGenericServicesData';

export default class User extends ApiGenericServicesData{
    constructor(){
        super("user");
    }
 
    updateGradeDegree(id) {
        return this.customPATCH("updateGradeDegree/"+id);
    }

    updateContent(id) {
        return this.customPATCH("updateContent/"+id);
    }

    updateCourse(id) {
        return this.customPATCH("updateCourse/"+id);
    }

    findByUserId(){
        return this.customGET("findByUserId");
    }

     
}