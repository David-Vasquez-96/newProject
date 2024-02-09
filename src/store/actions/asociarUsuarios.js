import { actionNames } from "constants/index";
const actions = {};

actions.ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR = (state) => {
  return {
    type: actionNames.ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR,
    state,
  };
};
actions.ASOCIAR_USUARIOS_SET_STEP = (state) => {
  return { type: actionNames.ASOCIAR_USUARIOS_SET_STEP, state };
};
actions.ASOCIAR_USUARIOS_SET_PERMISO_ICO = (state) => {
  return { type: actionNames.ASOCIAR_USUARIOS_SET_PERMISO_ICO, state };
};

actions.ASOCIAR_USUARIOS_SET_TIPO_PERMISO_ICO = (state) => {
  return { type: actionNames.ASOCIAR_USUARIOS_SET_TIPO_PERMISO_ICO, state };
};
actions.ASOCIAR_USUARIOS_SET_DEPARTAMENTO_ICO = (state) => {
  return { type: actionNames.ASOCIAR_USUARIOS_SET_DEPARTAMENTO_ICO, state };
};
actions.ASOCIAR_USUARIOS_SET_MUNICIPIO_ICO = (state) => {
  return { type: actionNames.ASOCIAR_USUARIOS_SET_MUNICIPIO_ICO, state };
};

actions.ASOCIAR_USUARIOS_SET_PERMISO_AFILIACION = (state) => {
  return { type: actionNames.ASOCIAR_USUARIOS_SET_PERMISO_AFILIACION, state };
};


export default actions;
