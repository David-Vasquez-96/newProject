import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    SIGNUP_SET_STEP: (step)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_STEP,"state":{"step":step}}),
    SIGNUP_SET_FILE_BY_INDEX: (index,base64)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_FILE_BY_INDEX,
        "state":{"index":index, "base64": base64}}),
    SIGNUP_SET_ARCHIVO_DPI_FRONTAL_GRANDE: (ArchivoDPIFrontalGrande)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_ARCHIVO_DPI_FRONTAL_GRANDE,"state":{"ArchivoDPIFrontalGrande":ArchivoDPIFrontalGrande}}),        
    SIGNUP_SET_ARCHIVO_DPI_TRASERA_GRANDE: (ArchivoDPITraseraGrande)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_ARCHIVO_DPI_TRASERA_GRANDE,"state":{"ArchivoDPITraseraGrande":ArchivoDPITraseraGrande}}),        
    SIGNUP_SET_TIPO_ARCHIVO_DPI_FRONTAL_DIFERENTE: (TipoArchivoDPIFrontalDiferente)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_TIPO_ARCHIVO_DPI_FRONTAL_DIFERENTE,"state":{"TipoArchivoDPIFrontalDiferente":TipoArchivoDPIFrontalDiferente}}),        
    SIGNUP_SET_TIPO_ARCHIVO_DPI_TRASERA_DIFERENTE: (TipoArchivoDPITraseroDiferente)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_TIPO_ARCHIVO_DPI_TRASERA_DIFERENTE,"state":{"TipoArchivoDPITraseroDiferente":TipoArchivoDPITraseroDiferente}}),        
    SIGNUP_SET_NOMBRE_TITULO_ARCHIVO: (nombreTituloArchivo)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_NOMBRE_TITULO_ARCHIVO,"state":{"nombreTituloArchivo":nombreTituloArchivo}}),  
    });
    
export default mapDispatchToProps;