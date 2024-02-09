
import ApiGenericServicesData from 'service/ApiGenericServicesData';

export default class InformacionGeneralMiOrganizacionPolitica extends ApiGenericServicesData {
    constructor() {
        super("informacionGeneralMiOrganizacionPolitica");
    }
    list() { return this.customGET2("list"); }
    consultar() { return this.customGET("consultar/") }
    ListarAfiliado(data) { return this.customGET2("ListarAfiliado/" + data.codigoDepto + '/' + data.codigoMun); }
    Los40(data) { return this.customGET2("Los40/" + data.codigoDepto + '/' + data.codigoMun); }
}