import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    LOGIN_CORREO_USUARIO: (correoUsuario)=> 
        dispatch({ "type":actionNames.LOGIN_CORREO_USUARIO,
        "state":{"correoUsuario":correoUsuario} 
    }),
});
export default mapDispatchToProps;