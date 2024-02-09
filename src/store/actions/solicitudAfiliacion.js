import { actionNames } from 'constant/index';
const actions = {};

actions.SOLICITUD_AFILIACION_SET_AFILIADO = (state) => {
    return { type: actionNames.SOLICITUD_AFILIACION_SET_AFILIADO, state };
}
actions.SOLICITUD_AFILIACION_DELETE_AFILIADO = (state) => {
    return { type: actionNames.SOLICITUD_AFILIACION_DELETE_AFILIADO, state };
}

actions.SOLICITUD_AFILIACION_CLEAR_ALL = () => {
    return { type: actionNames.SOLICITUD_AFILIACION_CLEAR_ALL }
}

actions.SOLICITUD_AFILIACION_SAVE_AFILIADO = (state) => {
    return { type: actionNames.SOLICITUD_AFILIACION_SAVE_AFILIADO, state };
}

export default actions;


