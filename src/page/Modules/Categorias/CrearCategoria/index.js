import React, { useState } from 'react';
import { Cancel, Person} from '@material-ui/icons';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import ComponentCircle from 'page/Home/Body/Documents/ComponentCircle'
import Form from 'component/Form/FormTwoColumns';
import SketchPicker from './SketchPicker'
const ComponenteCategorias=(props)=> {   
    const classes = useStyles();
    const [color, setColor] = useState({displayColorPicker: false, color: {r:'241', g:'112', b:'19', a:'1'}});
    let description = [
        {name: "- Antes de continuar, revise que la información que ingresó esté correcta.",},
        {name: "- Datos requeridos (*)."}
    ];    
    const [data, setData] = useState({title: 'Título', borderColor: '#FDBD00', image: 'assets/PerfilUsuario.png', });
    const Updatedata = (e) =>{
        console.log('datos updatedata: ', e.target.value)
        setData({
            ... data, 
            [e.target.name] : [e.target.value]
        })
    }
    const [elements,setElements] = useState({
        title: {
                idelement: "title",  value: "",    label: "Ingrese título de la categoría *",   pattern:"^([a-zA-Z_][a-zA-Z_ Ññ]*[a-zA-Z_Ññ]){1,20}$",  
                validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Person/>, 
                style: classes.formControlLogin, handler: Updatedata,
            },
            borderColor: {
                idelement: "borderColor",  value: "",    label: "Ingrese color de borde *",   pattern:"",  
                validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Person/>, 
                style: classes.formControlLogin, disabled: true
            },
            image:{
                idelement: "image", value: '', label: "Adjunte image *",
                validators: {required: true,  size: "2 MB",}, errorMessages: 'Por favor debe adjuntar lo solicitado', isError:false, elementType:'file',
                disabled:false, name:"image", fileWidth: false, src: '', multiple: false, accept:".jpeg, .jpg, .png, .svg", handler: Updatedata,
            },                        
    });

    const FuncionCrearCategoria = () => {
        let data = {
            title: elements.title.value,
            borderColor: elements.borderColor.value,
            image: elements.image.value
        }
        console.log('datos: ', data)
    }
    const [buttonList,setButtonList]= useState({
        "crear":{"label":"Crear","icon": props.iconToolbar,"callback": FuncionCrearCategoria, variant: "outlined", color: "primary", },
        "cancel":{"label":"Cancelar","icon": <Cancel />,"callback":props.closeModal, isCancel: true, variant: "outlined", color: "secondary"},
    });

    const getColor = (color) =>{
        let newElements = Object.assign({}, elements);
        newElements.borderColor.value = color?.hex
        setElements(newElements);

    }
    return (
        <DialogoPersonalizado 
            open={props.open}
            fullScreen={true}
            closeModal={props.closeModal}
            // actualizarTabla={props.actualizarTabla}
            iconToolbar={props.iconToolbar}
            titleToolbar={props.titleToolbar}
        >
            <div className={classes.containerPrincipalCategoria}>
                <div className={classes.containerForm}>
                    <div className={classes.titleCategory}>Complete el formulario para Crear Categoría</div>
                    <SketchPicker getColor={getColor}/>
                    <Form   elements= {elements}  buttonList={buttonList} description={description}/>
                </div>
                <div className={classes.containerVisualize}>
                    <div className={classes.titleCategory}>{elements.image.value}</div>
                    <div className={classes.titleCategory}>Visualizador</div>
                    <ComponentCircle 
                        title={elements.title.value} 
                        label={data}
                        borderColor={elements.borderColor.value}
                        image = {elements.image.value}
                    />
                </div>
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteCategorias);