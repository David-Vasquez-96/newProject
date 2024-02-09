import ApiGenericServicesData from "service/ApiGenericServicesData";

export default class ConstanciaAfiliacionAPartidosPoliticos extends ApiGenericServicesData {
  constructor() {
    super("constanciaAfiliacionAPartidosPoliticos");
  }

  openFile(fileName) {
    return this.customGET("openFile/" + fileName);
  }
}
