import React, { useEffect, useState } from 'react';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import ApiServices from 'service/ApiServices';
import { CreditCard, Home, LocationOn, Mail, NavigateNext, Person} from '@material-ui/icons';
import Form from 'component/Form/FormTwoColumns';
import ValidarCuiClass from './ValidarCui';
import {useStyles} from './style';
import {functions} from 'constant/index';
import DialogLoadingMessage from 'component/BackDrop';
import { showMessagePersonalizedPosition } from 'service/SweetAlert';
import CustomizedDialogs from 'component/Dialog';
import { Container } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const  SignupForm= (props)=> {
    const classes = useStyles();
    let history = useHistory();
    const validarCui= new ValidarCuiClass();
    const [apiErrors,setApiErrors] = React.useState([]);
    let idDepartamento = 0;
    let positionCountry = "";
    let positionState = "";
    let positionCity = "";
    let description = [
        {name: "- Antes de continuar, revise que la información que ingresó esté correcta.",},
        {name: "- Datos requeridos (*)."}
    ];
    const [loadingMessage, setLoadingMessage] = useState({loading:false, title:''});
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const setCountry =async ()=>{
        setLoadingMessage({loading: true, title:'Cargando catálogo de paises ...'})
        let newElements= Object. assign({}, elements); 
        try{
            ApiServices.paises.orderCriteria.clear();
            ApiServices.paises.orderCriteria.addAsc("name");
            let response =await ApiServices.paises.listRegisterPublic();
            if(response.error){
                showMessagePersonalizedPosition('warning', '¡Advertencia! ',response?.error?.message, 'center')
            }
            else {
                newElements.country_id.list=response.data
                if(props.data.country_id){
                    newElements.country_id.value = {id: props.data.country_id?.id ,name: props.data.country_id?.name}
                    if(props.data.country_id?.id != newElements.country_id.value?.id){
                        FuncionEstadoDepartamento(props.data.country_id?.id)
                    }
                }else{
                    for (let index = 0; index < response.data.length; index++) {
                        if(response.data[index].id === 1){
                            newElements.country_id.value = {id: response.data[index].id ,name: response.data[index].name}
                            FuncionEstadoDepartamento(response.data[index].id)
                            break;
                        }
                    }
                }
                // functions.orderArray(newElements.country_id.list, 'name');
                // if(props.data.country_id === 1) {
                    //     setDepartamento(props.data.country_id);
                    // }
                } 
        }catch(exception){
            showMessagePersonalizedPosition('error', '¡Advertencia!', "Intente de nuevo. Ponganse en contacto con el Administrador sí este mensaje persiste.", 'center')
        }
        setElements(newElements);
        setLoadingMessage({loading: false, title:''})
    }      
    const setState =async (idCountry)=>{
        setLoadingMessage({loading: true, title:'Cargando catálogo de Estados ...'})
        elements.state_id.value =null
        elements.state_id.list =null
        elements.city_id.value =null
        elements.city_id.list =null
        let newElements= Object. assign({}, elements); 
        try{
            ApiServices.estadosDePaises.searchCriteria.clear();
            ApiServices.estadosDePaises.searchCriteria.setOperator("and");
            ApiServices.estadosDePaises.searchCriteria.addEquals("paisId",parseInt(idCountry));
            ApiServices.estadosDePaises.setIsPublic(true);
            let response =await ApiServices.estadosDePaises.listRegisterCriteria();
            if(response.error){
                showMessagePersonalizedPosition('warning', '¡Advertencia! ',response?.error?.message, 'center')
            }else {
                newElements.state_id.list=response.data
                functions.orderArray(newElements.state_id.list, 'name');
            } 
        }catch(exception){
            showMessagePersonalizedPosition('error', '¡Advertencia!', "Intente de nuevo. Ponganse en contacto con el Administrador sí este mensaje persiste.", 'center')
        }
        setElements(newElements);
        setLoadingMessage({loading: false, title:''})
    }      
    const setCity =async (paisID, estadoId)=>{
        setLoadingMessage({loading: true, title:'Cargando catálogo de Ciudades ...'})
        elements.city_id.value = 0
        let newElements= Object.assign({}, elements); 
        try{
            ApiServices.ciudades.searchCriteria.clear();
            ApiServices.ciudades.searchCriteria.setOperator("and");
            ApiServices.ciudades.searchCriteria.addEquals("paisId",parseInt(paisID));
            ApiServices.ciudades.searchCriteria.setOperator("and");
            ApiServices.ciudades.searchCriteria.addEquals("estadoId",parseInt(estadoId));
            ApiServices.ciudades.setIsPublic(true);
            let response =await ApiServices.ciudades.listRegisterCriteria();
            if(response.error){
                showMessagePersonalizedPosition('warning', '¡Advertencia! ',response?.error?.message, 'center')
            }else {
                newElements.city_id.list=response.data;
                functions.orderArray(newElements.city_id.list, 'name');
            }
        }catch(exception){
            showMessagePersonalizedPosition('error', '¡Advertencia!', "Intente de nuevo. Ponganse en contacto con el Administrador sí este mensaje persiste.", 'center')
        }
        setElements(newElements);
        setLoadingMessage({loading: false, title:''})
    }  
    const setDepartamento =async ()=>{
        setLoadingMessage({loading: true, title:'Cargando catálogo de departamentos'})
        elements.state_id.value =null
        elements.state_id.list =null
        elements.city_id.value =null
        elements.city_id.list =null        
        let newElements= Object. assign({}, elements); 
        try{
            let response =await ApiServices.departamento.listRegisterPublic();
            if(response.error){
                showMessagePersonalizedPosition('warning', '¡Advertencia! ',response?.error?.message, 'center')
            }else {
                newElements.state_id.list=JSON.parse(response.data)
                functions.orderArray(newElements.state_id.list, 'name');
            } 
        }catch(exception){
            showMessagePersonalizedPosition('error', '¡Advertencia!', "Intente de nuevo. Ponganse en contacto con el Administrador sí este mensaje persiste.", 'center')
        }
        setElements(newElements);
        setLoadingMessage({loading: false, title:''})
    }  
    const setMunicipio =async (idDepartamento)=>{
        setLoadingMessage({loading: true, title:'Cargando catálogo de municipios'})
        let newElements= Object. assign({}, elements); 
        try{
            ApiServices.municipio.searchCriteria.clear();
            ApiServices.municipio.searchCriteria.setOperator("and");
            ApiServices.municipio.searchCriteria.addEquals("departamentoId",parseInt(idDepartamento));
            ApiServices.municipio.setIsPublic(true);
            let response =await ApiServices.municipio.listRegisterCriteria();
            if(response.error){
                showMessagePersonalizedPosition('warning', '¡Advertencia! ',response?.error?.message, 'center')
            }else {                
                newElements.city_id.list=JSON.parse(response.data);
                functions.orderArray(newElements.city_id.list, 'name');
            }
        }catch(exception){
            showMessagePersonalizedPosition('error', '¡Advertencia!', "Intente de nuevo. Ponganse en contacto con el Administrador sí este mensaje persiste.", 'center')
        }
        setElements(newElements);
        setLoadingMessage({loading: false, title:''})
    }      
    const FuncionEstadoDepartamento =async (event)=>{
        let newElements= Object. assign({}, elements); 
        if(event?.target?.value === ""){
            newElements.state_id.value = null;
            newElements.state_id.list = [];
            newElements.city_id.value = null;
            newElements.city_id.list = [];
            return;
        }
        if(event?.target?.value ===1 ){
            if(props.data.country_id?.id != newElements.country_id.value?.id)
                return setDepartamento()
            
            if(elements.state_id?.list.length === 0){
                setDepartamento()
            }
        }else if(elements.country_id.value?.id === 1){
            if(elements.state_id?.list.length === 0){                
                setDepartamento()
            }
        }else{
            setState(event?.target?.value)
        }
        // if(event.target.value === 1) {setDepartamento()}
        //     else if(event.target.value != 1){setState(idCountry)}
    }
    const ciudadOmunicipio = (event) => {
        if(event?.target?.value === ""){
            let newElements= Object. assign({}, elements); 
            newElements.city_id.value = null;
            newElements.city_id.list = [];
            return;
        }        
        if(event === undefined) idDepartamento = props.data.state_id;
            else idDepartamento = event.target.value;
        if(elements.country_id.value?.id === 1) {setMunicipio(idDepartamento)}
        else {setCity(elements.country_id.value?.id, idDepartamento)}
    }    
    const [elements,setElements] = React.useState({
        personalData:{ 
            idelement: "personalData", title:'Datos personales', position:"left", value: "", currentValue:"", isError:false, elementType:'customTitleBar'
        },
            firstName: {    
                idelement: "firstName",  value:props.data.firstName || "",    label: "Primer Nombre *",   pattern:"^([a-zA-Z_][a-zA-Z_ Ññ]*[a-zA-Z_Ññ]){1,20}$",  
                validators: ['required'], errorMessages:['Primer Nombre requerido, sin espacios'],  isError:false, elementType:'inputOutlined', icon: <Person/>
            },
            secondName: {   
                idelement: "secondName", value:props.data.secondName || "",   label: "Segundo Nombre", pattern:"^([a-zA-Z_][a-zA-Z_ Ññ]*[a-zA-Z_Ññ]){0,20}$",  
                validators: ['required'], errorMessages:['0 a 20 caracteres, sin espacios'], isError:false, elementType:'inputOutlined' , icon: <Person/>
            },
            thirdName: {    
                idelement: "thirdName",  value:props.data.thirdName || "", label: "Tercer Nombre", pattern:"^([a-zA-Z_][a-zA-Z_ Ññ]*[a-zA-Z_Ññ]){0,30}$",
                errorMessages:['0 a 20 caracteres, , sin espacios'],      isError:false, elementType:'inputOutlined' , icon: <Person/>
            },
            firstLastName: {    
                idelement: "firstLastName",  value:props.data.firstLastName || "",    label: "Primer Apellido *", pattern:"^([a-zA-Z_][a-zA-Z_ Ññ]*[a-zA-Z_Ññ]){1,20}$", 
                validators: ['required'], errorMessages:['Primer Apellido requerido, sin espacios'], isError:false, elementType:'inputOutlined' , icon: <Person/>
            },
            secondLastName: {  
                idelement: "secondLastName", value:props.data.secondLastName || "",   label: "Segundo Apellido", pattern:"^([a-zA-Z_][a-zA-Z_ Ññ]*[a-zA-Z_Ññ]){0,20}$", 
                validators: ['required'], errorMessages:['0 a 20 caracteres, sin espacios'], isError:false, elementType:'inputOutlined' , icon: <Person/>
            },
            marriedLastName: {  
                idelement: "marriedLastName",value:props.data.marriedLastName || "",  label: `Apellido de Casada (Sin el "De")`, pattern:"^([a-zA-Z_][a-zA-Z_ Ññ]*[a-zA-Z_Ññ]){0,20}$", 
                errorMessages:['0 a 20 caracteres, sin espacios'], isError:false, elementType:'inputOutlined' , icon: <Person/>
            },
            dpi: {
                idelement: "dpi", value:props.data.cui || "", label: "Ingrese el CUI *",  pattern:"^[0-9]{13}$", icon: <CreditCard/>,
                validators: ['required'], errorMessages:['CUI requerido, sin espacios'], isError:false, elementType:'inputOutlined', type:'number'
            },
            birthDate: {
                idelement: "birthDate", value: props.data.birthDate || null, label: "Fecha de nacimiento *", pattern:"^[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}$", 
                validators: ['required'], errorMessages:['fecha día/mes/año'], isError:false, elementType:'date', inputVariant: "outlined" 
            },

        separador1:{ 
            idelement: "separador1", title:'', position:"left", value: "", currentValue:"", isError:false, elementType:'separador'
        },
        residenceData:{ 
            idelement: "residenceData", title:'Datos de residencia', position:"left", value: "", currentValue:"", isError:false, elementType:'customTitleBar'
        },
            country_id: {   
                idelement: "country_id", value: props.data.country_id || null , label: "Pais", pattern:"^[1-9][0-9]*$", validators: ['requireds'], 
                errorMessages:['Seleccione el Pais de Residencia'], isError:false, elementType:'autocompleteV3', variant: "outlined",  
                list: props.ListadoDeCatalogos.CatalogoDePais, handler: FuncionEstadoDepartamento, icon: <LocationOn/> 
            },
            state_id: { 
                idelement: "state_id", value:props.data.state_id || null , label: "Estado / Departamento *", pattern:"^[1-9][0-9]*$", validators: ['requireds'], 
                errorMessages:['Seleccione Estado/Departamento de Residencia'], isError:false, elementType:'autocompleteV3', variant: "outlined",  
                list: props.ListadoDeCatalogos.CatalogoEstadoDepartamento, handler: ciudadOmunicipio,  icon: <LocationOn/>
            },
            city_id: { 
                idelement: "city_id", value: props.data.city_id || null, label: "Ciudad / Municipio *", pattern:"^[1-9][0-9]*$", validators: ['requireds'],  icon: <LocationOn/>,
                errorMessages:['Seleccione Ciudad/Municipio de Residencia'],    isError:false, elementType:'autocompleteV3', variant: "outlined",  list: props.ListadoDeCatalogos.CatalogoCiudadMunicipio
            },
        separador2:{ 
            idelement: "separador2", title:'', position:"left", value: "", currentValue:"", isError:false, elementType:'separador'
        },            
        contactData:{ 
            idelement: "contactData", title:'Datos de contacto', position:"left", value: "", currentValue:"", isError:false, elementType:'customTitleBar'
        },
            email: {    
                idelement: "email", value:props.data.email, label: "Correo electrónico *", pattern:"^[\\w-+._%.]+(\\.[\\w-]{1,25}){0,25}@[\\w-]{1,25}(\\.[\\w-]{1,10})+[\\w-]+$", 
                validators: ['required'], errorMessages:['Ingrese un correo válido, sin espacios'], isError:false, elementType:'inputOutlined', icon: <Mail/> 
            },
            reEmail: {  
                idelement: "reEmail", value:props.data.email, label: "Confirmación de Correo *", pattern:"^[\\w-+._%.]+(\\.[\\w-]{1,25}){0,25}@[\\w-]{1,25}(\\.[\\w-]{1,10})+[\\w-]+$", 
                validators: ['required'], errorMessages:['Ingrese un correo válido, sin espacios'], isError:false, elementType:'inputOutlined' , icon: <Mail />
            },
    });
  
    const nextStep=()=>{        
        props.CATALOGO_CREACION_USUARIOS({CatalogoDePais: elements.country_id.list, CatalogoEstadoDepartamento: elements.state_id.list, CatalogoCiudadMunicipio: elements.city_id.list })
        let FechaSistema = new Date(); 
        let añoSistema = FechaSistema.getFullYear(); let mesSistema = FechaSistema.getMonth() + 1; let diaSistemas = FechaSistema.getDate();
        
        let añoNacimientoUsuario= elements.birthDate.value.getFullYear(); 
        var cumpleanos = new Date(elements.birthDate.value);
        var edad = FechaSistema.getFullYear() - cumpleanos.getFullYear();
        var m = FechaSistema.getMonth() - cumpleanos.getMonth();
        var h = FechaSistema.getDate() - cumpleanos.getDate();
    
        if (m < 0 || (m === 0 && FechaSistema.getDate() < cumpleanos.getDate())) {
            edad--;
        }
        
        if(añoNacimientoUsuario >= añoSistema){
            showMessagePersonalizedPosition('warning', '¡Advertencia! ', 'Fecha de nacimiento del usuario no puede ser mayor o igual a la del sistema, por favor verifique la fecha.', 'center')
        }else if(edad<18){
            showMessagePersonalizedPosition('warning', '¡Advertencia! ', 'Usuario es menor de edad. No se puede solicitar creación de usuario.', 'center')
        }else if(edad>=120){
            showMessagePersonalizedPosition('warning', '¡Advertencia! ', 'Usuario es mayor a 120 años. No se puede solicitar creación de usuario.', 'center')
        }else{
            validarCui.setCui(elements.dpi.value);
            validarCui.validar();
            if (validarCui.esError){
                elements.dpi.isError=validarCui.esError;
                elements.dpi.errorMessages=validarCui.mensajeError
                let errores=[];
                errores[0]={"attribute": "dpi", "message":validarCui.getMensajeError()}
                setApiErrors(errores);
            }else{
                if(elements.email.value === elements.reEmail.value){
                    props.SIGNUP_SET_DATA(elements);
                    props.SIGNUP_SET_STEP(1);
                    props.SOLICITUD_EMPADRONAMIENTO_SET_POSICIONES_DEPARTAMENTO_MUNICIPIO({positionCountry:positionCountry,positionState: positionState, positionCity: positionCity})
                }else{
                    showMessagePersonalizedPosition('warning', '¡Advertencia! ', 'Correo electrónico no coinciden', 'center')
                }
            }
        }
    }

    const backHome = () => {
        history.push("/home",{})
    }

    const [buttonList,setButtonList]= React.useState({
        "backHome":{"label":"Inicio","icon": <Home />,"callback":backHome, isCancel: true, variant: "outlined", color: "primary", "loading":false,"size":"medium", "background":"linear-gradient(130deg, rgb(6, 107, 189) 30%, rgb(30, 136, 229) 90%) repeat scroll 0% 0% ",},   
        "next":{"label":"Siguiente","icon": <NavigateNext />,"callback":nextStep, variant: "outlined", color: "primary", "loading":false,"size":"medium", "background":"linear-gradient(130deg, rgb(6, 107, 189) 30%, rgb(30, 136, 229) 90%) repeat scroll 0% 0% ",},   
    });

    useEffect(() => {
        setOpen(true)
        setCountry();
    }, []);

    return (
        <Container maxWidth="xl">                    
            <div className={classes.container}> 
                {
                    (loadingMessage.loading) && (
                        <DialogLoadingMessage open={loadingMessage.loading} title={loadingMessage.title}/>
                    )
                }
                <CustomizedDialogs handleClose={handleClose} open={open} />
                <Form   elements= {elements}  buttonList={buttonList} apiErrors={apiErrors} description={description}/>
                <br/><br/>
            </div>
        </Container>        
    );   
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);