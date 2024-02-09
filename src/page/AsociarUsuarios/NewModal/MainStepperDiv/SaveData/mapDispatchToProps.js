import { actionNames } from "constant/index";
const mapDispatchToProps = (dispatch) => ({
  ASOCIAR_USUARIOS_SET_STEP: (step) =>
    dispatch({
      type: actionNames.ASOCIAR_USUARIOS_SET_STEP,
      state: { step: step },
    }),
});

export default mapDispatchToProps;
