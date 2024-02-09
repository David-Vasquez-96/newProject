import ApiGenericServicesData from "service/ApiGenericServicesData";

export default class SolicitudHojasAfiliacion extends ApiGenericServicesData {
    constructor() {
        super("solicitudHojasAfiliacion");
    }

    createRequest(data) {
        return this.customPOST("create", data);
    }

    openFile(CVE, ruta) {
        return this.customGET("openFile/" + ruta + "/" + CVE);
    }

    listFilter() {
        return this.customGET("listFilter/");
    }
}
