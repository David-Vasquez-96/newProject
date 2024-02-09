import ApiGenericServicesData from "service/ApiGenericServicesData";

export default class SolicitudesAfiliacion extends ApiGenericServicesData {
    constructor() {
        super("hojasAfiliacionYAdhesion");
    }

    guardarAfiliado(correlativo, data) {
        return this.customPOST("create/" + correlativo, data);
    }

    eliminarHojadePaquete(idDetalle, idHoja) {
        return this.customPOST("delete/" + idDetalle + "/" + idHoja);
    }

    actualizarAfiliado(data) {
        return this.customPOST("update/", data)
    }

    consultarHoja(correlativo) {
        return this.customGET("consultar/" + correlativo);
    }

    verificarCUI(data) {
        return this.customPOST("verificar", data)
    }



}
