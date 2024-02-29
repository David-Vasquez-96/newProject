import React, { useEffect, useState } from 'react';
import {useStyles} from './style';
import AppBar from 'page/Home/Body/AppBarPrincipal'
import Title from 'component/TitleWithIcon';
import { DeleteForever, Description, Edit, FiberManualRecord, NoteAdd, RestorePage, Visibility } from '@material-ui/icons';
import Table from 'component/Table';
import BotonElement from 'component/BotonTable'; 
import { ButtonGroup } from '@material-ui/core';
import ComponenteCrearEditarCategoria from './CrearCategoria'
import ComponenteVisualizarCatengoria from './VisualizarCategoria'
import ComponenteEliminarCategoria from './EliminarCategoria'
// REDUX **************************
import { useSelector, useDispatch} from 'react-redux';
import { saveDataNewCategory } from 'store/reducers/categoriaSlide';

const ComponenteCrearCategorias=(props)=> {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const categoryList = JSON.parse(JSON.stringify(useSelector( state => state.categoria.categoryList))); 

    const [header] = useState([
        { title: 'ID Categoría', field: 'id', cellStyle: { width: '200px'}},
        { title: 'Título de Categoría', field: 'name', cellStyle: { width: '200px'}},
        { title: 'Icono', field: 'icon', filtering: false,
            render: rowData=>
                <img className={classes.mobileIcon} src={ rowData.icon} />
                // <img className={classes.mobileIcon} src={ props.image || 'data:image/png;base64,'} />
        },
        { title: 'Color de Borde', field: 'borderColor', filtering: false,
            render: rowData=> <FiberManualRecord fontSize="large" 
                style={{color: `rgba(${ rowData?.borderColor?.r }, ${ rowData?.borderColor?.g }, ${ rowData?.borderColor?.b }, ${ rowData?.borderColor?.a })`}}
            />
        },
        { title: 'Acciones', field: '', filtering: false,
            render: rowData=>
                <div>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <BotonElement icon={<Visibility style={{color: '#066bbd'}}/>} title="Visualizar" handleFunction={()=>FuctionOpenCategoryViewer(rowData)}/>
                        <BotonElement icon={<Edit style={{color: '#F3650E'}}/>} title="Editar" handleFunction={() => FuncionOpenModalEditCategory(rowData)}/>
                        <BotonElement icon={<DeleteForever style={{color: 'red'}}/>} title="Eliminar" handleFunction={() => FunctionOpenCategoryModalToDelete(rowData)}/>
                    </ButtonGroup>
                </div>
        },         
    ]);
    // funciones para crear categorias ***************************************************************
    const [openModal, setOpenModal] = useState({open: false, title: '', id: 0})
    const FuncionOpenModal = (title) =>{
        setOpenModal({open: true, title: title, id: 1})
    }
    const FuncionCloseModal = () =>{
        dispatch(saveDataNewCategory({borderColor: '', icon: '', name: ''}));
        setOpenModal({open: false, title: ''})
    }
    // funciones para editar una categoria ***********************************************************
    const [editCategory, setEditCategory] = useState({open: false, title: '', getCategory: {}})
    const FuncionOpenModalEditCategory = (data) =>{
        dispatch(saveDataNewCategory({name: data?.name, borderColor: data?.borderColor, icon: data?.icon}))
        setEditCategory({open: true, title: 'Editar Categoría', id: 2, getCategory: data})
    }
    const FuncionCloseModalEditCategory = () =>{
        dispatch(saveDataNewCategory({borderColor: '', icon: '', name: ''}));
        setEditCategory({open: false, title: '', id: 0, getCategory: {}})
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
    // funciones para visualizar una categoria *******************************************************
    const [openCategoryViewer, setOpenCategoryViewer] = useState({open: false, data: {}});
    const FuctionOpenCategoryViewer = (data) =>{
        setOpenCategoryViewer({open: true, data: data})
    }
    const FuctionCloseCategoryViewer = () =>{
        setOpenCategoryViewer({open: false, data: {}})
    }
    
    // funciones para eliminar una categoria
    const [dataCategoryModalToDelete, setdataCategoryModalToDelete] = useState({open: false, data: {}});
    const FunctionOpenCategoryModalToDelete = (data) =>{
        setdataCategoryModalToDelete({open: true, data: data})
    }
    const FunctionCloseCategoryModalToDelete = () =>{
        setdataCategoryModalToDelete({open: false, data: {}})
    }
    
    useEffect(()=>{
        dispatch(saveDataNewCategory({borderColor: '', icon: '', name: ''}));
    }, [])
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
                    data={categoryList} 
                    // showSearcher={true}
                    isMenuDesplegable={true}
                    arrayMenuDesplegable={buttonList}
                    refreshList={()=>{}}
                    showFilterGeneral={false}
                />
            </div>
            {/* componente para crear una categoria ******************************************* */}
            {
                (openModal.open) ? (
                    <ComponenteCrearEditarCategoria 
                        open = {openModal.open}
                        closeModal = {FuncionCloseModal}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {openModal.title}
                        id = {openModal.id}
                    />
                ):''
            }
            {/* componente para visualizar una categoria ******************************************* */}
            {
                (openCategoryViewer.open) ? (
                    <ComponenteVisualizarCatengoria 
                        open = {openCategoryViewer.open}
                        closeModal = {FuctionCloseCategoryViewer}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {'Visualizador'}
                        data={openCategoryViewer.data}
                    />
                ):''
            }
            {/* componente para editar una categoria ************************************************** */}
            {
                (editCategory.open) ? (
                    <ComponenteCrearEditarCategoria 
                        open = {editCategory.open}
                        closeModal = {FuncionCloseModalEditCategory}
                        iconToolbar = {<Edit/>}
                        titleToolbar = {editCategory.title}
                        id = {editCategory.id}
                        data = {editCategory.getCategory}
                    />
                ):''
            }
            {/* componente para eliminar una categoria ******************************************* */}
            {
                (dataCategoryModalToDelete.open) ? (
                    <ComponenteEliminarCategoria 
                        open = {dataCategoryModalToDelete.open}
                        closeModal = {FunctionCloseCategoryModalToDelete}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {'Eliminar'}
                        data={dataCategoryModalToDelete.data}
                        categoryList={categoryList}
                    />
                ):''
            }            
        </div> 
    )
}
export default (ComponenteCrearCategorias);