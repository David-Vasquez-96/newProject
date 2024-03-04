import React, { useState } from 'react';
import { Cancel, Person} from '@material-ui/icons';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import ComponentCard from '../../../Documentos/ComponentCard'
import Form from 'component/Form/FormTwoColumns';
import { Divider } from '@material-ui/core';
import Alert from 'react-s-alert';
// REDUX **************************
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveDataNewSubDocument, listSubDocuments } from 'store/reducers/documentosSlice';

let data = {}

const ComponenteCrearEditarSubCarpetas=(props)=> {   
    const classes = useStyles();
    const initialColor ={r: '0', g: '0', b: '0',a: '1',};
    const newArray = []
    const dispatch = useDispatch();
    const newSubDocument = JSON.parse(JSON.stringify(useSelector( state => state.documentos.newSubDocument))); 
    const subDocumentsList = JSON.parse(JSON.stringify(useSelector( state => state.documentos.subDocumentsList))); 
    data = newSubDocument;
    let description = [
        {name: "- Antes de continuar, revise que la información que ingresó esté correcta.",},
        {name: "- Datos requeridos (*)."}
    ];    
    const Updatedata = (e) =>{
        if(e.target?.name === 'title')
            dispatch(saveDataNewSubDocument({title: e.target?.value}));
        if(e.name === 'image')
            dispatch(saveDataNewSubDocument({image: e?.base64Complete}));
    }
    const getColor = (color) =>{
        dispatch(saveDataNewSubDocument({backgroundColor: color?.rgb}));
    }    
    const [elements,setElements] = useState({
        title: {
            idelement: "title",  value: newSubDocument?.title || "",    label: "Ingrese título de la sub-carpeta *",   pattern:"^([a-zA-Z_][a-zA-Z_ Ññ]*[a-zA-Z_Ññ]){1,20}$",  
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Person/>, 
            style: classes.formControlLogin, handler: Updatedata,
        },
        backgroundColor: {
            idelement: "backgroundColor",  value: newSubDocument?.backgroundColor || initialColor, label: "Seleccione color de fondo *",   pattern:"",  
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'SketchPickerColor', icon: <Person/>, 
            style: classes.selectColor, disabled: true, getData: getColor,
        },
        image:{
            idelement: "image", value: newSubDocument?.image, label: "Adjunte image *", base64Complete: '',
            validators: {required: true,  size: "2 MB",}, errorMessages: 'Por favor debe adjuntar lo solicitado', isError:false, elementType:'file',
            disabled:false, name:"image", fileWidth: false, src: '', multiple: false, accept:".png, .jpg, .jpeg, .svg", handler: Updatedata,
        },                        
    });

    const FuncionCrearSubCarpeta = (e) => {
        dispatch(listSubDocuments([]))
        if(data?.backgroundColor === '') data.backgroundColor = initialColor;
        data.idCarpeta = props?.folderData?.idCarpeta
        data.idSubCarpeta = props?.listaFiltrada.length+1;
        newArray.push(data)
        const concatArray = subDocumentsList.concat(newArray)
        dispatch(listSubDocuments(concatArray))        
        props.closeModal()
        Alert.success('Sub-Carpeta '+data?.title+" creado correctamente.")
    }
    const FuncionEditarSubCarpeta = () =>{
        dispatch(listSubDocuments([]))
        // encontramos el indice del objeto con nombre        
        let getSubDocumentId = subDocumentsList.findIndex(obj => obj.idCarpeta === props?.data?.idCarpeta && obj.idSubCarpeta === props?.data?.idSubCarpeta);
        if(getSubDocumentId !== -1){
            // si se encuentra el objeto buscado se procede a actualizar el objeto
            subDocumentsList[getSubDocumentId].title = data?.title;
            subDocumentsList[getSubDocumentId].backgroundColor = data?.backgroundColor;
            subDocumentsList[getSubDocumentId].image = data?.image;
        }
        dispatch(listSubDocuments(subDocumentsList))
        Alert.success('Sub-Carpeta '+data?.title+" actualizado correctamente.")
        props.closeModal()
    }
    const FuncionSubCarpetas = () =>{
        if(props.id === 1) FuncionCrearSubCarpeta();
        else if (props.id === 2) FuncionEditarSubCarpeta();
    }
    const [buttonList,setButtonList]= useState({
        "login":{"label": props.titleToolbar,"icon": props.iconToolbar,"callback":FuncionSubCarpetas, variant: 'outlined', color: "primary", },
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
            <div className={classes.containerPrincipalDocuments}>
                <div className={classes.containerForm}>
                    <div className={classes.titleDocument}>Complete el formulario para {props.titleToolbar}</div>
                    <Form   elements= {elements}  buttonList={buttonList} description={description} />
                </div>
                <Divider orientation="vertical" flexItem />
                <Divider className={classes.divider}/>
                <div className={classes.containerVisualize}>
                    <div className={classes.titleDocument}>Visualizador</div>
                    <ComponentCard                         
                        title={newSubDocument.title || 'Título'} 
                        backgroundColor={newSubDocument?.backgroundColor || initialColor}
                        image={newSubDocument?.image}
                        total={newSubDocument?.total}
                        key={0}
                        
                    />
                </div>
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteCrearEditarSubCarpetas);