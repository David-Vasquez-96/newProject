import React, { useState } from 'react';
import { Cancel, Person} from '@material-ui/icons';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import ComponentCircle from 'page/Home/Body/Documents/ComponentCircle'
import Form from 'component/Form/FormTwoColumns';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveDataNewCategory } from 'store/reducers/categoriaSlide';
import { Button } from '@material-ui/core';

let data = {}
// let listCategory = []
const ComponenteCategorias=(props)=> {   
    const classes = useStyles();
    const dispatch = useDispatch();
    const newCategory = useSelector(state => state.categoria.newCategory);
    const listCategory = useSelector(state => state.categoria.categoryList)
    console.log('guardando nueva categoria 1111: ', newCategory)
    data = newCategory;
    let description = [
        {name: "- Antes de continuar, revise que la información que ingresó esté correcta.",},
        {name: "- Datos requeridos (*)."}
    ];    
    // const [data, setData] = useState({title: 'Título', borderColor: '#FDBD00', image: 'assets/PerfilUsuario.png', });
    const Updatedata = (e) =>{
        if(e.target?.name === 'title')
            dispatch(saveDataNewCategory({title: e.target?.value}));
        if(e.name === 'image')
            dispatch(saveDataNewCategory({icon: e?.base64Complete}));
    }
    const getColor = (color) =>{
        dispatch(saveDataNewCategory({borderColor: color?.rgb}));
    }    
    const [elements,setElements] = useState({
        title: {
                idelement: "title",  value: "",    label: "Ingrese título de la categoría *",   pattern:"^([a-zA-Z_][a-zA-Z_ Ññ]*[a-zA-Z_Ññ]){1,20}$",  
                validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Person/>, 
                style: classes.formControlLogin, handler: Updatedata,
            },
            borderColor: {
                idelement: "borderColor",  value: newCategory.borderColor,    label: "Ingrese color de borde *",   pattern:"",  
                validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'SketchPickerColor', icon: <Person/>, 
                style: classes.formControlLogin, disabled: true, getData: getColor,
            },
            image:{
                idelement: "image", value: '', label: "Adjunte image *", base64Complete: '',
                validators: {required: true,  size: "2 MB",}, errorMessages: 'Por favor debe adjuntar lo solicitado', isError:false, elementType:'file',
                disabled:false, name:"image", fileWidth: false, src: '', multiple: false, accept:".png, .jpg, .jpeg", handler: Updatedata,
            },                        
    });

    const FuncionCrearCategoria = (e) => {
        console.log('guardando nueva categoria: 1 ', listCategory)
        console.log('guardando nueva categoria: 2 ', data)
        console.log('guardando nueva categoria: 2 ', newCategory)
    }
    const [buttonList,setButtonList]= useState({
        "login":{"label":"Crear","icon": <Cancel />,"callback":FuncionCrearCategoria, color: "primary", },
        "cancel":{"label":"Cancelar","icon": <Cancel />,"callback":()=>{}, isCancel: true, variant: "outlined", color: "secondary"},
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
            <div className={classes.containerPrincipalCategoria}>
                <div className={classes.containerForm}>
                    <div className={classes.titleCategory}>Complete el formulario para Crear Categoría</div>
                    <Form   elements= {elements}  buttonList={buttonList} description={description} />
                    <Button onClick={FuncionCrearCategoria}>Botton nuevo</Button>
                </div>
                <div className={classes.containerVisualize}>
                    <div className={classes.titleCategory}>Visualizador</div>
                    <ComponentCircle 
                        title={newCategory.title} 
                        // label={data}
                        borderColor={newCategory.borderColor}
                        image = {newCategory.icon}
                    />
                </div>
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteCategorias);