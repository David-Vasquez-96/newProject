import React, { useState } from 'react';
import { Description, Edit, NoteAdd, Replay } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
// COMPONENTES **********************************************
import AppBarComponent from 'page/Home/Body/AppBarPrincipal'
import {useStyles} from './style';
import Title from 'component/TitleWithIcon';
import ComponentCard from './ComponentCard'
import ComponentCardTwo from './ComponentCardTwo'
import BotonElement from 'component/BotonTable'
import ComponenteCrearEditarCarpetas from './CrearEditarCarpetas'
import ComponenteEliminarCarpeta from './EliminarCarpeta'
import { useHistory } from "react-router-dom";
// REDUX ****************************************************
import { useSelector, useDispatch } from 'react-redux';
import {AppBar, Toolbar, Typography } from '@material-ui/core';
import { saveDataNewDocument, saveFolderData } from 'store/reducers/documentosSlice';

const ComponenteDeDocumentos=(props)=> {
    const classes = useStyles(props);
    const history = useHistory();
    const dispatch = useDispatch();
    const documentsList = JSON.parse(JSON.stringify(useSelector( state => state.documentos.documentsList))); 
    const tiposDeUSuario = useSelector( state => state.documentos.tiposDeUSuario);

    const FuncionIRComponenteDeSubCarpetas = (data) =>{
        dispatch(saveFolderData(data))
        history.push("/moduloSubCarpeta", {})
    }
    // funciones para crear carpetas ***************************************************************
    const [openModalDocument, setOpenModalDocument] = useState({open: false, title: '', id: 0})
    const FuncionOpenModalCreateDocument = () =>{
        dispatch(saveDataNewDocument({idCarpeta: 0, backgroundColor: '', image: '', title: '', total: 0}));
        setOpenModalDocument({open: true, title: 'Crear Carpeta', id: 1})
    }
    const FuncionCloseModalCreateDocument = () =>{
        dispatch(saveDataNewDocument({idCarpeta: 0, backgroundColor: '', image: '', title: '', total: 0}));
        setOpenModalDocument({open: false, title: ''})
    }    
    // funciones para editar una carpeta ***********************************************************
    const [editDocument, setEditDocument] = useState({open: false, title: '', getDocument: {}})
    const FuncionOpenModalEditDocument = (data) =>{
        dispatch(saveDataNewDocument({idCarpeta: data?.idCarpeta, title: data?.title, backgroundColor: data?.backgroundColor, image: data?.image, total: data?.total}))
        setEditDocument({open: true, title: 'Editar Documento', id: 2, getDocument: data})
    }
    const FuncionCloseModalEditDocument = () =>{
        dispatch(saveDataNewDocument({idCarpeta: 0, backgroundColor: '', image: '', title: '', total: 0}));
        setEditDocument({open: false, title: '', id: 0, getDocument: {}})
    }
    // funciones para eliminar una carpeta
    const [dataDocumentModalToDelete, setdataDocumentModalToDelete] = useState({open: false, data: {}});
    const FunctionOpenDocumentModalToDelete = (data) =>{
        setdataDocumentModalToDelete({open: true, data: data})
    }
    const FunctionCloseDocumenModalToDelete = () =>{
        setdataDocumentModalToDelete({open: false, data: {}})
    }    
    return (
        <div className={classes.contenedorPrincipal}>
            <AppBarComponent />
            <Title title={'Documentos por Gerencia Corporativa'} icon={<Description />} />
            <div className={classes.listaDeTiposDeUsuarios}>
                <p className={classes.titleUserType} variant="h5" >{'Tipos de Usuarios'}</p>
                <div className={classes.containerCards}>                    
                    {
                        tiposDeUSuario.map((label, index) =>(
                            <ComponentCardTwo 
                                backgroundColor={label?.backgroundColor}
                                image={label?.image}
                                title={label?.title}
                                total={label?.total}
                                key={index}
                            />
                        ))
                    }
                </div>
            </div>
            <div className={classes.listaDeDocumentosPrincipal}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar variant="dense" className={classes.toolbar}>
                        {/* <IconButton edge="start" className={classes.iconButton} color="inherit" aria-label="menu"><Description /></IconButton> */}
                        <Typography variant="h6" className={classes.titleSecondary}>Selecciona una de las carpetas y explora las subcarpetas y documentos que necesitas.</Typography>
                        <div className={classes.containerButtons}>
                            <BotonElement size={'small'} icon={<NoteAdd />} style={classes.buttonSuccess} title="Agregar Carpetar" handleFunction={FuncionOpenModalCreateDocument}/>
                            <BotonElement size={'small'} icon={<Replay />} style={classes.buttonSuccess} title="Actualizar" handleFunction={() => {}}/>
                        </div>                        
                    </Toolbar>
                </AppBar>                
                <div className={classes.containerCards}>
                    {
                        (documentsList.length > 0) ? 
                            documentsList.map((label, index) =>(
                                <ComponentCard 
                                    backgroundColor={label?.backgroundColor}
                                    image={label?.image}
                                    title={label?.title}
                                    total={label?.total}
                                    key={index}
                                    handleClickGoToSubDocument={()=>FuncionIRComponenteDeSubCarpetas(label)}
                                    handleClickEdit={()=>FuncionOpenModalEditDocument(label)}
                                    handleClickDelete={()=>FunctionOpenDocumentModalToDelete(label)}
                                />
                            ))
                        : (
                            <Alert className={classes.alert} severity="warning">Sin registros. Agregue carpetas para visualizar aquí.</Alert>
                        )
                    }
                </div>
            </div>
            {/* componente para crear una carpeta ******************************************* */}
            {
                (openModalDocument.open) ? (
                    <ComponenteCrearEditarCarpetas
                        open = {openModalDocument.open}
                        closeModal = {FuncionCloseModalCreateDocument}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {openModalDocument.title}
                        id = {openModalDocument.id}
                    />
                ):''
            }
            {/* componente para editar una carpeta ******************************************* */}
            {
                (editDocument.open) ? (
                    <ComponenteCrearEditarCarpetas
                        open = {editDocument.open}
                        closeModal = {FuncionCloseModalEditDocument}
                        iconToolbar = {<Edit/>}
                        titleToolbar = {editDocument.title}
                        id = {editDocument.id}
                        data = {editDocument.getDocument}
                    />
                ):''
            }
            {/* componente para eliminar una carpeta ******************************************* */}
            {
                (dataDocumentModalToDelete.open) ? (
                    <ComponenteEliminarCarpeta
                        open = {dataDocumentModalToDelete.open}
                        closeModal = {FunctionCloseDocumenModalToDelete}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {'Eliminar'}
                        data={dataDocumentModalToDelete.data}
                        documentsList={documentsList}
                    />
                ):''
            }             
        </div> 
    )
}
export default (ComponenteDeDocumentos);