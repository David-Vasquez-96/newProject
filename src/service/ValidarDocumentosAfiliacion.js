import ApiGenericServicesData from 'service/ApiGenericServicesData';

export default class AfiliacionesDocumentos extends ApiGenericServicesData {
    constructor() {
        super("afiliacionesDocumentos");
    }

    hojasAdhesionAfiliacion(idOp, correlativo) { return this.customGETpublic("hojasAfiliaciones/" + idOp + "/" + correlativo); }

    constanciaAdhesionAfiliacion(cve) { return this.customGETpublic("constanciaAdhesionAfiliacion/" + cve); }
}