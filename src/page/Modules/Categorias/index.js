import React, { useState } from 'react';
import {useStyles} from './style';
import AppBar from 'page/Home/Body/AppBarPrincipal'
import Title from 'component/TitleWithIcon';
import { DeleteForever, Description, Edit, FiberManualRecord, NoteAdd, RestorePage, Visibility } from '@material-ui/icons';
import Table from 'component/Table';
import BotonElement from 'component/BotonTable'; 
import { ButtonGroup } from '@material-ui/core';
import ComponenteCrearEditarCategoria from './CrearCategoria'

const ComponenteCrearCategorias=(props)=> {
    const classes = useStyles(props);
    const [header] = useState([
        { title: 'No. ', field: 'id'},
        { title: 'Título de Categoría', field: 'name', cellStyle: { width: '200px'}},
        { title: 'Icono', field: 'icon',},
        { title: 'Color de Icono', field: 'iconColor',
            render: rowData=> <FiberManualRecord fontSize="large" style={{color: rowData.iconColor}}/>
        },
        { title: 'Color de Borde', field: 'borderColor',
            render: rowData=> <FiberManualRecord fontSize="large" style={{color: rowData.borderColor}}/>
        },
        { title: 'Acciones', field: '', filtering: false,
            render: rowData=>
                <div>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <BotonElement icon={<Visibility style={{color: '#066bbd'}}/>} title="Visualizar" function={() => {}}/>
                        <BotonElement icon={<Edit style={{color: '#F3650E'}}/>} title="Editar" function={() => {}}/>
                        <BotonElement icon={<DeleteForever style={{color: 'red'}}/>} title="Eliminar" function={() => {}}/>
                        {/* <BotonElement icon={<Description />} title="Procesar Solicitud Extranjero" function={() => this.AbrirModalProcesarSolicitudExtranjero(rowData)}/> */}
                    </ButtonGroup>
                </div>
        },         
    ]);
    const [data, setData] = useState([
        {id: '1', name: 'Procedimientos', icon: <Description/>, iconColor: '#034DA1', borderColor: '#F3650E'},
        {id: '2', name: 'Políticas', icon: <RestorePage/>, iconColor: '#034DA1', borderColor: '#36B66F'},
    ])

    // funciones para crear y editar categorias
    const [openModal, setOpenModal] = useState({open: true, title: 'Crear categoría'})
    const FuncionOpenModal = (title) =>{
        setOpenModal({open: true, title: title})
    }
    
    const FuncionCloseModal = () =>{
        setOpenModal({open: false, title: ''})
    }

    const buttonList = [
        {
            customTitleButtonTable:"Crear categoría",
            customIconButtonTable:<NoteAdd/>,
            customFunctionTable: ()=>FuncionOpenModal('Crear categoría'),
        },
        {
            customTitleButtonTable:"Actualizar Tabla",
            customIconButtonTable:<RestorePage/>,
            // customFunctionTable:this.showList,
        }
    ]    
    return (
        <div className={classes.containerPrincipal}>
            <AppBar />
            <Title title={'Módulo de Categorias'} icon={<Description />} />
            <div className={classes.containerTable}>                
                <Table 
                    title={"Listado"}
                    header = {header}
                    // service={ApiServices[this.state.controller]}
                    // refreshList={this.showList}
                    data={data} 
                    // showSearcher={true}
                    isMenuDesplegable={true}
                    arrayMenuDesplegable={buttonList}
                    refreshList={()=>{}}
                    showFilterGeneral={false}
                />
            </div>
            {
                (openModal.open) ? (
                    <ComponenteCrearEditarCategoria 
                        open = {openModal.open}
                        closeModal = {FuncionCloseModal}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {openModal.title}
                    />
                ):''
            }
        </div> 
    )
}
export default (ComponenteCrearCategorias);