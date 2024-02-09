import React, {useState, useEffect} from 'react';
import Form from 'component/Form/FormTwoColumns';
import ApiServices from "service/ApiServices";
import ResponseElement from 'component/MensajeElement';
import { Container, Grid } from '@material-ui/core';
import LoadingSpinner from 'component/LoadingSpinner';
import {useStyles} from './style';
import Alert from "react-s-alert";
import { Assignment} from '@material-ui/icons';
import MostrarBase64Pdf from 'component/base64pdf';
import {functions} from 'constant/index';
import { customCreateRegisterReport } from 'constant/customFetch';
import Title from 'component/TitleWithIcon';

const ReportesAsambleas= () => {
  
    const tipoReporte = [{id: 1, name: "OPASAM"}, {id: 2, name: "COMITE EJECUTIVO"}, {id: 3, name: "STATUS DE ORGANOS PERMANENTES"}, {id: 4, name: "DELEGADOS"}, {id: 5, name: "SECRETARIAS GENERALES"},
    {id: 6, name: "TRIBUNAL DE HONOR"}, {id: 7, name: "ORGANO DE FISCALIZACION FINANCIERA"}];  
const tipoOrganizacionNac = [{id: 1, name: "MUNICIPAL"}, {id: 2, name: "DEPARTAMENTAL"}, {id: 3, name: "NACIONAL"}];
const tipoOrganizacionOpasam = [{id: 2, name: "DEPARTAMENTAL"}, {id: 3, name: "NACIONAL"}];
const tipoOrganizacionDel = [ {id: 2, name: "DEPARTAMENTAL"}, {id: 3, name: "NACIONAL"}];
  const classes = useStyles(),
        [base64, setBase64] = useState(''),
        [abrirMostrarPDFModal, setAbrirMostrarPDFModal] = useState(false);
  const [responseData, setResponseData] = useState({ errorType: 'error', messageType: '', openResponse: false, });
  const [loadingRequest, setLoadingRequest] = useState(false),
  [searchLoading] = useState(false);
 

  useEffect(() => {
    setState();
    }, []);

  const setState =async ()=>{
      let newElements= Object. assign({}, elements); 
      try{
        if(elements.tipoOrganizacion.value ==1 || elements.tipoOrganizacion.value ==2){
        let response =await ApiServices.departamentos.listRegisterPublic();
        if(response.error){
            Alert.error('Problemas al obtener los departamentos')
        }else {
            var datos = response.data
            Object.keys(datos).forEach((element, _array) =>{
                if(datos[element].id === 23 || datos[element].id === 24 || datos[element].id === 25){
                }else{
                    newElements.idDepartamento.list.push({
                        id: datos[element].id,
                        name: datos[element].name,
                    });
                }
            })                                                         
            functions.orderArray(newElements.idDepartamento.list, 'name');
        }} 
    }catch(error){
        Alert.error(error)
    }
    setElements(newElements);

}

const setCity =async (event)=>{
    
    let idDepartamento = 0;
    idDepartamento = event.target.value;
    let newElements= Object. assign({}, elements); 
    newElements.idMunicipio.value = null;
    try{
        if(elements.tipoOrganizacion.value ==1){
        ApiServices.municipios.searchCriteria.clear();
        ApiServices.municipios.searchCriteria.setOperator("and");
        ApiServices.municipios.searchCriteria.addEquals("id.departamentoId",parseInt(idDepartamento));
        ApiServices.municipios.setIsPublic(true);
        let response =await ApiServices.municipios.listRegisterCriteria();
        if(response.error){
            Alert.error('Problemas al obtener los municipios')
        }else {      
            newElements.idMunicipio.list=[]          
            var datos = response.data
            Object.keys(datos).forEach((element, _array) =>{
                if(datos[element].id === 23 || datos[element].id === 24 || datos[element].id === 25){
                }else{
                    newElements.idMunicipio.list.push({
                        id: datos[element].id.id,
                        name: datos[element].name,
                    });
                }
            })                                                                                                         
            // newElements.idMunicipio.list=response.data; 
            functions.orderArray(newElements.idMunicipio.list, 'name');
        }} 
    }catch(error){
        Alert.error(error)
    }
    setElements(newElements);

}   

         //Funcion para poder habilitar inputs dependiendo del tipo de organización
    const evaluarTipoOrganizacion=(e)=>{
        if (e.target.value === 1){
            elements.idDepartamento.elementType = "dropdown"
            elements.idMunicipio.elementType = "dropdown"
            elements.idDepartamento.value = null
            elements.idMunicipio.value = null
            elements.idMunicipio.list = []
            elements.idDepartamento.list = []
            setState()
        }else if (e.target.value === 2){
            elements.idDepartamento.elementType = "dropdown"
            elements.idMunicipio.elementType = "hidden"
            elements.idDepartamento.value = null
            elements.idMunicipio.value = null
            elements.idMunicipio.list = []
            elements.idDepartamento.list = []
            setState()
        }else if (e.target.value === 3 || e.target.value === 4 ||e.target.value === "" || e.target.value === null){
            elements.idDepartamento.elementType = "hidden"
            elements.idMunicipio.elementType = "hidden"
            elements.idDepartamento.value = null
            elements.idMunicipio.value = null
            elements.idMunicipio.list = []
            elements.idDepartamento.list = []
        }
    }
        //Funcion para poder habilitar inputs dependiendo Tipo de Reporte.
        const showInputsReport= (e) => {
            if(e.target.value === 3 ||e.target.value === 6 || e.target.value === 7 || e.target.value === "" || e.target.value === null  ){
                elements.tipoOrganizacion.elementType = "hidden"
                elements.idDepartamento.elementType = "hidden"
                elements.idMunicipio.elementType = "hidden"
                elements.idDepartamento.value = null
                elements.tipoOrganizacion.value = null
                elements.idMunicipio.value = null
                elements.idMunicipio.list = []
                elements.tipoOrganizacion.list = []
                elements.tipoOrganizacion.validators = []
                elements.idDepartamento.list = []
            }else if (e.target.value === 4  || e.target?.value === 5 ){
                elements.idDepartamento.elementType = "hidden"
                elements.tipoOrganizacion.elementType = "dropdown"
                elements.idMunicipio.elementType = "hidden"
                elements.idDepartamento.value = null
                elements.idMunicipio.value = null
                elements.tipoOrganizacion.value = null
                elements.idMunicipio.list = []
                elements.idDepartamento.list = []
                elements.tipoOrganizacion.validators = ['required']
                elements.tipoOrganizacion.list = tipoOrganizacionDel
            }
            else if(e.target.value === 2) {
                elements.tipoOrganizacion.elementType = "dropdown"
                elements.idDepartamento.elementType = "hidden"
                elements.idMunicipio.elementType = "hidden"
                elements.idDepartamento.value = null
                elements.tipoOrganizacion.value = null
                elements.idMunicipio.value = null
                elements.tipoOrganizacion.list = tipoOrganizacionNac
                elements.tipoOrganizacion.validators = ['required']
            }
            else if(e.target.value === 1 ){
            elements.tipoOrganizacion.elementType = "dropdown"
            elements.idDepartamento.elementType = "hidden"
            elements.idMunicipio.elementType = "hidden"
            elements.idDepartamento.value = null
            elements.tipoOrganizacion.value = null
            elements.idMunicipio.value = null
            elements.tipoOrganizacion.list = tipoOrganizacionOpasam
            elements.tipoOrganizacion.validators = ['required']
        }
    }

    
        //Formulario para ingresar datos para reportes.
        const [elements,setElements] = React.useState({
        titleReport:{
            idelement: "titleReport",title:'Generar Reportes', position:"center", value: "", isError:true, elementType:'title', validators: ['required'],
        },            
        tipoReporte: {
            idelement: "tipoReporte", value: "", label: "Seleccione tipo de reporte *", pattern:"^[0-9][0-9]*$", validators: ['required'], 
            errorMessages:['Seleccione Tipo de Reporte'], isError:false, elementType:'dropdown', list: tipoReporte, autoFocus: true, handler: showInputsReport
        },
        tipoOrganizacion: {
            idelement: "tipoOrganizacion", value: null, label:"Seleccione el tipo de órgano político",pattern:"^[0-9][0-9]*$", validators:['required'],
            isError: false, errorMessages: ["Debe seleccionar el tipo de órgano"], elementType: 'hidden', list: [], handler: evaluarTipoOrganizacion, disabled: false
        },
        idDepartamento: {
            idelement: "idDepartamento", value: null , label: "Seleccione el departamento *", pattern:"^[0-9][0-9]*$", validators: ['required'],
            errorMessages:['Seleccione el departamento'], isError:false, elementType:'hidden', list: [], handler: setCity, 
            disabled: false
        },
        idMunicipio: { 
            idelement: "idMunicipio", value: null , label: "Seleccione el municipio *", pattern:"^[0-9][0-9]*$", validators: ['required'],
            errorMessages:['Seleccione el municipio'], isError:false, elementType:'hidden', list: [], handler: undefined, disabled: false
        },
        
    });

    const generarReporteAsamblea = async (dataForm)=>{
        setLoadingRequest(true);
        const response1 = await ApiServices.informacionGeneralMiOrganizacion.list();       
            delete dataForm.tipoReporte
            delete dataForm.idDepartamento
            delete dataForm.idMunicipio
            delete dataForm.titleReport
            dataForm.idOP=response1.data.idOrganizacion
            dataForm.departamentoReporte = elements.idDepartamento?.value
            dataForm.tipoOrganizacion = elements.tipoOrganizacion?.value
            dataForm.municipioReporte = elements.idMunicipio?.value
            dataForm.tipoReporte = elements.tipoReporte?.value
            dataForm.tipoOpasam = null
    let data = {
        controller: "asambleas",
        action: "",
        data: dataForm
    }
    if(elements.tipoReporte.value == 1){
        data.action = "reporteOPASAM"
        
    }
    else if (elements.tipoReporte.value == 2){
        data.action = "reporteCOMITE"
    }
    else if (elements.tipoReporte.value == 4){
        data.action = "reporteDelegado"
    }
    else if (elements.tipoReporte.value == 6 || elements.tipoReporte.value == 7 || elements.tipoReporte.value == 5 || elements.tipoReporte.value == 3){
        data.action = "reportesAsamblea"
    }
    
        const response = await customCreateRegisterReport(data);
        setLoadingRequest(false);
      
            if(response?.error) {

            if (response?.type === 1) {
                return setResponseData({ errorType: 'error', messageType: `Oops!, ${response.error.message}`, openResponse: true, });
            }

            if (response?.error?.status === 404) {
                return setResponseData({ errorType: 'error', messageType: `Oops!, Ponganse en contacto con el Administrador sí este mensaje persiste.`, openResponse: true, });
            }
            return setResponseData({ errorType: 'error', messageType: response.error?.message || "", openResponse: true, });
         }
            setBase64(response.response.data)
            setAbrirMostrarPDFModal(true)
           
        }
  


    const CerrarMostrarPDFModal = () => {
        setAbrirMostrarPDFModal(false) 
    }

    const descargarPDF = () => {
        elements.tipoReporte.value === 1 ? functions.downloadPDFFromStringBase64(base64, ('Reporte OPASAM .pdf')) : 
        elements.tipoReporte.value  === 2  ? functions.downloadPDFFromStringBase64(base64, ('Reporte de Comité Ejecutivo.pdf')) : 
        elements.tipoReporte.value  === 3 ? functions.downloadPDFFromStringBase64(base64, ('Reporte Status de Órganos Permanentes.pdf')) :
        elements.tipoReporte.value === 4  ? functions.downloadPDFFromStringBase64(base64, ('Reporte Delegados.pdf')) : 
        elements.tipoReporte.value === 5 ? functions.downloadPDFFromStringBase64(base64, ('Reporte de Secretarías Generales.pdf')) : 
        elements.tipoReporte.value === 6 ? functions.downloadPDFFromStringBase64(base64, ('Reporte de Tribunal de Honor.pdf')) : 
        functions.downloadPDFFromStringBase64(base64,  ('Reporte Órgano de Fiscalización Financiera.pdf'));
    }


    const [buttonList]= React.useState({
        "aproveAction":
                {"label":"Generar Reporte", "icon": <Assignment/>, "callback": generarReporteAsamblea,"loading":false,"size":"medium",
                "background":"linear-gradient(45deg, #205690 30%, #3890EE 90%)", "border":"0px", "borderRadius":"5",
                "boxShadow":"0 3px 5px 2px rgba(33, 203, 243, .3)", "color":"white", "height":37, "width":220 , padding:"0 30px", disabled: false,
                isCancel: false,
        },
    });
    
    // to change data response
    const changeDataResponse = (errorType, messageType, openResponse = false) => {
        setResponseData({ errorType, messageType, openResponse, })
    };

     // to close dialog with message Response Element
    const handClose = (_, reason) => {
        if (reason === 'clickaway') {return}     
        changeDataResponse('error', '', false)
        };


    const { errorType, messageType, openResponse} = responseData;

    
    return (
        <div>
        {loadingRequest && ( <LoadingSpinner open={loadingRequest}/> )}
        {searchLoading && ( <LoadingSpinner open={searchLoading}/> )}
        {/* Dialog de mnesaje */}
        {openResponse && ( <ResponseElement type={errorType} content={messageType} open={openResponse} handClose={handClose}/> )}
            <Title title="Reportes de Asambleas" icon={"/assets/ReporteAsambleas.png"} justify='center' />
            <Container maxWidth="xl">
                <Grid container style={{textAlign: 'center'}}>
                    <div className={classes.colorComponente} style={{width: '100%', position: 'relative', overflow: 'auto', border: '1px solid  #cccccc', borderRadius: '20px', marginBottom:10,}} >
                        <Grid item xs={12} container direction="row" justify="center" alignItems="center">
                            <Form
                                elements={elements}
                                buttonList={buttonList}
                            />
                </Grid>
                            <div className={classes.lineaDegradadaBottom}></div>
                        </div>
                    </Grid>
                    <MostrarBase64Pdf open={abrirMostrarPDFModal} handleClose={CerrarMostrarPDFModal} 
                    title={
                        elements.tipoReporte.value == 1 ? 'REPORTE OPASAM' :
                        elements.tipoReporte.value == 2 ? 'REPORTE DE COMITÉ EJECUTIVO' :
                        elements.tipoReporte.value == 3 ? 'REPORTE STATUS ÓRGANOS PERMANENTES' :
                        elements.tipoReporte.value == 4 ? 'REPORTE DELEGADOS' :
                        elements.tipoReporte.value == 5 ? 'REPORTE DE SECRETARIOS GENERALES' :
                        elements.tipoReporte.value == 6 ? 'REPORTE DE TRIBUNAL DE HONOR' : 
                        'REPORTE ÓRGANO DE FISCALIZACIÓN FINANCIERA'
                    }
                     pdf={base64} showDownloadButton={descargarPDF}
                />
            </Container>
            </div>
        )
}
export default ReportesAsambleas;
