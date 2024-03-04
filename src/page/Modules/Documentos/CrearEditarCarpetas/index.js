import React, { useState } from 'react';
import { Cancel, Person} from '@material-ui/icons';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import ComponentCard from '../ComponentCard'
import Form from 'component/Form/FormTwoColumns';
import { Divider } from '@material-ui/core';
import Alert from 'react-s-alert';
// REDUX **************************
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveDataNewDocument, listDocuments } from 'store/reducers/documentosSlice';

let data = {}

const ComponenteCrearEditarCarpetas=(props)=> {   
    const classes = useStyles();
    const initialColor ={r: '0', g: '0', b: '0',a: '1',};
    const newArray = []
    const dispatch = useDispatch();
    const newDocument = JSON.parse(JSON.stringify(useSelector( state => state.documentos.newDocument))); 
    const documentsList = JSON.parse(JSON.stringify(useSelector( state => state.documentos.documentsList))); 
    data = newDocument;
    let description = [
        {name: "- Antes de continuar, revise que la información que ingresó esté correcta.",},
        {name: "- Datos requeridos (*)."}
    ];    
    const Updatedata = (e) =>{
        if(e.target?.name === 'title')
            dispatch(saveDataNewDocument({title: e.target?.value}));
        if(e.name === 'image')
            dispatch(saveDataNewDocument({image: e?.base64Complete}));
    }
    const getColor = (color) =>{
        dispatch(saveDataNewDocument({backgroundColor: color?.rgb}));
    }    
    const [elements,setElements] = useState({
        title: {
            idelement: "title",  value: newDocument?.title || "",    label: "Ingrese título de la carpeta *",   pattern:"^([a-zA-Z_][a-zA-Z_ Ññ]*[a-zA-Z_Ññ]){1,20}$",  
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Person/>, 
            style: classes.formControlLogin, handler: Updatedata,
        },
        backgroundColor: {
            idelement: "backgroundColor",  value: newDocument?.backgroundColor || initialColor, label: "Seleccione color de fondo *",   pattern:"",  
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'SketchPickerColor', icon: <Person/>, 
            style: classes.selectColor, disabled: true, getData: getColor,
        },
        image:{
            idelement: "image", value: newDocument?.image, label: "Adjunte image *", base64Complete: '',
            validators: {required: true,  size: "2 MB",}, errorMessages: 'Por favor debe adjuntar lo solicitado', isError:false, elementType:'file',
            disabled:false, name:"image", fileWidth: false, src: '', multiple: false, accept:".png, .jpg, .jpeg, .svg", handler: Updatedata,
        },                        
    });

    const FuncionCrearCarpeta = (e) => {
        dispatch(listDocuments([]))
        if(data?.backgroundColor === '') data.backgroundColor = initialColor;
        const newIdCarpeta = documentsList.length + 1;
        data.idCarpeta = newIdCarpeta;
        newArray.push(data)
        const concatArray = documentsList.concat(newArray)
        dispatch(listDocuments(concatArray))        
        props.closeModal()
        Alert.success('Carpeta '+data?.title+" creado correctamente.")
    }
    const FuncionEditarCarpeta = () =>{
        dispatch(listDocuments([]))
        // encontramos el indice del objeto con nombre
        
        let getDocumentId = documentsList.findIndex(obj => obj.title === props?.data?.title);
        if(getDocumentId !== -1){
            // si se encuentra el objeto buscado se procede a actualizar el objeto
            documentsList[getDocumentId].title = data?.title;
            documentsList[getDocumentId].backgroundColor = data?.backgroundColor;
            documentsList[getDocumentId].image = data?.image;
        }
        dispatch(listDocuments(documentsList))
        Alert.success('Carpeta '+data?.title+" actualizado correctamente.")
        props.closeModal()
    }
    const FuncionCarpetas = () =>{
        if(props.id === 1) FuncionCrearCarpeta();
        else if (props.id === 2) FuncionEditarCarpeta();
    }
    const [buttonList,setButtonList]= useState({
        "login":{"label": props.titleToolbar,"icon": props.iconToolbar,"callback":FuncionCarpetas, variant: 'outlined', color: "primary", },
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
                        title={newDocument.title || 'Título'} 
                        backgroundColor={newDocument?.backgroundColor || initialColor}
                        image={newDocument?.image}
                        total={newDocument?.total}
                        key={0}
                        
                    />
                </div>
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteCrearEditarCarpetas);