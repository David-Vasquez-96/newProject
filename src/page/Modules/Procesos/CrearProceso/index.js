import React, { useState } from 'react';
import { Cancel, Person} from '@material-ui/icons';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import ComponentCard from 'page/Home/Body/Procesos/ComponentCard'
import Form from 'component/Form/FormTwoColumns';
import { Divider } from '@material-ui/core';
import Alert from 'react-s-alert';
// REDUX **************************
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveNewProcessData, updateProcessList } from 'store/reducers/ProcesosSlice';

let data = {}

const ComponenteCrearEditarProceso=(props)=> {   
    const classes = useStyles();
    const initialColor ={r: '0', g: '0', b: '0',a: '1',};
    const newArray = []
    const dispatch = useDispatch();
    const newProcess = useSelector(state => state.proceso.newProcess);
    const processDataList = JSON.parse(JSON.stringify(useSelector( state => state.proceso.processList))); 
    data = newProcess;
    let description = [
        {name: "- Antes de continuar, revise que la información que ingresó esté correcta.",},
        {name: "- Datos requeridos (*)."}
    ];    
    const Updatedata = (e) =>{
        if(e.target?.name === 'title')
            dispatch(saveNewProcessData({title: e.target?.value}));
        if(e.name === 'image')
            dispatch(saveNewProcessData({image: e?.base64Complete}));
    }
    const getColor = (color) =>{
        dispatch(saveNewProcessData({backgroundColor: color?.rgb}));
    }    
    const [elements,setElements] = useState({
        title: {
            idelement: "title",  value: newProcess?.title || "",    label: "Ingrese título del proceso *",   pattern:"^([a-zA-Z_][a-zA-Z_ Ññ]*[a-zA-Z_Ññ]){1,20}$",  
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Person/>, 
            style: classes.formControlLogin, handler: Updatedata,
        },
        backgroundColor: {
            idelement: "backgroundColor",  value: newProcess?.backgroundColor || initialColor,    label: "Seleccione color de borde *",   pattern:"",  
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'SketchPickerColor', icon: <Person/>, 
            style: classes.selectColor, disabled: true, getData: getColor,
        },
        image:{
            idelement: "image", value: newProcess?.image, label: "Adjunte image *", base64Complete: '',
            validators: {required: true,  size: "2 MB",}, errorMessages: 'Por favor debe adjuntar lo solicitado', isError:false, elementType:'file',
            disabled:false, name:"image", fileWidth: false, src: '', multiple: false, accept:".png, .jpg, .jpeg, .svg", handler: Updatedata,
        },                        
    });

    const FuncionCrearProceso = (e) => {
        dispatch(updateProcessList([]))
        newArray.push(data)
        const concatArray = processDataList.concat(newArray)
        dispatch(updateProcessList(concatArray))
        props.closeModal()
        Alert.success('Proceso / '+data?.title+" / creado correctamente.")
    }
    const FuncionEditarProceso = () =>{
        dispatch(updateProcessList([]))
        // encontramos el indice del objeto con nombre
        let getProcessId = processDataList.findIndex(obj => obj.title === props?.data?.title);
        if(getProcessId !== -1){
            // si se encuentra el objeto buscado se procede a actualizar el objeto
            processDataList[getProcessId].title = data?.title;
            processDataList[getProcessId].backgroundColor = data?.backgroundColor;
            processDataList[getProcessId].image = data?.image;
        }
        dispatch(updateProcessList(processDataList))
        Alert.success('Proceso / '+data?.title+" / actualizado correctamente.")
        props.closeModal()
    }
    const FuncionProceso = () =>{
        if(props.id === 1) FuncionCrearProceso();
        else if (props.id === 2) FuncionEditarProceso();
    }
    const [buttonList,setButtonList]= useState({
        "login":{"label": props.titleToolbar,"icon": props.iconToolbar,"callback":FuncionProceso, variant: 'outlined', color: "primary", },
        "cancel":{"label":"Cancelar","icon": <Cancel />,"callback":props.closeModal, isCancel: true, variant: "outlined", color: "secondary"},
    });

    return (
        <DialogoPersonalizado 
            open={props.open}
            fullScreen={true}
            closeModal={props.closeModal}
            // actualizarTabla={props.actualizarTabla}
            iconToolbar={props.iconToolbar}
            titleToolbar={props.titleToolbar}
        >
            <div className={classes.containerPrincipalProceso}>
                <div className={classes.containerForm}>
                    <div className={classes.titleProceso}>Complete el formulario para {props.titleToolbar}</div>
                    <Form   elements= {elements}  buttonList={buttonList} description={description} />
                </div>
                <Divider orientation="vertical" flexItem />
                <Divider className={classes.divider}/>
                <div className={classes.containerVisualize}>
                    <div className={classes.titleProceso}>Visualizador</div>
                    <ComponentCard
                        title={newProcess.title || 'Título'} 
                        // label={data}
                        backgroundColor={newProcess.backgroundColor || initialColor}
                        image = {newProcess.image}
                    />
                </div>
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteCrearEditarProceso);