import ApiGenericServicesData from "service/ApiGenericServicesData";

export default class PaquetesDeAfiliacionYAdhesion extends ApiGenericServicesData {
    constructor() {
        super("paquetesDeAfiliacionYAdhesion");
    }

    eliminarPaquete(idPaquete) {
        return this.customPOST("delete/" + idPaquete);
    }


    crearPaquete(data) {
        return this.customPOST("create/", data);
    }

    editName(data) {
        return this.customPOST("updateName/", data)
    }

    enviarPaquete(idPaquete) {
        return this.customPOST("send/" + idPaquete);
    }

    agregarPaqueteExistente(id, data) {
        return this.customPOST("update/" + id, data);
    }

    generarReporte(idPaquete, estado) { return this.customGET("reporte/" + idPaquete + '/' + estado); }

    openConstanciaEnvio(idPaquete) { return this.customGET("openFile/" + idPaquete); }

    openFile(CVE, ruta) { return this.customGET("openfile/" + ruta + '/' + CVE); }


}