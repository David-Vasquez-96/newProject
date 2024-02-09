//import { request_data,request_security } from 'service/Api';
import { ACCESS_TOKEN } from 'constant/index';
import SearchCriteriaClass from 'service/SearchCriteriaClass';
import OrderCriteriaClass from 'service/OrderCriteriaClass';

export default class ApiGenericServices {
    constructor(moduleName, request) {
        this.moduleName = moduleName;
        this.searchCriteria = new SearchCriteriaClass();
        this.initSearchCriteria = new SearchCriteriaClass();
        this.orderCriteria = new OrderCriteriaClass();
        this.initOrderCriteria = new OrderCriteriaClass();
        this.request = request;
        this.isPublic = false;
    }
    setIsPublic(isPublic) { this.isPublic = isPublic; };

    pageRegister(page, size) {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Acceso denegado");
        }

        let searchCriteriaParam = (this.searchCriteria !== undefined) ? "searchCriteria=" + encodeURIComponent(JSON.stringify(this.searchCriteria.get())) : null;
        let orderCriteriaParam = (this.orderCriteria !== undefined) ? "orderCriteria=" + encodeURIComponent(JSON.stringify(this.orderCriteria.get())) : null;
        let url = "/" + this.moduleName + "/list/" + page + "/" + size + "?" + searchCriteriaParam + "&" + orderCriteriaParam;

        return this.request({
            url: url,
            method: 'GET'
        });
    }

    listRegisterCriteria() {
        // console.log("localStorage.getItem(ACCESS_TOKEN):", localStorage.getItem(ACCESS_TOKEN));
        // console.log("this.isPublic:", this.isPublic);
        if (!localStorage.getItem(ACCESS_TOKEN) && !this.isPublic) {
            return Promise.reject("Acceso denegado");
        }

        let searchCriteriaParam = (this.searchCriteria !== undefined) ? "searchCriteria=" + encodeURIComponent(JSON.stringify(this.searchCriteria.get())) : null,
            orderCriteriaParam = (this.orderCriteria !== undefined) ? "orderCriteria=" + encodeURIComponent(JSON.stringify(this.orderCriteria.get())) : null;
        let url = "/" + this.moduleName + "/list?" + searchCriteriaParam + "&" + orderCriteriaParam;

        return this.request({
            url: url,
            method: 'GET'
        });
    }

    listRegister() {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Acceso denegado");
        }

        return this.request({
            url: "/" + this.moduleName + "/list",
            method: 'GET'
        });
    }


    listRegisterPublic() {
        let searchCriteriaParam =    (this.searchCriteria!== undefined)   ? "searchCriteria="+encodeURIComponent(JSON.stringify(this.searchCriteria.get())) : null,
            orderCriteriaParam =     (this.orderCriteria!== undefined)    ? "orderCriteria="+encodeURIComponent(JSON.stringify(this.orderCriteria.get())) : null;
        let url = "/"+this.moduleName+"/list?"+searchCriteriaParam+"&"+orderCriteriaParam;        
        return this.request({
            url: url,
            method: 'GET'
        });
    }

    createRegister(data) {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Acceso denegado");
        }
        return this.request({
            url: "/" + this.moduleName + "/create",
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    createRegisterPublic(data) {
        return this.request({
            url: "/" + this.moduleName + "/create",
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    updateRegister(data) {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Acceso denegado");
        }
        return this.request({
            url: "/" + this.moduleName + "/update",
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    deleteRegister(params) {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Acceso denegado");
        }

        return this.request({
            url: "/" + this.moduleName + "/delete/" + params.id,
            method: 'DELETE'
        });
    }

    enableRegister(params) {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Acceso denegado");
        }

        return this.request({
            url: "/" + this.moduleName + "/enable/" + params.id,
            method: 'PATCH'
        });
    }

    disableRegister(params) {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Acceso denegado");
        }

        return this.request({
            url: "/" + this.moduleName + "/disable/" + params.id,
            method: 'PATCH'
        });
    }

    customGET(methodName) {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Acceso denegado");
        }
        let searchCriteriaParam = (this.searchCriteria !== undefined) ? "searchCriteria=" + encodeURIComponent(JSON.stringify(this.searchCriteria.get())) : null;
        let orderCriteriaParam = (this.orderCriteria !== undefined) ? "orderCriteria=" + encodeURIComponent(JSON.stringify(this.orderCriteria.get())) : null;
        let url = "/" + this.moduleName + "/" + methodName + "?" + searchCriteriaParam + "&" + orderCriteriaParam;

        return this.request({
            url: url,
            method: 'GET'
        });
    }

    customGET3(methodName, filtroSolicitud) {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Acceso denegado");
        }

        let url = "/" + this.moduleName + "/" + methodName + "?filtroSolicitud=" + filtroSolicitud;

        return this.request({
            url: url,
            method: 'GET'
        });
    }

    createRegisterReport(methodName, data) {
        if (!localStorage.getItem(ACCESS_TOKEN) && !this.isPublic) {
            return Promise.reject("Acceso denegado");
        }
        return this.request({
            url: "/" + this.moduleName + "/" + methodName,
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    customGETpublic(methodName) {
        let searchCriteriaParam = (this.searchCriteria !== undefined) ? "searchCriteria=" + encodeURIComponent(JSON.stringify(this.searchCriteria.get())) : null;
        let orderCriteriaParam = (this.orderCriteria !== undefined) ? "orderCriteria=" + encodeURIComponent(JSON.stringify(this.orderCriteria.get())) : null;
        let url = "/" + this.moduleName + "/" + methodName + "?" + searchCriteriaParam + "&" + orderCriteriaParam;

        return this.request({
            url: url,
            method: 'GET'
        });
    }


    customGET2(methodName) {
        if (!localStorage.getItem(ACCESS_TOKEN) && !this.isPublic) {
            return Promise.reject("Acceso denegado");
        }

        return this.request({
            url: "/" + this.moduleName + "/" + methodName,
            method: 'GET'
        });
    }

    customPUT(methodName) {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Acceso denegado");
        }

        return this.request({
            url: "/" + this.moduleName + "/" + methodName,
            method: 'PUT'
        });
    }

    customPOST(methodName, data) {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Acceso denegado");
        }

        return this.request({
            url: "/" + this.moduleName + "/" + methodName,
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    customPOSTpublic(methodName, data) {
        return this.request({
            url: "/" + this.moduleName + "/" + methodName,
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    customPATCH(methodName, data) {
        if (!localStorage.getItem(ACCESS_TOKEN) && !this.isPublic) {
            return Promise.reject("Acceso denegado");
        }

        return this.request({
            url: "/" + this.moduleName + "/" + methodName,
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }
}



