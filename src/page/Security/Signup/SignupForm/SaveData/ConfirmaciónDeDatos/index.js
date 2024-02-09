// React
import React, { useState, useEffect } from 'react';
// componentes
import Customdialog from 'component/CustomDialog';
import { useStyles } from "./style";
import { Button, ButtonBase, Divider, Grid, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { CreditCard, HighlightOff, LocationOn, Mail, Person, Send, Today } from '@material-ui/icons';
import { functions } from "constant/functions";
import MostrarImageModal from 'component/ImageModal'
import VideoPrev from 'component/videoModal'
import Form from 'component/Form/FormTwoColumns';
import DialogLoadingMessage from 'component/BackDrop';
import { showMessagePersonalizedPosition } from 'service/SweetAlert';
import ApiServices from 'service/ApiServices';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';

function AgregarNuevaSuspensionSinRegistro(props) {
    const classes = useStyles();
    const [getData] = useState([
        {id: 1, icon: <Person/>, title: 'PRIMER NOMBRE', value: props.data?.firstName || ''},
        {id: 2, icon: <Person/>, title: 'SEGUNDO NOMBRE', value: props.data?.secondName || ''},
        {id: 3, icon: <Person/>, title: 'TERCER NOMBRE', value: props.data?.thirdName || ''},
        {id: 4, icon: <Person/>, title: 'PRIMER APELLIDO', value: props.data?.firstLastName || ''},
        {id: 5, icon: <Person/>, title: 'SEGUNDO APELLIDO', value: props.data?.secondLastName || ''},
        {id: 6, icon: <Person/>, title: 'APELLIDO DE CASADA', value: props.data?.marriedLastName || ''},
        {id: 7, icon: <CreditCard/>, title: 'CUI DEL DPI', value: props.data?.cui || ''},
        {id: 8, icon: <Today/>, title: 'FECHA DE NACIMIENTO', value: functions.dateFormatGeneral(props.data?.birthDate) || ''},
        {id: 9, icon: <LocationOn/>, title: 'PAIS', value: props.data?.country_id?.name || ''},
        {id: 10, icon: <LocationOn/>, title: 'ESTADO / DEPARTAMENTO', value: props.data?.state_id?.name || ''},
        {id: 11, icon: <LocationOn/>, title: 'CIUDAD / MUNICIPIO', value: props.data?.city_id?.name || ''},
        {id: 12, icon: <Mail/>, title: 'EMAIL', value: props.data?.email || ''},
    ]);
    let description = [
        {name: "- Antes de continuar, revise que la información que ingresó esté correcta.",},
        {name: "- Datos requeridos (*)."}
    ];    
    const [getFiles] = useState([
        {id: 1, icon: <Person/>, title: 'DPI ANVERSO', value: props.files || ''},
        {id: 2, icon: <Person/>, title: 'DPI REVERSO', value: props.files || ''},
        {id: 3, icon: <Person/>, title: 'VIDEO', value: props.files || ''},
    ]);
    const [datosArchivo, setDatosArchivo] = useState({open: false, base64:'', dataFile: ''});
    //ver los archivos
    const AbrirMostrarImagenModal = async (event, getData) => {
        let file = ''     
        if(getData?.id === 1 || getData?.id === 2 || getData?.id === 3)  
            file = getData?.base64.split('base64,')[1];
        else 
            file = '';
        setDatosArchivo({open: true, base64: file, dataFile: getData })
    }
    const CerrarMostrarImagenModal = () => {
        setDatosArchivo({open: false, base64:'', dataFile: ''})
    }
    const [loadingMessage, setLoadingMessage] = useState({loading:false, title:''});
    let idDepartamento = 0;
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
                errorMessages:['0 a 20 caracteres, , sin espacios'], validators: ['requireds'], isError:false, elementType:'inputOutlined' , icon: <Person/>
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
                errorMessages:['0 a 20 caracteres, sin espacios'], validators: ['requireds'], isError:false, elementType:'inputOutlined' , icon: <Person/>
            },
            dpi: {
                idelement: "dpi", value:props.data.cui || "", label: "Ingrese el CUI *",  pattern:"^[0-9]{13}$", icon: <CreditCard/>,
                validators: ['required'], errorMessages:['CUI requerido, sin espacios'], isError:false, elementType:'inputOutlined', type:'number'
            },
            birthDate: {
                idelement: "birthDate", value: props.data.birthDate || null, label: "Fecha de nacimiento *", pattern:"^[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}$", 
                validators: ['required'], errorMessages:['fecha día/mes/año'], isError:false, elementType:'date', inputVariant: "outlined" 
            },
            email: {    
                idelement: "email", value:props.data.email, label: "Correo electrónico *", pattern:"^[\\w-+._%.]+(\\.[\\w-]{1,25}){0,25}@[\\w-]{1,25}(\\.[\\w-]{1,10})+[\\w-]+$", 
                validators: ['required'], errorMessages:['Ingrese un correo válido, sin espacios'], isError:false, elementType:'inputOutlined', icon: <Mail/> 
            },
        separador1:{ 
            idelement: "separador1", title:'', position:"left", value: "", currentValue:"", isError:false, elementType:'separador', validators: ['requireds']
        },
        residenceData:{ 
            idelement: "residenceData", title:'Datos de residencia', position:"left", value: "", currentValue:"", isError:false, elementType:'customTitleBar'
        },
            country_id: {   
                idelement: "country_id", value: props.data.country_id || null , label: "Pais", pattern:"^[1-9][0-9]*$", validators: ['required'], 
                errorMessages:['Seleccione el Pais de Residencia'], isError:false, elementType:'autocompleteV3', variant: "outlined",  
                // list: [], icon: <LocationOn/> 
                list: props.ListadoDeCatalogos.CatalogoDePais, handler: FuncionEstadoDepartamento, icon: <LocationOn/> 
            },
            state_id: { 
                idelement: "state_id", value:props.data.state_id || null , label: "Estado / Departamento *", pattern:"^[1-9][0-9]*$", validators: ['required'], 
                errorMessages:['Seleccione Estado/Departamento de Residencia'], isError:false, elementType:'autocompleteV3', variant: "outlined",  
                // list: [],  icon: <LocationOn/>
                list: props.ListadoDeCatalogos.CatalogoEstadoDepartamento, handler: ciudadOmunicipio,  icon: <LocationOn/>
            },
            city_id: { 
                idelement: "city_id", value: props.data.city_id || null, label: "Ciudad / Municipio *", pattern:"^[1-9][0-9]*$", validators: ['required'],  icon: <LocationOn/>,
                // errorMessages:['Seleccione Ciudad/Municipio de Residencia'], isError:false, elementType:'autocompleteV3', variant: "outlined",  list: []
                errorMessages:['Seleccione Ciudad/Municipio de Residencia'],    isError:false, elementType:'autocompleteV3', variant: "outlined",  list: props.ListadoDeCatalogos.CatalogoCiudadMunicipio
            },
    });
   
    const FuncionConfirmardatos = () =>{
        let allGood = true;
        allGood = functions.checkIsEmptyWhenRequiredElement(
            elements,
            setElements
        );        
        if(allGood){
            props.CATALOGO_CREACION_USUARIOS({CatalogoDePais: elements.country_id.list, CatalogoEstadoDepartamento: elements.state_id.list, CatalogoCiudadMunicipio: elements.city_id.list })
            props.SIGNUP_SET_DATA(elements);
            props.closeModal()
            props.showModalConfirmation()
            return;
        }        
    }
    useEffect(() => {
        // setCountry();
    }, []);

    return(
        <div>
            <Customdialog
                open={props.open}
                fullScreen={true}
                closeModal={props.closeModal}
                iconToolbar={props.iconToolbar}
                titleToolbar={props.titleToolbar}
                // maxWidth={'md'}
            >
                <div className={classes.root}>
                    <DialogLoadingMessage open={loadingMessage.loading} title={loadingMessage.title}/>
                    <div className={classes.title}>DATOS DEL CIUDADANO</div>
                    <Form   elements= {elements} description={description} />
                    {/* {
                            <Grid container className={classes.gridContainer}>
                                {
                                    getData.map((item,index) => (                                        
                                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.gridList}>
                                            <Grid item lg={1} md={1} sm={1} xs={1}> {item.icon}</Grid>
                                            <Grid item lg={5} md={5} sm={5} xs={5}><strong>{item.title}</strong></Grid>
                                            <Grid item lg={6} md={6} sm={6} xs={6}>{item.value}</Grid>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                    } */}
                    <div className={classes.title}>ARCHIVOS ADJUNTADOS</div>
                    <div >De clic en la fotografía o video para visualizar.</div>
                    {
                            <Grid container className={classes.gridContainer}>
                                {
                                    getFiles.map((item,index) => (                                        
                                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.gridList}>
                                            <Grid item lg={1} md={1} sm={1} xs={1}> {item.icon}</Grid>
                                            <Grid item lg={5} md={5} sm={5} xs={5}><strong>{item.title}</strong></Grid>
                                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                                {
                                                    (item.value[index]?.id === 1 || item.value[index]?.id === 2) ? 
                                                        <ButtonBase className={classes.image} onClick={(e)=>AbrirMostrarImagenModal(e,item.value[index])}>
                                                            <img className={classes.img} alt="complex" src={item.value[index]?.base64}/>
                                                        </ButtonBase>                                                
                                                    :
                                                        <ButtonBase className={classes.image} onClick={(e)=>AbrirMostrarImagenModal(e,item.value[index])}>
                                                            <video className={classes.img} src={item.value[index]?.base64}/>
                                                        </ButtonBase>                                                
                                                }
                                            </Grid>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                    }
                    <div className={classes.wrapper}>
                        <Button variant="outlined" color="secondary" onClick={props.closeModal} endIcon={<HighlightOff />}>CERRAR</Button>
                        <Button variant="outlined" color="primary" onClick={FuncionConfirmardatos} endIcon={<Send />}>CONFIRMAR DATOS</Button>
                    </div>
                </div>
            </ Customdialog>
            {/* ver los archivos */}
            {
                (datosArchivo?.dataFile?.id === 1 || datosArchivo?.dataFile?.id === 2) ? (
                    <MostrarImageModal 
                        open={datosArchivo.open} 
                        handleClose={CerrarMostrarImagenModal} 
                        titulo={datosArchivo?.dataFile?.title}
                        base64={datosArchivo.base64}
                    />
                ) : (datosArchivo?.dataFile?.id === 3) ? (
                    <VideoPrev  
                        open={datosArchivo.open}
                        base64={datosArchivo.base64}
                        titulo={datosArchivo?.dataFile?.title}
                        handleClose={CerrarMostrarImagenModal} 
                    />
                ): ""
            }            
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(AgregarNuevaSuspensionSinRegistro);