import React, { useEffect, useState } from 'react';
import {useStyles} from './style';
import AppBar from 'page/Home/Body/AppBarPrincipal'
import Title from 'component/TitleWithIcon';
import { DeleteForever, Edit, NoteAdd, People, Person, PersonAdd, RestorePage, Visibility, VpnKey } from '@material-ui/icons';
import Table from 'component/Table';
import BotonElement from 'component/BotonTable'; 
import { ButtonGroup } from '@material-ui/core';
import ComponenteCrearEditarUsuario from './CrearEditarUsuario'
import ComponenteVisualizarUsuario from './VisualizarUsuario'
import ComponenteEliminarUsuario from './EliminarUsuario'
import ComponenteCambiarContraseña from './CambiarContraseña'
// REDUX **************************
import { useSelector, useDispatch} from 'react-redux';

const ComponenteUsuarios=(props)=> {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const userList = JSON.parse(JSON.stringify(useSelector( state => state.usuario.userList))); 

    const [header] = useState([
        { title: 'Código de usuario', field: 'codigo', cellStyle: { width: '200px'}},
        { title: 'Nombre completo', field: 'nombreCompleto', cellStyle: { width: '200px'}},
        { title: 'Usuario', field: 'usuario', cellStyle: { width: '200px'}},
        { title: 'Correo Electrónico', field: 'email', cellStyle: { width: '200px'}},
        { title: 'Contraseña', field: 'contraseña', cellStyle: { width: '200px'}},
        { title: 'Rol de usuario', field: 'rolUsuario.name', cellStyle: { width: '200px'}},
        { title: 'Empresa', field: 'empresa.name', cellStyle: { width: '200px'}},
        { title: 'Acciones', field: '', filtering: false,
            render: rowData=>
                <div>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <BotonElement icon={<Visibility style={{color: '#066bbd'}}/>} title="Visualizar" function={()=>FuctionOpenUserViewer(rowData)}/>
                        <BotonElement icon={<VpnKey style={{color: '#066bbd'}}/>} title="Cambiar contraseña" function={()=>FunctionOpenChangePassword(rowData)}/>
                        <BotonElement icon={<Edit style={{color: '#F3650E'}}/>} title="Editar" function={() => FuncionOpenModalEditUser(rowData)}/>
                        <BotonElement icon={<DeleteForever style={{color: 'red'}}/>} title="Eliminar" function={() => FunctionOpenUserModalToDelete(rowData)}/>
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
        setModalCreateUser({open: false, title: ''})
    }
    // funciones para editar un usuario ***********************************************************
    const [editUser, setEditUser] = useState({open: false, title: '', getUser: {}})
    const FuncionOpenModalEditUser = (data) =>{
        setEditUser({open: true, title: 'Editar Usuario', id: 2, getUser: data})
    }
    const FuncionCloseModalEditUser = () =>{
        setEditUser({open: false, title: '', id: 0, getUser: {}})
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
    // funciones para cambiar contraseña de un usuario *******************************************************
    const [dataUserChangePassword, setDataUserChangePassword] = useState({open: false, data: {}});
    const FunctionOpenChangePassword = (data) =>{
        setDataUserChangePassword({open: true, data: data})
    }
    const FunctionCloseChangePassword = () =>{
        setDataUserChangePassword({open: false, data: {}})
    }
    
    // funciones para eliminar un usuario
    const [dataUserModalToDelete, setdataUserModalToDelete] = useState({open: false, data: {}});
    const FunctionOpenUserModalToDelete = (data) =>{
        setdataUserModalToDelete({open: true, data: data})
    }
    const FunctionCloseUserModalToDelete = () =>{
        setdataUserModalToDelete({open: false, data: {}})
    }
    
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
            {/* componente para cambiar contraseña de un usuario ******************************************* */}
            {
                (dataUserChangePassword.open) ? (
                    <ComponenteCambiarContraseña
                        open = {dataUserChangePassword.open}
                        closeModal = {FunctionCloseChangePassword}
                        iconToolbar = {<VpnKey/>}
                        titleToolbar = {'Cambiar contraseña'}
                        data={dataUserChangePassword.data}
                        userList={userList}
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
                        data = {editUser.getUser}
                    />
                ):''
            }
            {/* componente para eliminar un usuario ******************************************* */}
            {
                (dataUserModalToDelete.open) ? (
                    <ComponenteEliminarUsuario
                        open = {dataUserModalToDelete.open}
                        closeModal = {FunctionCloseUserModalToDelete}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {'Eliminar'}
                        data={dataUserModalToDelete.data}
                        userList={userList}
                    />
                ):''
            } 
        </div> 
    )
}
export default (ComponenteUsuarios);