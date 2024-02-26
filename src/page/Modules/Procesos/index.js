import React, { useEffect, useState } from 'react';
import {useStyles} from './style';
import AppBar from 'page/Home/Body/AppBarPrincipal'
import Title from 'component/TitleWithIcon';
import { DeleteForever, Description, Edit, FiberManualRecord, NoteAdd, RestorePage, Visibility } from '@material-ui/icons';
import Table from 'component/Table';
import BotonElement from 'component/BotonTable'; 
import { ButtonGroup } from '@material-ui/core';
import ComponenteCrearEditarProceso from './CrearProceso'
import ComponenteVisualizarProceso from './VisualizarProceso'
import ComponenteEliminarProceso from './EliminarProceso'
// REDUX **************************
import { useSelector, useDispatch} from 'react-redux';
import { saveNewProcessData } from 'store/reducers/ProcesosSlice';

const ComponenteProcesos=(props)=> {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const processList = JSON.parse(JSON.stringify(useSelector( state => state.proceso.processList))); 

    const [header] = useState([
        { title: 'Título de proceso', field: 'title', cellStyle: { width: '200px'}},
        { title: 'Icono', field: 'image', filtering: false,
            render: rowData=>
                <img className={classes.mobileIcon} src={ rowData.image} />
        },
        { title: 'Color de fondo', field: 'backgroundColor', filtering: false,
            render: rowData=> <FiberManualRecord fontSize="large" 
                style={{color: `rgba(${ rowData?.backgroundColor?.r }, ${ rowData?.backgroundColor?.g }, ${ rowData?.backgroundColor?.b }, ${ rowData?.backgroundColor?.a })`}}
            />
        },
        { title: 'Acciones', field: '', filtering: false,
            render: rowData=>
                <div>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <BotonElement icon={<Visibility style={{color: '#066bbd'}}/>} title="Visualizar" handleFunction={()=>FuctionOpenProcessViewer(rowData)}/>
                        <BotonElement icon={<Edit style={{color: '#F3650E'}}/>} title="Editar" handleFunction={() => FuncionOpenModalEditProcess(rowData)}/>
                        <BotonElement icon={<DeleteForever style={{color: 'red'}}/>} title="Eliminar" handleFunction={() => FunctionOpenProcessModalToDelete(rowData)}/>
                    </ButtonGroup>
                </div>
        },         
    ]);
    // funciones para crear un proceso ***************************************************************
    const [openModal, setOpenModal] = useState({open: false, title: '', id: 0})
    const FuncionOpenModal = (title) =>{
        setOpenModal({open: true, title: title, id: 1})
    }
    const FuncionCloseModal = () =>{
        dispatch(saveNewProcessData({backgroundColor: '', image: '', title: ''}));
        setOpenModal({open: false, title: ''})
    }
    // funciones para editar un proceso ***********************************************************
    const [editProcess, setEditProcess] = useState({open: false, title: '', getProcess: {}})
    const FuncionOpenModalEditProcess = (data) =>{
        dispatch(saveNewProcessData({title: data?.title, backgroundColor: data?.backgroundColor, image: data?.image}))
        setEditProcess({open: true, title: 'Editar Proceso', id: 2, getProcess: data})
    }
    const FuncionCloseModalEditProcess = () =>{
        dispatch(saveNewProcessData({backgroundColor: '', image: '', title: ''}));
        setEditProcess({open: false, title: '', id: 0, getProcess: {}})
    }

    const buttonList = [
        {
            customTitleButtonTable:"Crear proceso",
            customIconButtonTable:<NoteAdd/>,
            customFunctionTable: ()=>FuncionOpenModal('Crear proceso'),
        },
        {
            customTitleButtonTable:"Actualizar Tabla",
            customIconButtonTable:<RestorePage/>,
            // customFunctionTable:this.showList,
        }
    ]
    // funciones para visualizar un proceso *******************************************************
    const [openProcessViewer, setOpenProcessViewer] = useState({open: false, data: {}});
    const FuctionOpenProcessViewer = (data) =>{
        setOpenProcessViewer({open: true, data: data})
    }
    const FuctionCloseProcessViewer = () =>{
        setOpenProcessViewer({open: false, data: {}})
    }
    
    // funciones para eliminar un proceso
    const [dataProcessModalToDelete, setdataProcessModalToDelete] = useState({open: false, data: {}});
    const FunctionOpenProcessModalToDelete = (data) =>{
        setdataProcessModalToDelete({open: true, data: data})
    }
    const FunctionCloseProcessModalToDelete = () =>{
        setdataProcessModalToDelete({open: false, data: {}})
    }
    
    useEffect(()=>{
        dispatch(saveNewProcessData({backgroundColor: '', image: '', title: ''}));
    }, [])
    return (
        <div className={classes.containerPrincipal}>
            <AppBar />
            <Title title={'Módulo de Procesos'} icon={<Description />} />
            <div className={classes.containerTable}>
                <Table 
                    title={"Listado"}
                    header = {header}
                    // service={ApiServices[this.state.controller]}
                    // refreshList={this.showList}
                    data={processList} 
                    // showSearcher={true}
                    isMenuDesplegable={true}
                    arrayMenuDesplegable={buttonList}
                    refreshList={()=>{}}
                    showFilterGeneral={false}
                />
            </div>
            {/* componente para crear un proceso ******************************************* */}
            {
                (openModal.open) ? (
                    <ComponenteCrearEditarProceso
                        open = {openModal.open}
                        closeModal = {FuncionCloseModal}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {openModal.title}
                        id = {openModal.id}
                    />
                ):''
            }
            {/* componente para visualizar un proceso ******************************************* */}
            {
                (openProcessViewer.open) ? (
                    <ComponenteVisualizarProceso 
                        open = {openProcessViewer.open}
                        closeModal = {FuctionCloseProcessViewer}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {'Visualizador'}
                        data={openProcessViewer.data}
                    />
                ):''
            }
            {/* componente para editar un proceso ************************************************** */}
            {
                (editProcess.open) ? (
                    <ComponenteCrearEditarProceso 
                        open = {editProcess.open}
                        closeModal = {FuncionCloseModalEditProcess}
                        iconToolbar = {<Edit/>}
                        titleToolbar = {editProcess.title}
                        id = {editProcess.id}
                        data = {editProcess.getProcess}
                    />
                ):''
            }
            {/* componente para eliminar un proceso ******************************************* */}
            {
                (dataProcessModalToDelete.open) ? (
                    <ComponenteEliminarProceso 
                        open = {dataProcessModalToDelete.open}
                        closeModal = {FunctionCloseProcessModalToDelete}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {'Eliminar'}
                        data={dataProcessModalToDelete.data}
                        processList={processList}
                    />
                ):''
            } 
        </div> 
    )
}
export default (ComponenteProcesos);