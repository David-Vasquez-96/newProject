
const initialState={
    files: [
        {
            id: 1,
            title: 'Fotografía frontal del DPI',
            imagePath: "/assets/DPIFrontal.png",
            text: "Adjunte fotografía frontal de DPI, en formato jpg, jpeg, png",
            type:".jpg, .jpeg, .png",
            titulo: 'Archivo de DPI de la parte frontal demasiado grande, tamaño maximo 25 MB',
            alerta: 'Fotografía frontal del DPI es requerido',
            base64: null,
        },
        {
            id: 2,
            title: 'Fotografía reversa del DPI',
            imagePath: "/assets/DPIReverso.png",
            text: "Adjunte fotografía reversa de DPI, en formato jpg, jpeg, png",
            type:".jpg, .jpeg, .png",
            titulo: 'Archivo de DPI de la parte trasera demasiado grande, tamaño maximo 25 MB',
            alerta: 'Fotografía reversa del DPI es requerido',
            base64: null,       
        },
        {
            id: 3,
            title: 'Video',
            imagePath: "/assets/DPICONFOTO.svg",
            text: "Adjunte video en formato .MP4, máximo 10MB(megabytes)",
            type:"video/*",
            titulo: 'Archivo de VIDEO demasiado grande, tamaño maximo 10 MB',
            alerta: 'Video es requerido',
            base64: null,       
        },
    ], 
    step: 0,
    
    data:{
        cui:"",birthDate: null,firstName:"",
        secondName:"",thirdName:"",firstLastName:"",
        secondLastName:"",marriedLastName:"",
        email:"",city_id:"", state_id:"", country_id:"",
    },
    ListadoDeCatalogos: {CatalogoDePais: [], CatalogoEstadoDepartamento:[], CatalogoCiudadMunicipio: []},
    posicionesDepartamentoMunicipio:{positionCountry:89, positionState:"",positionCity:""},
    tokenRecaptcha:null,
    RecaptchaStatus:false,
    ArchivoDPIFrontalGrande: false,
    ArchivoDPITraseraGrande: false,
    TipoArchivoDPIFrontalDiferente:false,
    TipoArchivoDPITraseroDiferente:false,
    nombreTituloArchivo:"",

    correoUsuario: "",
    codigoCorreo: "",
    mensajeCodigo:"",
};

const reducer = (state = initialState, action )=>{
    switch(action.type){
        case "SIGNUP_SET_DATA":
            var signupDataState = Object.assign({}, state);
            signupDataState.data.cui= action.state.data.dpi.value;
            signupDataState.data.birthDate= action.state.data.birthDate.value;
            signupDataState.data.firstName = action.state.data.firstName.value.toUpperCase();
            signupDataState.data.secondName = action.state.data.secondName.value.toUpperCase();
            signupDataState.data.thirdName = action.state.data.thirdName.value.toUpperCase();
            signupDataState.data.firstLastName = action.state.data.firstLastName.value.toUpperCase();
            signupDataState.data.secondLastName = action.state.data.secondLastName.value.toUpperCase();
            signupDataState.data.marriedLastName = action.state.data.marriedLastName.value.toUpperCase();
            signupDataState.data.email = action.state.data.email.value.toUpperCase();
            signupDataState.data.city_id = action.state.data.city_id.value;
            signupDataState.data.state_id = action.state.data.state_id.value;
            signupDataState.data.country_id = action.state.data.country_id.value;
            return signupDataState;
        case "SOLICITUD_EMPADRONAMIENTO_SET_POSICIONES_DEPARTAMENTO_MUNICIPIO":
            var solicitudEmpadronamientoPosicionesDepartamentoMunicipioState = Object.assign({}, state);
            solicitudEmpadronamientoPosicionesDepartamentoMunicipioState.posicionesDepartamentoMunicipio.positionCountry= action.state.posicionesDepartamentoMunicipio.positionCountry;
            solicitudEmpadronamientoPosicionesDepartamentoMunicipioState.posicionesDepartamentoMunicipio.positionState= action.state.posicionesDepartamentoMunicipio.positionState;
            solicitudEmpadronamientoPosicionesDepartamentoMunicipioState.posicionesDepartamentoMunicipio.positionCity= action.state.posicionesDepartamentoMunicipio.positionCity;            
            return solicitudEmpadronamientoPosicionesDepartamentoMunicipioState;                                                       
        case "SIGNUP_SET_FILES":
            var signupFilesState = Object.assign({}, state);
            signupFilesState.files=action.state.files;
            return signupFilesState;
        case "SIGNUP_SET_FILE_BY_INDEX":
            var signupFileByIndexState = Object.assign({}, state);
            signupFileByIndexState.files.forEach((item,index)=>{
                // if (item.id===action.state.index)  signupFileByIndexState.files[index].base64=action.state.base64;
                if (item.id===action.state.index){
                    signupFileByIndexState.files[index].base64=action.state.base64;
                }  
            });
            return signupFileByIndexState;
        case "SIGNUP_SET_STEP":
            var signupStepState = Object.assign({}, state);
            signupStepState.step=action.state.step;
            return signupStepState;
        case "SIGNUP_SET_TOKEN_RECAPCHA":
            var signupRecapchaState = Object.assign({}, state);
            signupRecapchaState.tokenRecaptcha=action.state.tokenRecaptcha;
            return signupRecapchaState;
        case "SIGNUP_SET_RECAPTCHA_STATUS":
            var signupRecapchaState = Object.assign({}, state);
            signupRecapchaState.RecaptchaStatus=action.state.RecaptchaStatus;
            return signupRecapchaState;
        case "SIGNUP_SET_ARCHIVO_DPI_FRONTAL_GRANDE":
            var signupArchivoDPIFrontalGrande = Object.assign({}, state);
            signupArchivoDPIFrontalGrande.ArchivoDPIFrontalGrande=action.state.ArchivoDPIFrontalGrande;
            return signupArchivoDPIFrontalGrande;            
        case "SIGNUP_SET_ARCHIVO_DPI_TRASERA_GRANDE":
            var signupArchivoDPITraseraGrande = Object.assign({}, state);
            signupArchivoDPITraseraGrande.ArchivoDPITraseraGrande=action.state.ArchivoDPITraseraGrande;
            return signupArchivoDPITraseraGrande;            
        case "SIGNUP_SET_TIPO_ARCHIVO_DPI_FRONTAL_DIFERENTE":
            var signupTipoArchivoDPIFrontalDiferente = Object.assign({}, state);
            signupTipoArchivoDPIFrontalDiferente.TipoArchivoDPIFrontalDiferente=action.state.TipoArchivoDPIFrontalDiferente;
            return signupTipoArchivoDPIFrontalDiferente;            
        case "SIGNUP_SET_TIPO_ARCHIVO_DPI_TRASERA_DIFERENTE":
            var signupTipoArchivoDPITraseroDiferente = Object.assign({}, state);
            signupTipoArchivoDPITraseroDiferente.TipoArchivoDPITraseroDiferente=action.state.TipoArchivoDPITraseroDiferente;
            return signupTipoArchivoDPITraseroDiferente;            
        case "SIGNUP_SET_NOMBRE_TITULO_ARCHIVO":
            var signupNombreTituloArchivo = Object.assign({}, state);
            signupNombreTituloArchivo.nombreTituloArchivo=action.state.nombreTituloArchivo;
            return signupNombreTituloArchivo;
        case "LOGIN_CORREO_USUARIO":
            var logingCorreoUsuario = Object.assign({}, state);
            logingCorreoUsuario.correoUsuario=action.state.correoUsuario;
            return logingCorreoUsuario;                       
        case "MENSAJE_CODIGO":
            var mensajeCodigoCorreo = Object.assign({}, state);
            mensajeCodigoCorreo.mensajeCodigo=action.state.mensajeCodigo;
            return mensajeCodigoCorreo;  
            case "CATALOGO_CREACION_USUARIOS":
                var catalogosDeCreacionUsuario = Object.assign({}, state);
                catalogosDeCreacionUsuario.ListadoDeCatalogos.CatalogoDePais=action.state.ListadoDeCatalogos.CatalogoDePais;
                catalogosDeCreacionUsuario.ListadoDeCatalogos.CatalogoEstadoDepartamento=action.state.ListadoDeCatalogos.CatalogoEstadoDepartamento;
                catalogosDeCreacionUsuario.ListadoDeCatalogos.CatalogoCiudadMunicipio=action.state.ListadoDeCatalogos.CatalogoCiudadMunicipio;
                return catalogosDeCreacionUsuario;              
        default:
            return state;
    }
}

export default reducer;