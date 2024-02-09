import ApiGenericServicesData from "service/ApiGenericServicesData";

export default class SolicitudHojasAdhesion extends ApiGenericServicesData {
    constructor() {
        super("solicitudHojasAdhesion");
    }

    createRequest(data) {
        return this.customPOST("create", data);
    }

    openFile(CVE, ruta) {
        return this.customGET("openFile/" + ruta + "/" + CVE);
    }

    listFilter() {
        return this.customGET("listFilter");
    }
}
