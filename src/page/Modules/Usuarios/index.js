import React, { useEffect, useState } from 'react';
import {useStyles} from './style';
import AppBar from 'page/Home/Body/AppBarPrincipal'
import Title from 'component/TitleWithIcon';
import { DeleteForever, Description, Edit, FiberManualRecord, NoteAdd, People, Person, PersonAdd, RestorePage, Visibility } from '@material-ui/icons';
import Table from 'component/Table';
import BotonElement from 'component/BotonTable'; 
import { ButtonGroup } from '@material-ui/core';
import ComponenteCrearEditarUsuario from './CrearEditarUsuario'
import ComponenteVisualizarUsuario from './VisualizarUsuario'
// import ComponenteEliminarProceso from './EliminarProceso'
// REDUX **************************
import { useSelector, useDispatch} from 'react-redux';
import { saveNewProcessData } from 'store/reducers/ProcesosSlice';

const ComponenteUsuarios=(props)=> {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const userList = JSON.parse(JSON.stringify(useSelector( state => state.usuario.userList))); 

    const [header] = useState([
        { title: 'Código de usuario', field: 'codigo', cellStyle: { width: '200px'}},
        { title: 'Nombre completo', field: 'nombreCompleto', cellStyle: { width: '200px'}},
        { title: 'Usuario', field: 'usuario', cellStyle: { width: '200px'}},
        { title: 'Correo Electrónico', field: 'email', cellStyle: { width: '200px'}},
        { title: 'Rol de usuario', field: 'rolUsuario.name', cellStyle: { width: '200px'}},
        { title: 'Empresa', field: 'empresa.name', cellStyle: { width: '200px'}},
        { title: 'Acciones', field: '', filtering: false,
            render: rowData=>
                <div>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <BotonElement icon={<Visibility style={{color: '#066bbd'}}/>} title="Visualizar" function={()=>FuctionOpenUserViewer(rowData)}/>
                        <BotonElement icon={<Edit style={{color: '#F3650E'}}/>} title="Editar" function={() => FuncionOpenModalEditUser(rowData)}/>
                        <BotonElement icon={<DeleteForever style={{color: 'red'}}/>} title="Eliminar" function={() => FunctionOpenProcessModalToDelete(rowData)}/>
                    </ButtonGroup>
                </div>
        },         
    ]);
    // funciones para crear un usuario ***************************************************************
    const [modalCreateUser, setModalCreateUser] = useState({open: false, title: '', id: 0})
    const FuncionAbrirModalCrearUsuario = () =>{
        setModalCreateUser({open: true, title: 'Crear Usuario', id: 1})
    }
    const FuncionCloseModal = () =>{
        dispatch(saveNewProcessData({backgroundColor: '', image: '', title: ''}));
        setModalCreateUser({open: false, title: ''})
    }
    // funciones para editar un usuario ***********************************************************
    const [editUser, setEditUser] = useState({open: false, title: '', getProcess: {}})
    const FuncionOpenModalEditUser = (data) =>{
        dispatch(saveNewProcessData({title: data?.title, backgroundColor: data?.backgroundColor, image: data?.image}))
        setEditUser({open: true, title: 'Editar Proceso', id: 2, getProcess: data})
    }
    const FuncionCloseModalEditUser = () =>{
        dispatch(saveNewProcessData({backgroundColor: '', image: '', title: ''}));
        setEditUser({open: false, title: '', id: 0, getProcess: {}})
    }

    const buttonList = [
        {
            customTitleButtonTable:"Crear Usuario",
            customIconButtonTable:<PersonAdd/>,
            customFunctionTable: ()=>FuncionAbrirModalCrearUsuario(),
        },
        {
            customTitleButtonTable:"Actualizar Tabla",
            customIconButtonTable:<RestorePage/>,
            // customFunctionTable:this.showList,
        }
    ]
    // funciones para visualizar un usuario *******************************************************
    const [openUserViewer, setOpenUserViewer] = useState({open: false, data: {}});
    const FuctionOpenUserViewer = (data) =>{
        setOpenUserViewer({open: true, data: data})
    }
    const FuctionCloseUserViewer = () =>{
        setOpenUserViewer({open: false, data: {}})
    }
    
    // funciones para eliminar un proceso
    const [dataProcessModalToDelete, setdataProcessModalToDelete] = useState({open: false, data: {}});
    const FunctionOpenProcessModalToDelete = (data) =>{
        setdataProcessModalToDelete({open: true, data: data})
    }
    const FunctionCloseProcessModalToDelete = () =>{
        setdataProcessModalToDelete({open: false, data: {}})
    }
    
    // useEffect(()=>{
    //     dispatch(saveNewProcessData({backgroundColor: '', image: '', title: ''}));
    // }, [])
    return (
        <div className={classes.containerPrincipal}>
            <AppBar />
            <Title title={'Módulo de Usuarios'} icon={<People />} />
            <div className={classes.containerTable}>
                <Table 
                    title={"Listado"}
                    header = {header}
                    // service={ApiServices[this.state.controller]}
                    // refreshList={this.showList}
                    data={userList} 
                    // showSearcher={true}
                    isMenuDesplegable={true}
                    arrayMenuDesplegable={buttonList}
                    refreshList={()=>{}}
                    showFilterGeneral={false}
                />
            </div>
            {/* componente para crear un usuario ******************************************* */}
            {
                (modalCreateUser.open) ? (
                    <ComponenteCrearEditarUsuario
                        open = {modalCreateUser.open}
                        closeModal = {FuncionCloseModal}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {modalCreateUser.title}
                        id = {modalCreateUser.id}
                    />
                ):''
            }
            {/* componente para visualizar un usuario ******************************************* */}
            {
                (openUserViewer.open) ? (
                    <ComponenteVisualizarUsuario 
                        open = {openUserViewer.open}
                        closeModal = {FuctionCloseUserViewer}
                        iconToolbar = {<Person/>}
                        titleToolbar = {'Datos de Usuario'}
                        data={openUserViewer.data}
                    />
                ):''
            }
            {/* componente para editar un usuario ************************************************** */}
            {
                (editUser.open) ? (
                    <ComponenteCrearEditarUsuario
                        open = {editUser.open}
                        closeModal = {FuncionCloseModalEditUser}
                        iconToolbar = {<Edit/>}
                        titleToolbar = {editUser.title}
                        id = {editUser.id}
                        data = {editUser.getProcess}
                    />
                ):''
            }
            {/* componente para eliminar un proceso ******************************************* */}
            {/* {
                (dataProcessModalToDelete.open) ? (
                    <ComponenteEliminarProceso 
                        open = {dataProcessModalToDelete.open}
                        closeModal = {FunctionCloseProcessModalToDelete}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {'Eliminar'}
                        data={dataProcessModalToDelete.data}
                        userList={userList}
                    />
                ):''
            }  */}
        </div> 
    )
}
export default (ComponenteUsuarios);