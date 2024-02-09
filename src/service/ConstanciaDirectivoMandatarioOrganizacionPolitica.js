import ApiGenericServicesData from "service/ApiGenericServicesData";

export default class ConstanciaDirectivoMandatarioOrganizacionPolitica extends ApiGenericServicesData {
  constructor() {
    super("constanciaDirectivoMandatarioOrganizacionPolitica");
  }

  openFile(fileName) {
    return this.customGET("openFile/" + fileName);
  }
}
