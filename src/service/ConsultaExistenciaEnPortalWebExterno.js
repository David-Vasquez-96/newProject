import ApiGenericServicesData from "service/ApiGenericServicesData";

export default class ConsultaExistenciaEnPortalWebExterno extends ApiGenericServicesData {
  constructor() {
    super("consultarDatos");
  }

  consultarExistenciaEnPortalWebExterno(email_o_cui) {
    return this.customGET("consultarExistenciaEnPortalWebExterno/" + email_o_cui);
  }
}
