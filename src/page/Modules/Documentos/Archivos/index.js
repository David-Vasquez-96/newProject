import React, { useEffect, useState } from 'react';
import { DeleteForever, Description, Edit, NoteAdd, Replay, RestorePage, Visibility } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
// COMPONENTES **********************************************
import AppBarComponent from 'page/Home/Body/AppBarPrincipal'
import {useStyles} from './style';
import Title from 'component/TitleWithIcon';
import Table from 'component/Table';
// import ComponentCard from './ComponentCard'
// import ComponentCardTwo from './ComponentCardTwo'
import BotonElement from 'component/BotonTable'
import ComponenteCrearEditarArchivo from './AgregarEditarArchivo'
import ComponenteVisualizarArchivo from './VisualizarArchivos'
// import ComponenteEliminarCarpeta from './EliminarCarpeta'
import { useHistory } from "react-router-dom";
// REDUX ****************************************************
import { useSelector, useDispatch } from 'react-redux';
import {AppBar, ButtonGroup, Toolbar, Typography } from '@material-ui/core';
import { saveDataNewDocument, saveFolderData } from 'store/reducers/documentosSlice';

const ComponenteDeArchivos=(props)=> {
    const classes = useStyles(props);
    const history = useHistory();
    const dispatch = useDispatch();
    const filesList = JSON.parse(JSON.stringify(useSelector( state => state.documentos.filesList))); 
    const datosDeDocumento = useSelector( state => state.documentos.datosDeDocumento);
    const objetoEstaVacio = () => {
        for (let key in datosDeDocumento) {
            if (datosDeDocumento.hasOwnProperty(key)) {                
                return false; //si tiene un objeto devolvera un false
            }
        }		 
        // return history.push("/moduloDocumentos", {}) //si el objeto esta vacio devolvera un true		
    }    
    // const FilterData = () =>{
    //     const current = subDocumentsList?.filter( ({idCarpeta}) => Number(idCarpeta) === Number(folderData?.idCarpeta));
    //     if(current?.length > 0) return setData(current);
    //     else return setData([]);
    // }    
    const formato = {
        1: 'PDF',
        2: 'EXCEL',
        3: 'WORD',
        4: 'IMAGEN',
        5: 'VIDEO',
    }
    const [header] = useState([
        { title: 'ID del Archivo', field: 'id', cellStyle: { width: '200px'}},
        { title: 'Formato', field: 'type', filtering: true, 
            lookup: formato,
            render: rowData=>
                (rowData?.formato === '.pdf') ?
                    <img className={classes.mobileIcon} src={'assets/pdf2.png'} />
                : (rowData?.formato === '.xlsx') ?
                    <img className={classes.mobileIcon} src={'assets/excel.png'} />
                : (rowData?.formato === '.docx') ?
                    <img className={classes.mobileIcon} src={'assets/word.png'} />
                : (rowData?.formato === '.png') ?
                    <img className={classes.mobileIcon} src={'assets/imagen.png'} />
                : (rowData?.formato === '.mp4') ?
                    <img className={classes.mobileIcon} src={'assets/video.png'} />
                : null
        },
        { title: 'Nombre del Documento', field: 'name', cellStyle: { width: '200px'}},
        { title: 'Versión', field: 'version', cellStyle: { width: '200px'}},
        { title: 'Añadido por', field: 'usuario', cellStyle: { width: '200px'}},
        { title: 'Fecha de Publicación', field: 'publicacion', cellStyle: { width: '200px'}},
        { title: 'Acciones', field: '', filtering: false,
            render: rowData=>
                <div>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <BotonElement icon={<Visibility style={{color: '#066bbd'}}/>} title="Visualizar" handleFunction={()=>FuctionOpenFileViewer(rowData)}/>
                        <BotonElement icon={<Edit style={{color: '#F3650E'}}/>} title="Editar" handleFunction={() => {}}/>
                        <BotonElement icon={<DeleteForever style={{color: 'red'}}/>} title="Eliminar" handleFunction={() => {}}/>
                    </ButtonGroup>
                </div>
        },         
    ]);

    // funciones para agregar archivos ***************************************************************
    const [openModalFile, setOpenModalFile] = useState({open: false, title: '', id: 0})
    const FuncionOpenModalAddFile = () =>{
        // dispatch(saveDataNewDocument({idCarpeta: 0, backgroundColor: '', image: '', title: '', total: 0}));
        setOpenModalFile({open: true, title: 'Agregar Archivo', id: 1})
    }
    const FuncionCloseModalAddFile = () =>{
        // dispatch(saveDataNewDocument({idCarpeta: 0, backgroundColor: '', image: '', title: '', total: 0}));
        setOpenModalFile({open: false, title: ''})
    }    
    // funciones para editar una carpeta ***********************************************************
    // const [editDocument, setEditDocument] = useState({open: false, title: '', getDocument: {}})
    // const FuncionOpenModalEditDocument = (data) =>{
    //     dispatch(saveDataNewDocument({idCarpeta: data?.idCarpeta, title: data?.title, backgroundColor: data?.backgroundColor, image: data?.image, total: data?.total}))
    //     setEditDocument({open: true, title: 'Editar Documento', id: 2, getDocument: data})
    // }
    // const FuncionCloseModalEditDocument = () =>{
    //     dispatch(saveDataNewDocument({idCarpeta: 0, backgroundColor: '', image: '', title: '', total: 0}));
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
    // funciones para visualizar un archivo *******************************************************
    const [openFileViewer, setOpenFileViewer] = useState({open: false, data: {}});
    const FuctionOpenFileViewer = (data) =>{
        setOpenFileViewer({open: true, data: data})
    }
    const FuctionCloseFileViewer = () =>{
        setOpenFileViewer({open: false, data: {}})
    }    
    const buttonList = [
        {
            customTitleButtonTable:"Agregar Archivo",
            customIconButtonTable:<NoteAdd/>,
            customFunctionTable: ()=>FuncionOpenModalAddFile('Agregar Archivo'),
        },
        {
            customTitleButtonTable:"Actualizar Tabla",
            customIconButtonTable:<RestorePage/>,
            // customFunctionTable:this.showList,
        }
    ]
    useEffect(()=>{
        objetoEstaVacio();
    }, [])
    // useEffect(()=>{
    //     FilterData();
    // }, [openModalFile.open])    
    return (
        <div className={classes.contenedorPrincipal}>
            <AppBarComponent />
            <Title title={'Documentos por Gerencia > Gerencia de '+ datosDeDocumento?.carpeta?.title+' > '+ datosDeDocumento?.subCarpeta?.title} icon={<Description />} />
            <div className={classes.containerTable}>
                <Table 
                    title={"Listado"}
                    header = {header}
                    // service={ApiServices[this.state.controller]}
                    // refreshList={this.showList}
                    data={filesList} 
                    // showSearcher={true}
                    isMenuDesplegable={true}
                    arrayMenuDesplegable={buttonList}
                    refreshList={()=>{}}
                    showFilterGeneral={false}
                />
            </div>            
            {/* componente para agregar un archivo ******************************************* */}
            {
                (openModalFile.open) ? (
                    <ComponenteCrearEditarArchivo
                        open = {openModalFile.open}
                        closeModal = {FuncionCloseModalAddFile}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {openModalFile.title}
                        id = {openModalFile.id}
                        datosDeDocumento={datosDeDocumento}
                        filesList={filesList}
                    />
                ):''
            }
            {/* componente para visualizar un archivo ******************************************* */}
            {
                (openFileViewer.open) ? (
                    <ComponenteVisualizarArchivo 
                        open = {openFileViewer.open}
                        closeModal = {FuctionCloseFileViewer}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {'Visualizador'}
                        data={openFileViewer.data}
                    />
                ):''
            }            
            {/* componente para editar una carpeta ******************************************* */}
            {/* {
                (editDocument.open) ? (
                    <ComponenteCrearEditarArchivo
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
export default (ComponenteDeArchivos);