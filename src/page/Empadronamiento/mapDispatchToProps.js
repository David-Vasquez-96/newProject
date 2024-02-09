import { actionNames } from "constant/index";
const mapDispatchToProps = (dispatch) => ({
  CONSTANCIACANDIDATOELECCIONPOPULAR_SET_DATA: (data) =>
    dispatch({
      type: actionNames.CONSTANCIACANDIDATOELECCIONPOPULAR_SET_DATA,
      state: { data: data },
    }),
  ASOCIAR_USUARIOS_SET_STEP: (step) =>
    dispatch({
      type: actionNames.ASOCIAR_USUARIOS_SET_STEP,
      state: { step: step },
    }),
  SOLICITUD_EMPADRONAMIENTO_SET_STEP: (step) =>
    dispatch({
      type: actionNames.SOLICITUD_EMPADRONAMIENTO_SET_STEP,
      state: { step: step },
    }),
  SOLICITUD_EMPADRONAMIENTO_SET_DATOS_CIUDADANO_TABLE: (datosCiudadanoTable) =>
    dispatch({
      type: actionNames.SOLICITUD_EMPADRONAMIENTO_SET_DATOS_CIUDADANO_TABLE,
      state: { datosCiudadanoTable: datosCiudadanoTable },
    }),
  SOLICITUD_EMPADRONAMIENTO_SET_SOLICITUDES: (solicitudesEmpadronamiento) =>
    dispatch({
      type: actionNames.SOLICITUD_EMPADRONAMIENTO_SET_SOLICITUDES,
      state: { solicitudesEmpadronamiento: solicitudesEmpadronamiento },
    }),
  SOLICITUD_EMPADRONAMIENTO_SET_DONT_ALLOW_CHANGE: (dontAllowChange) =>
    dispatch({
      type: actionNames.SOLICITUD_EMPADRONAMIENTO_SET_DONT_ALLOW_CHANGE,
      state: { dontAllowChange: dontAllowChange },
    }),
});
export default mapDispatchToProps;
