import { actionNames } from "constant/index";
const mapDispatchToProps = (dispatch) => ({
  ASOCIAR_USUARIOS_SET_STEP: (step) =>
    dispatch({
      type: actionNames.ASOCIAR_USUARIOS_SET_STEP,
      state: { step: step },
    }),
  ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR: (data) =>
    dispatch({
      type: actionNames.ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR,
      state: { dataUsuarioPorAsociar: data },
    }),
});

export default mapDispatchToProps;
