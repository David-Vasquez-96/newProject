import React, { useEffect, useState } from "react";
import { Container, Grid, Backdrop, CircularProgress } from "@material-ui/core";
import { GetApp} from "@material-ui/icons";
import { useStyles } from "./styles";
import Footer from "page/Home/Footer2";
import ApiServices from "service/ApiServices";
import Alert from "react-s-alert";
import LoadingProgressCircular from "component/BackDrop";
import Mensaje from 'component/MensajeElement'
import Title from "component/TitleWithIcon";
import {functions} from 'constant/index';
import Form from 'component/Form/FormTwoColumns';

export default function ReporteAsambleasOPASAM() {
    const classes = useStyles();
    const [loadingProgress, setLoadingProgress] = useState(false);
    const [open, setOpen] = useState(false)
    const [mensaje, setMensaje] = useState({tipoError:'', tipoMensaje:''})
    const [apiErrors,setApiErrors] = React.useState([]);
    let idDepartamento = 0;

    const setState =async ()=>{
        let newElements= Object. assign({}, elements); 
        try{
            let response =await ApiServices.departamentos.listRegisterPublic();
            if(response.error){
                Alert.error('Problemas al obtener los departamentos')
            }else {
                var datos = response.data
                Object.keys(datos).forEach((element, key, _array) =>{
                    if(datos[element].id === 23 || datos[element].id === 24 || datos[element].id === 25){
                    }else{
                        newElements.state_id.list.push({
                            id: datos[element].id,
                            name: datos[element].name,
                        });
                    }
                })                                                                         
                // newElements.state_id.list=response.data
                functions.orderArray(newElements.state_id.list, 'name');
                newElements.state_id.list.unshift({id:"0", name:"TODOS"})
            } 
        }catch(error){
            Alert.error(error)
        }
        setElements(newElements);

    }  

    const setCity =async (event)=>{
        idDepartamento = event.target.value;
        let newElements= Object. assign({}, elements); 
        try{
            ApiServices.municipios.searchCriteria.clear();
            ApiServices.municipios.searchCriteria.setOperator("and");
            ApiServices.municipios.searchCriteria.addEquals("id.departamentoId",parseInt(idDepartamento));
            ApiServices.municipios.setIsPublic(true);
            let response =await ApiServices.municipios.listRegisterCriteria();
            if(response.error){
                Alert.error('Problemas al obtener los municipios')
            }else {                
                var datos = response.data
                Object.keys(datos).forEach((element, key, _array) =>{
                    if(datos[element].id === 23 || datos[element].id === 24 || datos[element].id === 25){
                    }else{
                        newElements.city_id.list.push({
                            id: datos[element].id.id,
                            name: datos[element].name,
                        });
                    }
                })                                                                                         
                // newElements.city_id.list=response.data; 
                functions.orderArray(newElements.city_id.list, 'name');
                newElements.city_id.list.unshift({id:"0", name:"TODOS"})
            }
        }catch(error){
            Alert.error(error)
        }
        setElements(newElements);
    }      
    const [elements,setElements] = React.useState({
        state_id: {idelement: "state_id", value:"", label: "Departamento *", pattern:"^[0-9][0-9]*$", validators: ['required'], errorMessages:['Dato requerido'], isError:false, elementType:'dropdown', list: [], handler: setCity},
        city_id: { idelement: "city_id",  value:"", label: "Municipio *", pattern:"^[0-9][0-9]*$", validators: ['required'], errorMessages:['Dato requerido'], isError:false, elementType:'dropdown', list: [],  },
    });    

    const handClose = (event, reason) =>{
        if (reason === 'clickaway') {return ;}
        setOpen(false)
    }

    const DescargarReporte = async () =>{
        setLoadingProgress(true)
        let data = {codigoDepto: elements.state_id.value, codigoMun: elements.city_id.value}
        try {
            let response = await ApiServices.informacionGeneralMiOrganizacion.Los40(data);
            if (response.error != null){
                setOpen(true)
                setMensaje({tipoError:'error', tipoMensaje: response.error}) 
            }else
                functions.downloadPDFFromStringBase64(response.data.base64,"Reporte de Asambleas OPASAM.pdf");
        } catch (error) {
            Alert.error(error);
        }        
        setLoadingProgress(false)
    }

    const [buttonList,setButtonList]= React.useState({
        "reporteOPASAM":{"label":"Descargar Reporte","icon": <GetApp />,"callback":DescargarReporte, isCancel: false, "loading":false,"size":"medium","color":"#fff", "background":"linear-gradient(130deg, rgb(6, 107, 189) 30%, rgb(30, 136, 229) 90%) repeat scroll 0% 0% ",}, 
    });    
    
    useEffect(() => {
        setState()
    }, []);

    useEffect(() => {
        elements.city_id.value=''
    }, [elements.state_id.value]);

    return (
    <div>
        <LoadingProgressCircular open={loadingProgress}/>
        <Container maxWidth="lg">
            <Mensaje type={mensaje.tipoError} content={mensaje.tipoMensaje} open={open} handClose={handClose} />            
            <Grid container>
                <div className={classes.root}>
                    <Grid container>
                        <React.Fragment>
                            <Title title="Reporte de Asambleas OPASAM" icon="/assets/ReporteAsambleas.png" />
                            <Grid item xs={12} md={12} lg={12} container direction="row" justify="center" alignItems="center" >
                                <Form elements= {elements} buttonList={buttonList} BotonNormal={true} apiErrors={apiErrors} />
                            </Grid>
                        </React.Fragment>
                    </Grid>
                    <div className={classes.LineaDegradada}></div>
                </div>
            </Grid>
            <Backdrop className={classes.backdrop} open={true} onClick={setState}>
                <CircularProgress color="inherit" />
            </Backdrop>                            
        </Container>
        <div className="separateDiv">
            <Footer />
        </div>
    </div>
    );
}