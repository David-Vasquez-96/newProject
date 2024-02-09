import React, { useEffect, useState } from "react";
import { Container} from "@material-ui/core";
import { GetApp, LocationOn} from "@material-ui/icons";
import { useStyles } from "./styles";
import ApiServices from "service/ApiServices";
import {functions} from 'constant/index';
import Form from 'component/Form/FormTwoColumns';
import DialogLoadingMessage from 'component/LoadingMessage/index'
import { showMessagePersonalizedPosition } from "service/SweetAlert";

export default function DatosDeAfiliados() {
    const classes = useStyles();
    const [loadingMessage, setLoadingMessage] = useState({loading: false, title:''});
    const [apiErrors,setApiErrors] = React.useState([]);
    let idDepartamento = 0;
    let description = [
        {name: "- Antes de continuar, revise que la información que ingresó esté correcta.",},
        {name: "- Datos requeridos (*)."}
    ];
    const setState =async ()=>{
        setLoadingMessage({loading: true, title: 'Cargando departamentos ...'})
        let newElements= Object. assign({}, elements); 
        try{
            let response =await ApiServices.departamentos.listRegisterPublic();

            if(response.error){
                showMessagePersonalizedPosition('warning', '¡Advertencia!', response.error?.message, 'center')
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
                functions.orderArray(newElements.state_id.list, 'name');
                newElements.state_id.list.unshift({id:"0", name:"TODOS"})
            } 
        }catch(error){
            showMessagePersonalizedPosition('warning', '¡Advertencia!', 'Intente de nuevo', 'center')
        }
        setElements(newElements);
        setLoadingMessage({loading: false, title: ''})        
    }  

    const setCity =async (event)=>{
        setLoadingMessage({loading: true, title: 'Cargando municipios ...'})
        idDepartamento = event.target.value;
        let newElements= Object. assign({}, elements); 
        if(event.target.value === '' || event.target.value === null){
            newElements.city_id.value = null
            newElements.city_id.list = []
            setLoadingMessage({loading: false, title: ''})
            return;
        }

        try{
            ApiServices.municipios.searchCriteria.clear();
            ApiServices.municipios.searchCriteria.setOperator("and");
            ApiServices.municipios.searchCriteria.addEquals("id.departamentoId", parseInt(idDepartamento));
            ApiServices.municipios.setIsPublic(true);
            let response =await ApiServices.municipios.listRegisterCriteria();

            if(response.error){
                showMessagePersonalizedPosition('warning', '¡Advertencia!', response.error?.message, 'center')
            }else {            
                newElements.city_id.list=[]
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
                functions.orderArray(newElements.city_id.list, 'name');
                newElements.city_id.list.unshift({id:"0", name:"TODOS"})
            }
        }catch(error){
            showMessagePersonalizedPosition('warning', '¡Advertencia!', 'Intente de nuevo', 'center')
        }
        setElements(newElements);
        setLoadingMessage({loading: false, title: ''})
    }      
    const [elements,setElements] = React.useState({
        state_id: { 
            idelement: "state_id", value: null , label: "Departamento *", pattern:"^[0-9][0-9]*$", validators: ['required'], 
            errorMessages:['Seleccione Departamento'], isError:false, elementType:'autocompleteV3', variant: "outlined",  
            list: [], handler: setCity,  icon: <LocationOn/>
        },
        city_id: { 
            idelement: "city_id", value: null, label: "Municipio *", pattern:"^[0-9][0-9]*$", validators: ['required'],  icon: <LocationOn/>,
            errorMessages:['Seleccione Municipio'], isError:false, elementType:'autocompleteV3', variant: "outlined",  list: []
        },        
    });    
	const downloadPdfV2 = async (base64, name) => {
		const response = await fetch('data:application/pdf;base64,'+base64);
		const blob = await response.blob();
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = name;
		a.click();
		URL.revokeObjectURL(url);
	};
    const DescargarReporte = async () =>{
        setLoadingMessage({loading: true, title: 'Descargando reporte ...'})
        let data = {codigoDepto: elements.state_id.value?.id, codigoMun: elements.city_id.value?.id}
        try {
            let response = await ApiServices.informacionGeneralMiOrganizacion.ListarAfiliado(data);
            if (response.error != null){
                showMessagePersonalizedPosition('warning', '¡Advertencia!', response.error, 'center')
            }else{
                // functions.downloadPDFFromStringBase64(response.data.base64,"Listado de Afiliados.pdf");
                downloadPdfV2(response.data.base64, "Listado de Afiliados.pdf")
                showMessagePersonalizedPosition('success', '¡BIEN!', 'Reporte descargado correctamente', 'center')
            }
        } catch (error) {
            showMessagePersonalizedPosition('warning', '¡Advertencia!', 'Intente de nuevo', 'center')
        }
        setLoadingMessage({loading: false, title: ''})        
    }

    const [buttonList,setButtonList]= React.useState({
        "descargarReporte":{"label":"Descargar Reporte","icon": <GetApp />,"callback":DescargarReporte, variant: "outlined", color: "primary",}, 
    });    
    
    useEffect(() => {
        setState()
    }, []);

    return (
    <div>
        <DialogLoadingMessage open={loadingMessage.loading} title={loadingMessage.title}/>
        <Container  maxWidth="lg" className={classes.contenedorPrincipal}>
            <Form elements= {elements} buttonList={buttonList} BotonNormal={true} apiErrors={apiErrors} description={description}/>
        </Container>
    </div>
    );
}