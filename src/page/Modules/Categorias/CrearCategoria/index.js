import React, { useState } from 'react';
import {useStyles} from './style';
import AppBar from 'page/Home/Body/AppBarPrincipal'
import Title from 'component/TitleWithIcon';
import { DeleteForever, Description, Edit, Mail, NavigateNext, NoteAdd, RestorePage, Visibility } from '@material-ui/icons';
import Table from 'component/Table';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import BotonElement from 'component/BotonTable'; 
import { ButtonGroup, Card } from '@material-ui/core';
import ComponentCircle from 'page/Home/Body/Documents/ComponentCircle'
import Form from 'component/Form/FormTwoColumns';
import Person from 'component/Search/Base';

const ComponenteCategorias=(props)=> {
    const classes = useStyles(props);
    let description = [
        {name: "- Antes de continuar, revise que la información que ingresó esté correcta.",},
        {name: "- Datos requeridos (*)."}
    ];    
    const [data, setData] = useState({order: 1, borderColor: '#FDBD00', icon: 'assets/PerfilUsuario.png', title: 'Auditoría', titleColor: '#034DA1'})
    const [newData, setNewData] = useState({
        titulo: 'Título',
    })
    const Updatedata = (e) =>{
        console.log('newData: ', e.target.value)
        setNewData({
            ... newData, 
            [e.target.name] : [e.target.value]
        })
    }
    const [elements,setElements] = useState({
            tituloCategoria: {    
                idelement: "tituloCategoria",  value: "",    label: "Ingrese título de la categoría *",   pattern:"^([a-zA-Z_][a-zA-Z_ Ññ]*[a-zA-Z_Ññ]){1,20}$",  
                validators: ['required'], errorMessages:['Información requerida'],  isError:false, elementType:'inputOutlined', icon: <Person/>, 
                style: classes.formControlLogin, handler: Updatedata,
            },
            image:{
                idelement: "image", value: '', label: "Adjunte image *",
                validators: {required: true,  size: "2 MB",}, errorMessages: 'Por favor debe adjuntar lo solicitado', isError:false, elementType:'file',
                disabled:false, name:"image", fileWidth: true, src: '', multiple: false, accept:".jpeg, .jpg, .png, .svg",
            },                        
    });    
    const [buttonList,setButtonList]= useState({
        "backHome":{"label":"Crear","icon": props.iconToolbar,"callback":()=>{}, isCancel: true, variant: "outlined", color: "primary", "loading":false,"size":"medium", "background":"linear-gradient(130deg, rgb(6, 107, 189) 30%, rgb(30, 136, 229) 90%) repeat scroll 0% 0% ",},
        "next":{"label":"Cancelar","icon": <NavigateNext />,"callback":()=>{}, variant: "outlined", color: "primary", "loading":false,"size":"medium", "background":"linear-gradient(130deg, rgb(6, 107, 189) 30%, rgb(30, 136, 229) 90%) repeat scroll 0% 0% ",},   
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
                <Card className={classes.containerForm}>
                    <div className={classes.titleCategory}>Complete el formulario para Crear Categoría</div>
                    <ComponentCircle 
                        title={elements.tituloCategoria.value} 
                        label={data}
                    />
                    <Form   elements= {elements}  buttonList={buttonList} description={description}/>
                </Card>
                {/* <Card className={classes.containerVisualize}>
                    <div className={classes.titleCategory}>{newData.titulo}</div>
                    <div className={classes.titleCategory}>Visualizador</div>
                </Card> */}
            </div>

        </DialogoPersonalizado>
    )
}
export default (ComponenteCategorias);