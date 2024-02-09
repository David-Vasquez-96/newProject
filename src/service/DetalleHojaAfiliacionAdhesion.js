import ApiGenericServicesData from "service/ApiGenericServicesData";

export default class DetalleHojaAfiliacionAdhesion extends ApiGenericServicesData {
    constructor() {
        super("detalleHojaAfiliacionAdhesion");
    }

    eliminarAfiliado(id) {
        return this.customGET("delete/" + id);
    }
}