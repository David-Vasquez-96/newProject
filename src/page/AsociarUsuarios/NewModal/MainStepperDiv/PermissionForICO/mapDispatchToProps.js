import { actionNames } from "constant/index";
const mapDispatchToProps = (dispatch) => ({
  ASOCIAR_USUARIOS_SET_PERMISO_ICO: (permisoICO) =>
    dispatch({
      type: actionNames.ASOCIAR_USUARIOS_SET_PERMISO_ICO,
      state: { permisoICO: permisoICO },
    }),
  ASOCIAR_USUARIOS_SET_TIPO_PERMISO_ICO: (tipoPermisoICO) =>
    dispatch({
      type: actionNames.ASOCIAR_USUARIOS_SET_TIPO_PERMISO_ICO,
      state: { tipoPermisoICO: tipoPermisoICO },
    }),
  ASOCIAR_USUARIOS_SET_DEPARTAMENTO_ICO: (departamentoICO) =>
    dispatch({
      type: actionNames.ASOCIAR_USUARIOS_SET_DEPARTAMENTO_ICO,
      state: { departamentoICO: departamentoICO },
    }),
  ASOCIAR_USUARIOS_SET_MUNICIPIO_ICO: (municipioICO) =>
    dispatch({
      type: actionNames.ASOCIAR_USUARIOS_SET_MUNICIPIO_ICO,
      state: { municipioICO: municipioICO },
    }),
});

export default mapDispatchToProps;
