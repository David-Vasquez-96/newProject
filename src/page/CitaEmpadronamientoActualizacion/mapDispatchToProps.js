import { actionNames } from "constant/index";
const mapDispatchToProps = (dispatch) => ({
  CONSTANCIACANDIDATOELECCIONPOPULAR_SET_DATA: (data) =>
    dispatch({
      type: actionNames.CONSTANCIACANDIDATOELECCIONPOPULAR_SET_DATA,
      state: { data: data },
    }),
  CITA_EMPADRONAMIENTO_SET_STEP: (step) =>
    dispatch({
      type: actionNames.CITA_EMPADRONAMIENTO_SET_STEP,
      state: { step: step },
    }),
  CITA_EMPADRONAMIENTO_SET_CITA_EN_PROCESO: (citaEnProceso) =>
    dispatch({
      type: actionNames.CITA_EMPADRONAMIENTO_SET_CITA_EN_PROCESO,
      state: { citaEnProceso: citaEnProceso },
    }),
});
export default mapDispatchToProps;
