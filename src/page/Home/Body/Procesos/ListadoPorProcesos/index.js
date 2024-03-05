import React, {  useEffect, useState } from 'react';
import {useStyles} from './style';
import AppBar from 'page/Home/Body/AppBarPrincipal'
import Title from 'component/TitleWithIcon';
import {Description, NoteAdd } from '@material-ui/icons';
import { useHistory } from "react-router-dom";
import ComponenteVisualizarArchivo from 'page/Modules/Documentos/Archivos/VisualizarArchivos'
import ComponenteCard from './ComponenteCard'
// REDUX **************************
import { useSelector} from 'react-redux';
import { Alert } from '@material-ui/lab';

const ComponenteListadoPorProcesos=(props)=> {
    const classes = useStyles(props);
    const history = useHistory();
    const newProcess = JSON.parse(JSON.stringify(useSelector( state => state.proceso.newProcess))); 
    const filesList = JSON.parse(JSON.stringify(useSelector( state => state.documentos.filesList))); 
    const [data, setData] = useState([])
    const objetoEstaVacio = () => {
        if(newProcess.title === '') return history.push("/", {});	 
    }
    const FilterData = () =>{
        const current = filesList?.filter(obj => obj.idCategoria?.id === newProcess?.id);
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
            <Title title={'Listado de documentos de ' + newProcess?.title} icon={<Description />} />
            <div className={classes.contendorDelListado}>
                {
                    (data.length > 0) ? (
                        data.map((label, index) =>(
                            <div className={classes.cardComponent}>
                                <ComponenteCard data={label}/>
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
export default (ComponenteListadoPorProcesos);