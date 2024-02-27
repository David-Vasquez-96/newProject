import React, { useEffect, useState } from 'react';
import { Description, Edit, NoteAdd, Replay } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
// COMPONENTES **********************************************
import AppBarComponent from 'page/Home/Body/AppBarPrincipal'
import {useStyles} from './style';
import Title from 'component/TitleWithIcon';
import ComponentCard from './ComponentCard'
import BotonElement from 'component/BotonTable'
import ComponenteCrearEditarSubCarpetas from './CrearEditarSubCarpetas'
import ComponenteEliminarSubCarpeta from './EliminarSubCarpeta'
// REDUX ****************************************************
import { useSelector, useDispatch } from 'react-redux';
import {AppBar, Toolbar, Typography } from '@material-ui/core';
import { saveDataNewSubDocument, setFolderInformation } from 'store/reducers/documentosSlice';

const ComponenteDeSubCarpetas=(props)=> {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const subDocumentsList = JSON.parse(JSON.stringify(useSelector( state => state.documentos.subDocumentsList))); 
    const folderData = JSON.parse(JSON.stringify(useSelector( state => state.documentos.folderData)));
    const [data, setData] = useState([]) 
    const history = useHistory();
    const objetoEstaVacio = () => {
        for (let key in folderData) {
            if (folderData.hasOwnProperty(key)) {                
                return false; //si tiene un objeto devolvera un false
            }
        }		 
        return history.push("/moduloDocumentos", {}) //si el objeto esta vacio devolvera un true		
    }
    const FilterData = () =>{
        const current = subDocumentsList?.filter( ({idCarpeta}) => Number(idCarpeta) === Number(folderData?.idCarpeta));
        if(current?.length > 0) return setData(current);
        else return setData([]);
    }
    const FuncionIRComponenteDeArchivos = (data) =>{
        let newData = {
            carpeta: folderData,
            subCarpeta: data
        }
        dispatch(setFolderInformation(newData))
        history.push("/moduloArchivos", {})
    }    
    // funciones para crear sub carpetas ***************************************************************
    const [openModalSubDocument, setOpenModalSubDocument] = useState({open: false, title: '', id: 0})
    const FuncionOpenModalCreateSubDocument = () =>{
        dispatch(saveDataNewSubDocument({idCarpeta: 0, idSubCarpeta:0, backgroundColor: '', image: '', title: '', total: 0}));
        setOpenModalSubDocument({open: true, title: 'Crear Sub-Carpeta', id: 1})
    }
    const FuncionCloseModalCreateSubDocument = () =>{
        dispatch(saveDataNewSubDocument({idCarpeta: 0, idSubCarpeta:0, backgroundColor: '', image: '', title: '', total: 0}));
        setOpenModalSubDocument({open: false, title: ''})
    }    
    // funciones para editar una sub carpeta ***********************************************************
    const [editSubDocument, setEditSubDocument] = useState({open: false, title: '', getSubDocument: {}})
    const FuncionOpenModalEditSubDocument = (data) =>{
        dispatch(saveDataNewSubDocument({title: data?.title, backgroundColor: data?.backgroundColor, image: data?.image, total: data?.total}))
        setEditSubDocument({open: true, title: 'Editar Sub-Carpeta', id: 2, getSubDocument: data})
    }
    const FuncionCloseModalEditSubDocument = () =>{
        dispatch(saveDataNewSubDocument({idCarpeta: 0, idSubCarpeta:0, backgroundColor: '', image: '', title: '', total: 0}));
        setEditSubDocument({open: false, title: '', id: 0, getSubDocument: {}})
    }
    // funciones para eliminar una sub carpeta
    const [dataSubDocumentModalToDelete, setdataSubDocumentModalToDelete] = useState({open: false, data: {}});
    const FunctionOpenSubDocumentModalToDelete = (data) =>{
        setdataSubDocumentModalToDelete({open: true, data: data})
    }
    const FunctionCloseSubDocumenModalToDelete = () =>{
        setdataSubDocumentModalToDelete({open: false, data: {}})
    }    
    useEffect(()=>{
        objetoEstaVacio();
    }, [])
    useEffect(()=>{
        FilterData();
    }, [openModalSubDocument.open, editSubDocument.open, dataSubDocumentModalToDelete.open])

    return (
        <div className={classes.contenedorPrincipal}>
            <AppBarComponent />
            <Title title={'Documentos por Gerencia > Gerencia de '+ folderData?.title} icon={<Description />} />
            {/* <Title title={'Documentos por Gerencia Corporativa'} icon={<Description />} /> */}
            <div className={classes.listaDeDocumentosPrincipal}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar variant="dense" className={classes.toolbar}>
                        {/* <IconButton edge="start" className={classes.iconButton} color="inherit" aria-label="menu"><Description /></IconButton> */}
                        <Typography variant="h6" className={classes.titleSecondary}>Selecciona una de las sub-carpetas y explora los documentos que necesitas.</Typography>
                        <div className={classes.containerButtons}>
                            <BotonElement size={'small'} icon={<NoteAdd />} style={classes.buttonSuccess} title="Agregar Sub-Carpeta" handleFunction={FuncionOpenModalCreateSubDocument}/>
                            <BotonElement size={'small'} icon={<Replay />} style={classes.buttonSuccess} title="Actualizar" handleFunction={() => {}}/>
                        </div>                        
                    </Toolbar>
                </AppBar>                
                <div className={classes.containerCards}>                    
                    {
                        (data.length > 0) ?
                            data.map((label, index) =>(
                                <ComponentCard 
                                    backgroundColor={label?.backgroundColor}
                                    image={label?.image}
                                    title={label?.title}
                                    total={label?.total}
                                    key={index}
                                    handleClickGoToArchives={()=>FuncionIRComponenteDeArchivos(label)}
                                    handleClickEdit={()=>FuncionOpenModalEditSubDocument(label)}
                                    handleClickDelete={()=>FunctionOpenSubDocumentModalToDelete(label)}
                                />
                            ))
                        : (
                            <Alert className={classes.alert} severity="warning">Sin registros. Agregue sub-carpetas para visualizar aquí.</Alert>
                        )
                    }
                </div>
            </div>
            {/* componente para crear una sub carpeta ******************************************* */}
            {
                (openModalSubDocument.open) ? (
                    <ComponenteCrearEditarSubCarpetas
                        open = {openModalSubDocument.open}
                        closeModal = {FuncionCloseModalCreateSubDocument}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {openModalSubDocument.title}
                        id = {openModalSubDocument.id}
                        folderData = {folderData}
                        listaFiltrada = {data}
                    />
                ):''
            }
            {/* componente para editar una sub carpeta ******************************************* */}
            {
                (editSubDocument.open) ? (
                    <ComponenteCrearEditarSubCarpetas
                        open = {editSubDocument.open}
                        closeModal = {FuncionCloseModalEditSubDocument}
                        iconToolbar = {<Edit/>}
                        titleToolbar = {editSubDocument.title}
                        id = {editSubDocument.id}
                        data = {editSubDocument.getSubDocument}
                    />
                ):''
            }
            {/* componente para eliminar una carpeta ******************************************* */}
            {
                (dataSubDocumentModalToDelete.open) ? (
                    <ComponenteEliminarSubCarpeta
                        open = {dataSubDocumentModalToDelete.open}
                        closeModal = {FunctionCloseSubDocumenModalToDelete}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {'Eliminar'}
                        data={dataSubDocumentModalToDelete.data}
                        subDocumentsList={subDocumentsList}
                    />
                ):''
            }
        </div> 
    )
}
export default (ComponenteDeSubCarpetas);