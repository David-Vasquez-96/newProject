import React, { useEffect, useState } from 'react';
import { Description, Edit, NoteAdd, Replay } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
// COMPONENTES **********************************************
import AppBarComponent from 'page/Home/Body/AppBarPrincipal'
import {useStyles} from './style';
import Title from 'component/TitleWithIcon';
import ComponentCard from '../Documentos/ComponentCard'
import BotonElement from 'component/BotonTable'
import ComponenteCrearEditarCarpetas from './CrearEditarSubCarpetas'
// import ComponenteEliminarCarpeta from './EliminarCarpeta'
// REDUX ****************************************************
import { useSelector, useDispatch } from 'react-redux';
import {AppBar, Toolbar, Typography } from '@material-ui/core';
import { saveDataNewDocument } from 'store/reducers/documentosSlice';

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
    // funciones para crear carpetas ***************************************************************
    const [openModalSubDocument, setOpenModalSubDocument] = useState({open: false, title: '', id: 0})
    const FuncionOpenModalCreateSubDocument = () =>{
        dispatch(saveDataNewDocument({backgroundColor: '', image: '', title: '', total: 0}));
        setOpenModalSubDocument({open: true, title: 'Crear Sub-Carpeta', id: 1})
    }
    const FuncionCloseModalCreateSubDocument = () =>{
        dispatch(saveDataNewDocument({backgroundColor: '', image: '', title: '', total: 0}));
        setOpenModalSubDocument({open: false, title: ''})
    }    
    // funciones para editar una carpeta ***********************************************************
    // const [editDocument, setEditDocument] = useState({open: false, title: '', getDocument: {}})
    // const FuncionOpenModalEditDocument = (data) =>{
    //     dispatch(saveDataNewDocument({title: data?.title, backgroundColor: data?.backgroundColor, image: data?.image, total: data?.total}))
    //     setEditDocument({open: true, title: 'Editar Documento', id: 2, getDocument: data})
    // }
    // const FuncionCloseModalEditDocument = () =>{
    //     dispatch(saveDataNewDocument({backgroundColor: '', image: '', title: '', total: 0}));
    //     setEditDocument({open: false, title: '', id: 0, getDocument: {}})
    // }
    // funciones para eliminar una carpeta
    // const [dataDocumentModalToDelete, setdataDocumentModalToDelete] = useState({open: false, data: {}});
    // const FunctionOpenDocumentModalToDelete = (data) =>{
    //     setdataDocumentModalToDelete({open: true, data: data})
    // }
    // const FunctionCloseDocumenModalToDelete = () =>{
    //     setdataDocumentModalToDelete({open: false, data: {}})
    // }    
    useEffect(()=>{
        objetoEstaVacio();
    }, [])
    useEffect(()=>{
        FilterData();
    }, [openModalSubDocument.open])

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
                                    // handleClickGoToSubDocument={FuncionIRComponenteDeSubCarpetas}
                                    // handleClickEdit={()=>FuncionOpenModalEditDocument(label)}
                                    // handleClickDelete={()=>FunctionOpenDocumentModalToDelete(label)}
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
                    <ComponenteCrearEditarCarpetas
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
            {/* componente para editar una carpeta ******************************************* */}
            {/* {
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
            } */}
            {/* componente para eliminar una carpeta ******************************************* */}
            {/* {
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
            }              */}
        </div> 
    )
}
export default (ComponenteDeSubCarpetas);