import React, { useState } from 'react';
import {useStyles} from './style';
import AppBar from 'page/Home/Body/AppBarPrincipal'
import Title from 'component/TitleWithIcon';
import { DeleteForever, Edit, LockOpen, RestorePage, VerifiedUser } from '@material-ui/icons';
import Table from 'component/Table';
import BotonElement from 'component/BotonTable'; 
import { ButtonGroup, Icon } from '@material-ui/core';
import ComponenteCrearEditarRol from './CrearEditarRol'
import ComponenteEliminarRol from './EliminarRol'
import ComponenteAgregarPermisosRol from './PermisosDeRol'

// REDUX **************************
import { useSelector} from 'react-redux';

const ComponenteDeRoles=(props)=> {
    const classes = useStyles(props);
    const rolesList = JSON.parse(JSON.stringify(useSelector( state => state.roles.rolesList))); 

    const [header] = useState([
        { title: 'ID', field: 'id', cellStyle: { width: '200px'}},
        { title: 'Nombre', field: 'name', cellStyle: { width: '200px'}},
        { title: 'Acciones', field: '', filtering: false,
            render: rowData=>
                <div>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <BotonElement icon={<LockOpen style={{color: '#066bbd'}}/>} title="Permisos" function={()=>FunctionOpenPermissionsRolModalToDelete(rowData)}/>
                        <BotonElement icon={<Edit style={{color: '#F3650E'}}/>} title="Editar" function={() => FuncionOpenModalEditRol(rowData)}/>
                        <BotonElement icon={<DeleteForever style={{color: 'red'}}/>} title="Eliminar" function={() => FunctionOpenRolModalToDelete(rowData)}/>
                    </ButtonGroup>
                </div>
        },         
    ]);
    // funciones para crear un rol ***************************************************************
    const [modalCreateRol, setModalCreateRol] = useState({open: false, title: '', id: 0})
    const FuncionAbrirModalCrearRol = () =>{
        setModalCreateRol({open: true, title: 'Crear Rol', id: 1})
    }
    const FuncionCerrarModalCrearRol = () =>{
        setModalCreateRol({open: false, title: ''})
    }
    // funciones para editar un rol ***********************************************************
    const [editRol, setEditRol] = useState({open: false, title: '', getRol: {}})
    const FuncionOpenModalEditRol = (data) =>{
        setEditRol({open: true, title: 'Editar rol', id: 2, getRol: data})
    }
    const FuncionCloseModalEditRol = () =>{
        setEditRol({open: false, title: '', id: 0, getRol: {}})
    }

    const buttonList = [
        {
            customTitleButtonTable:"Crear Rol",
            customIconButtonTable:<VerifiedUser/>,
            customFunctionTable: ()=>FuncionAbrirModalCrearRol(),
        },
        {
            customTitleButtonTable:"Actualizar Tabla",
            customIconButtonTable:<RestorePage/>,
            // customFunctionTable:this.showList,
        }
    ]
    
    // funciones para eliminar un rol
    const [dataRolModalToDelete, setdataRolModalToDelete] = useState({open: false, data: {}});
    const FunctionOpenRolModalToDelete = (data) =>{
        setdataRolModalToDelete({open: true, data: data})
    }
    const FunctionCloseRolModalToDelete = () =>{
        setdataRolModalToDelete({open: false, data: {}})
    }

    // funciones para asignar permisos a rol
    const [dataPermissionsRolModalToDelete, setdataPermissionsRolModalToDelete] = useState({open: false, data: {}});
    const FunctionOpenPermissionsRolModalToDelete = (data) =>{
        setdataPermissionsRolModalToDelete({open: true, data: data})
    }
    const FunctionClosePermissionsRolModalToDelete = () =>{
        setdataPermissionsRolModalToDelete({open: false, data: {}})
    }
    
    return (
        <div className={classes.containerPrincipal}>
            <AppBar />
            <Title title={'Módulo de Roles de Usuario'} icon={<VerifiedUser />} />
            <div className={classes.containerTable}>
                <Table 
                    title={"Listado"}
                    header = {header}
                    // service={ApiServices[this.state.controller]}
                    // refreshList={this.showList}
                    data={rolesList} 
                    // showSearcher={true}
                    isMenuDesplegable={true}
                    arrayMenuDesplegable={buttonList}
                    refreshList={()=>{}}
                    showFilterGeneral={false}
                />
            </div>
            {/* componente para crear un rol ******************************************* */}
            {
                (modalCreateRol.open) ? (
                    <ComponenteCrearEditarRol
                        open = {modalCreateRol.open}
                        closeModal = {FuncionCerrarModalCrearRol}
                        iconToolbar = {<VerifiedUser/>}
                        titleToolbar = {modalCreateRol.title}
                        id = {modalCreateRol.id}
                    />
                ):''
            }
            {/* componente para editar un rol ************************************************** */}
            {
                (editRol.open) ? (
                    <ComponenteCrearEditarRol
                        open = {editRol.open}
                        closeModal = {FuncionCloseModalEditRol}
                        iconToolbar = {<Edit/>}
                        titleToolbar = {editRol.title}
                        id = {editRol.id}
                        data = {editRol.getRol}
                    />
                ):''
            }
            {/* componente para eliminar un rol ******************************************* */}
            {
                (dataRolModalToDelete.open) ? (
                    <ComponenteEliminarRol
                        open = {dataRolModalToDelete.open}
                        closeModal = {FunctionCloseRolModalToDelete}
                        iconToolbar = {<VerifiedUser/>}
                        titleToolbar = {'Eliminar'}
                        data={dataRolModalToDelete.data}
                        rolesList={rolesList}
                    />
                ):''
            } 
            {/* componente para asignar permisos a rol ******************************************* */}
            {
                (dataPermissionsRolModalToDelete.open) ? (
                    <ComponenteAgregarPermisosRol
                        open = {dataPermissionsRolModalToDelete.open}
                        closeModal = {FunctionClosePermissionsRolModalToDelete}
                        iconToolbar = {<VerifiedUser/>}
                        titleToolbar = {'Asignar Permisos a rol'}
                        data={dataPermissionsRolModalToDelete.data}
                        // rolesList={rolesList}
                    />
                ):''
            }             
        </div> 
    )
}
export default (ComponenteDeRoles);