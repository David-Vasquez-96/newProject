import ApiGenericServicesData from "service/ApiGenericServicesData";

export default class ConstanciaCandidatoEleccionPopular extends ApiGenericServicesData {
  constructor() {
    super("constanciaCandidatoEleccionPopular");
  }

  openFile(fileName) {
    return this.customGET("openFile/" + fileName);
  }
}
