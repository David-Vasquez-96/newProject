import security from "./security";
import menu from "./menu";
import signUp from "./signUp";
import certificacionDeAfiliacionAPartidoPolitico from "./certificacionDeAfiliacionAPartidoPolitico";
import certificacionDeGoceDeSusDerechosPoliticos from "./certificacionDeGoceDeSusDerechosPoliticos";
import constanciaDeInscripcionComoDirectivo from "./constanciaDeInscripcionComoDirectivo";
import constanciaCandidatoEleccionPopular from "./constanciaCandidatoEleccionPopular";
import constanciaDirectivoMandatarioOrganizacionPolitica from "./constanciaDirectivoMandatarioOrganizacionPolitica";
import ConstanciaAfiliacionAPartidosPoliticos from "./constanciaAfiliacionAPartidosPoliticos";
import asociarUsuarios from "./asociarUsuarios";
import solicitudAfiliacion from "./solicitudAfiliacion";


const allActions = {
  security,
  menu,
  certificacionDeAfiliacionAPartidoPolitico: certificacionDeAfiliacionAPartidoPolitico,
  certificacionDeGoceDeSusDerechosPoliticos: certificacionDeGoceDeSusDerechosPoliticos,
  constanciaCandidatoEleccionPopular: constanciaCandidatoEleccionPopular,
  constanciaDirectivoMandatarioOrganizacionPolitica: constanciaDirectivoMandatarioOrganizacionPolitica,
  ConstanciaAfiliacionAPartidosPoliticos: ConstanciaAfiliacionAPartidosPoliticos,
  constanciaDeInscripcionComoDirectivo,
  signUp: signUp,
  asociarUsuarios: asociarUsuarios,
  solicitudAfiliacion: solicitudAfiliacion,
};

export default allActions;
