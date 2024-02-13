import React, { useState } from 'react';
import {useStyles} from './style';
import AppBar from 'page/Home/Body/AppBarPrincipal'
import Title from 'component/TitleWithIcon';
import { DeleteForever, Description, Edit, NoteAdd, RestorePage, Visibility } from '@material-ui/icons';
import Table from 'component/Table';
import Modal from 'component/CustomDialog';
import BotonElement from 'component/BotonTable'; 
import { ButtonGroup } from '@material-ui/core';

const ComponenteCategorias=(props)=> {
    const classes = useStyles(props);
    const [header] = useState([
        { title: 'No. ', field: 'id'},
        { title: 'Título de Categoría', field: 'name', cellStyle: { width: '200px'}},
        { title: 'Icono', field: 'icon'},
        { title: 'Color de Icono', field: 'iconColor'},
        { title: 'Color de Borde', field: 'borderColor'},
        { title: 'Acciones', field: '', filtering: false},
        { title: 'Acción', field: 'accion', filtering: false,
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
    const buttonList = [
        {
            customTitleButtonTable:"Crear categoría",
            customIconButtonTable:<NoteAdd/>,
            // customFunctionTable:this.openComponentSearchByFolio,
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
            {/* <Modal 
                open={props.open}
                fullScreen={true}
                closeModal={props.closeModal}
                actualizarTabla={props.actualizarTabla}
                iconToolbar={props.iconToolbar}
                titleToolbar={'Cambios realizados en el sistema'}
            ></Modal>             */}
        </div> 
    )
}
export default (ComponenteCategorias);