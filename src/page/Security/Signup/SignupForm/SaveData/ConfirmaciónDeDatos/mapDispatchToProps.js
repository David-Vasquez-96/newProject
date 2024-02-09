import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    SIGNUP_SET_STEP: (step)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_STEP,"state":{"step":step}}),
    SIGNUP_SET_DATA: (data)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_DATA,"state":{"data":data}}),
    SOLICITUD_EMPADRONAMIENTO_SET_POSICIONES_DEPARTAMENTO_MUNICIPIO: (posicionesDepartamentoMunicipio)=> 
        dispatch({ "type":actionNames.SOLICITUD_EMPADRONAMIENTO_SET_POSICIONES_DEPARTAMENTO_MUNICIPIO,"state":{"posicionesDepartamentoMunicipio":posicionesDepartamentoMunicipio}}),
    CATALOGO_CREACION_USUARIOS: (ListadoDeCatalogos)=> 
        dispatch({ "type":actionNames.CATALOGO_CREACION_USUARIOS,"state":{"ListadoDeCatalogos":ListadoDeCatalogos}}),
    });
export default mapDispatchToProps;