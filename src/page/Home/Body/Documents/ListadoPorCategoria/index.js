import React, {  useEffect, useState } from 'react';
import {useStyles} from './style';
import AppBar from 'page/Home/Body/AppBarPrincipal'
import Title from 'component/TitleWithIcon';
import {Description, NoteAdd, Visibility } from '@material-ui/icons';
import Table from 'component/Table';
import BotonElement from 'component/BotonTable'; 
import { ButtonGroup } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import ComponenteVisualizarArchivo from 'page/Modules/Documentos/Archivos/VisualizarArchivos'
import ComponenteCard from './ComponenteCardCategoria'
// REDUX **************************
import { useSelector} from 'react-redux';
import { Alert } from '@material-ui/lab';

const ComponenteListadoPorCategoria=(props)=> {
    const classes = useStyles(props);
    const history = useHistory();
    const newCategory = JSON.parse(JSON.stringify(useSelector( state => state.categoria.newCategory))); 
    const filesList = JSON.parse(JSON.stringify(useSelector( state => state.documentos.filesList))); 
    const [data, setData] = useState([])
    const objetoEstaVacio = () => {
        if(newCategory.name === '') return history.push("/", {});	 
    }
    const formato = {
        1: 'PDF',
        2: 'EXCEL',
        3: 'WORD',
        4: 'IMAGEN',
        5: 'VIDEO',
    } 
    const FilterData = () =>{
        const current = filesList?.filter(obj => obj.idCategoria?.id === newCategory?.id);
        if(current?.length > 0) return setData(current);
        else return setData([]);
    }     
    // funciones para visualizar un archivo *******************************************************
    const [openFileViewer, setOpenFileViewer] = useState({open: false, data: {}});
    const FuctionOpenFileViewer = (data) =>{
        setOpenFileViewer({open: true, data: data})
    }
    const FuctionCloseFileViewer = () =>{
        setOpenFileViewer({open: false, data: {}})
    }  
    
    useEffect(()=>{
        objetoEstaVacio();
        FilterData();
    }, [])    
    return (
        <div className={classes.containerPrincipal}>
            <AppBar />
            <Title title={'Listado de documentos de ' + newCategory?.name} icon={<Description />} />
            <div className={classes.contendorDelListado}>
                {
                    (data.length > 0) ? (
                        data.map((label, index) =>(
                            <div className={classes.cardComponent} key={index}>
                                <ComponenteCard key={index} data={label} FuctionOpenFileViewer={FuctionOpenFileViewer}/>
                            </div>
                        ))
                    ): (
                        <Alert className={classes.alert} severity="warning" variant="outlined">Sin registros.</Alert>
                    )                    
                }
            </div>
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
        </div> 
    )
}
export default (ComponenteListadoPorCategoria);