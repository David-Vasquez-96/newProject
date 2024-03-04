import React, { useState } from 'react';
import { Cancel, Person} from '@material-ui/icons';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import ComponentCircle from 'page/Home/Body/Documents/ComponentCircle'
import Form from 'component/Form/FormTwoColumns';
import {Divider } from '@material-ui/core';
import Alert from 'react-s-alert';
// REDUX **************************
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveDataNewCategory, listCategory } from 'store/reducers/categoriaSlide';

let data = {}

const ComponenteCategorias=(props)=> {   
    const classes = useStyles();
    const initialColor ={r: '0', g: '0', b: '0',a: '1',};
    const newArray = []
    const dispatch = useDispatch();
    const newCategory = JSON.parse(JSON.stringify(useSelector(state => state.categoria.newCategory)));
    const categoryList = JSON.parse(JSON.stringify(useSelector( state => state.categoria.categoryList))); 
    data = newCategory;
    let description = [
        {name: "- Antes de continuar, revise que la información que ingresó esté correcta.",},
        {name: "- Datos requeridos (*)."}
    ];    
    const Updatedata = (e) =>{
        if(e.target?.name === 'title')
            dispatch(saveDataNewCategory({name: e.target?.value}));
        if(e.name === 'image')
            dispatch(saveDataNewCategory({icon: e?.base64Complete}));
    }
    const getColor = (color) =>{
        dispatch(saveDataNewCategory({borderColor: color?.rgb}));
    }    
    const [elements,setElements] = useState({
        title: {
            idelement: "title",  value: newCategory?.name || "",    label: "Ingrese título de la categoría *",   pattern:"^([a-zA-Z_][a-zA-Z_ Ññ]*[a-zA-Z_Ññ]){1,20}$",  
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Person/>, 
            style: classes.formControlLogin, handler: Updatedata,
        },
        borderColor: {
            idelement: "borderColor",  value: newCategory?.borderColor || initialColor,    label: "Seleccione color de borde *",   pattern:"",  
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'SketchPickerColor', icon: <Person/>, 
            style: classes.selectColor, disabled: true, getData: getColor,
        },
        image:{
            idelement: "image", value: newCategory?.icon, label: "Adjunte image *", base64Complete: '',
            validators: {required: true,  size: "2 MB",}, errorMessages: 'Por favor debe adjuntar lo solicitado', isError:false, elementType:'file',
            disabled:false, name:"image", fileWidth: false, src: '', multiple: false, accept:".png, .jpg, .jpeg, .svg", handler: Updatedata,
        },                        
    });

    const FuncionCrearCategoria = (e) => {
        dispatch(listCategory([]))
        if(data?.borderColor === '') data.borderColor = initialColor;
        const newTotalList = categoryList.length + 1;
        data.id = newTotalList;
        newArray.push(data)
        const concatArray = categoryList.concat(newArray)
        dispatch(listCategory(concatArray))
        props.closeModal()
        Alert.success('Categoría '+data?.name+" creado correctamente.")
    }
    const FuncionEditarCategoria = () =>{
        dispatch(listCategory([]))
        // encontramos el indice del objeto con nombre
        let getCategoryId = categoryList.findIndex(obj => obj.name === props?.data?.name);
        if(getCategoryId !== -1){
            // si se encuentra el objeto buscado se procede a actualizar el objeto
            categoryList[getCategoryId].name = data?.name;
            categoryList[getCategoryId].borderColor = data?.borderColor;
            categoryList[getCategoryId].icon = data?.icon;
        }
        dispatch(listCategory(categoryList))
        Alert.success('Categoría '+data?.name+" actualizado correctamente.")
        props.closeModal()
    }
    const FuncionCategoria = () =>{
        if(props.id === 1) FuncionCrearCategoria();
        else if (props.id === 2) FuncionEditarCategoria();
    }
    const [buttonList,setButtonList]= useState({
        "login":{"label": props.titleToolbar,"icon": props.iconToolbar,"callback":FuncionCategoria, variant: 'outlined', color: "primary", },
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
            <div className={classes.containerPrincipalCategoria}>
                <div className={classes.containerForm}>
                    <div className={classes.titleCategory}>Complete el formulario para {props.titleToolbar}</div>
                    <Form   elements= {elements}  buttonList={buttonList} description={description} />
                </div>
                <Divider orientation="vertical" flexItem />
                <Divider className={classes.divider}/>
                <div className={classes.containerVisualize}>
                    <div className={classes.titleCategory}>Visualizador</div>
                    <ComponentCircle 
                        title={newCategory.name || 'Título'} 
                        // label={data}
                        borderColor={newCategory.borderColor || initialColor}
                        image = {newCategory.icon}
                    />
                </div>
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteCategorias);