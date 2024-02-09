import {actionNames} from 'constant/index';
const actions ={};

actions.SIGNUP_SET_DATA =(state)=>{
    return { type:actionNames.SIGNUP_SET_DATA, state};
}
actions.SOLICITUD_EMPADRONAMIENTO_SET_POSICIONES_DEPARTAMENTO_MUNICIPIO =(state)=>{
    return { type:actionNames.SOLICITUD_EMPADRONAMIENTO_SET_POSICIONES_DEPARTAMENTO_MUNICIPIO, state};
}
actions.SIGNUP_SET_FILES =(state)=>{
    return { type:actionNames.SIGNUP_SET_FILES, state};
}
actions.SIGNUP_SET_STEP =(state)=>{
    return { type:actionNames.SIGNUP_SET_STEP, state};
}
actions.SIGNUP_SET_FILE_BY_INDEX=(state)=>{
    return { type:actionNames.SIGNUP_SET_FILE_BY_INDEX, state};
}
actions.SIGNUP_SET_TOKEN_RECAPCHA=(state)=>{
    return { type:actionNames.SIGNUP_SET_TOKEN_RECAPCHA, state};
}
actions.SIGNUP_SET_RECAPTCHA_STATUS=(state)=>{
    return { type:actionNames.SIGNUP_SET_RECAPTCHA_STATUS, state};
}

actions.SIGNUP_SET_ARCHIVO_DPI_FRONTAL_GRANDE=(state)=>{
    return { type:actionNames.SIGNUP_SET_ARCHIVO_DPI_FRONTAL_GRANDE, state};
}

actions.SIGNUP_SET_ARCHIVO_DPI_TRASERA_GRANDE=(state)=>{
    return { type:actionNames.SIGNUP_SET_ARCHIVO_DPI_TRASERA_GRANDE, state};
}

actions.SIGNUP_SET_TIPO_ARCHIVO_DPI_FRONTAL_DIFERENTE=(state)=>{
    return { type:actionNames.SIGNUP_SET_TIPO_ARCHIVO_DPI_FRONTAL_DIFERENTE, state};
}

actions.SIGNUP_SET_TIPO_ARCHIVO_DPI_TRASERA_DIFERENTE=(state)=>{
    return { type:actionNames.SIGNUP_SET_TIPO_ARCHIVO_DPI_TRASERA_DIFERENTE, state};
}

actions.SIGNUP_SET_NOMBRE_TITULO_ARCHIVO=(state)=>{
    return { type:actionNames.SIGNUP_SET_NOMBRE_TITULO_ARCHIVO, state};
}
actions.LOGIN_CORREO_USUARIO=(state)=>{
    return { type:actionNames.LOGIN_CORREO_USUARIO, state};
}
actions.MENSAJE_CODIGO=(state)=>{
    return { type:actionNames.MENSAJE_CODIGO, state};
}
actions.CATALOGO_CREACION_USUARIOS=(state)=>{
    return { type:actionNames.CATALOGO_CREACION_USUARIOS, state};
}
export default actions;