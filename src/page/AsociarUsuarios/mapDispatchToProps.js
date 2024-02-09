import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    CONSTANCIACANDIDATOELECCIONPOPULAR_SET_DATA: (data)=> 
        dispatch({ "type":actionNames.CONSTANCIACANDIDATOELECCIONPOPULAR_SET_DATA,
        "state":{"data":data} 
    }),
    ASOCIAR_USUARIOS_SET_STEP: (step)=> 
        dispatch({ "type":actionNames.ASOCIAR_USUARIOS_SET_STEP,
        "state":{"step":step} 
    }),
    ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR: (data) =>
    dispatch({
      type: actionNames.ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR,
      state: { dataUsuarioPorAsociar: data },
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
      type: actionNames.ASOCIAR_USUARIOS_SET_TIPO_PERMISO_ICO,
      state: { municipioICO: municipioICO },
    }),
    ASOCIAR_USUARIOS_SET_PERMISO_AFILIACION: (municipioICO) =>
    dispatch({
      type: actionNames.ASOCIAR_USUARIOS_SET_TIPO_PERMISO_ICO,
      state: { municipioICO: municipioICO },
    }),
    
});
export default mapDispatchToProps;