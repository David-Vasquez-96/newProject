import { actionNames } from "constant/index";
const mapDispatchToProps = dispatch => ({      
    ASOCIAR_USUARIOS_SET_PERMISO_AFILIACION: (permisoAfiliacion) =>
    dispatch({
      type: actionNames.ASOCIAR_USUARIOS_SET_PERMISO_AFILIACION,
      state: { permisoAfiliacion: permisoAfiliacion },
    }),
    });
    
export default mapDispatchToProps;