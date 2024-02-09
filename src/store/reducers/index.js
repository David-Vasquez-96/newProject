import security from "./security";
import menu from "./menu";
import certificacionDeAfiliacionAPartidoPolitico from "./certificacionDeAfiliacionAPartidoPolitico";
import certificacionDeGoceDeSusDerechosPoliticos from "./certificacionDeGoceDeSusDerechosPoliticos";
import constanciaDeInscripcionComoDirectivo from "./constanciaDeInscripcionComoDirectivo";
import constanciaCandidatoEleccionPopular from "./constanciaCandidatoEleccionPopular";
import constanciaDirectivoMandatarioOrganizacionPolitica from "./ConstanciaDirectivoMandatarioOrganizacionPolitica";
import constanciaAfiliacionAPartidosPoliticos from "./constanciaAfiliacionAPartidosPoliticos";
import asociarUsuarios from "./asociarUsuarios";
import solicitudEmpadronamiento from './solicitudEmpadronamiento';
import citaDeEmpadronamiento from "./citaDeEmpadronamiento";
import solicitudAfiliacion from './solicitudAfiliacion';
import solicitudHojasDeAdhesion from './solicitudHojasDeAdhesion';


import signUp from "./signUp";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  security: security,
  menu: menu,
  certificacionDeAfiliacionAPartidoPolitico: certificacionDeAfiliacionAPartidoPolitico,
  certificacionDeGoceDeSusDerechosPoliticos: certificacionDeGoceDeSusDerechosPoliticos,
  constanciaDeInscripcionComoDirectivo: constanciaDeInscripcionComoDirectivo,
  constanciaCandidatoEleccionPopular: constanciaCandidatoEleccionPopular,
  constanciaDirectivoMandatarioOrganizacionPolitica: constanciaDirectivoMandatarioOrganizacionPolitica,
  constanciaAfiliacionAPartidosPoliticos: constanciaAfiliacionAPartidosPoliticos,
  asociarUsuarios: asociarUsuarios,
  solicitudEmpadronamiento: solicitudEmpadronamiento,
  citaDeEmpadronamiento: citaDeEmpadronamiento,
  solicitudAfiliacion: solicitudAfiliacion,
  solicitudHojasDeAdhesion: solicitudHojasDeAdhesion,
  signUp: signUp,
});

export default allReducers;
