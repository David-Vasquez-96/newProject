import React, { useEffect, useRef, useState } from "react";
import { useStyles } from "./style";
import {Grid, CssBaseline, Paper, Typography, ButtonBase, Button} from "@material-ui/core";
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import AlertaComponent from '@material-ui/lab/Alert';
import Alert from 'react-s-alert';
import MostrarImageModal from 'component/ImageModal'
import VideoPrev from 'component/videoModal'
import './styles.css';
import { showMessagePersonalizedPosition } from "service/SweetAlert";

const UploadDocs = (props)=> {
    const classes = useStyles(props);
    const [datosArchivo, setDatosArchivo] = useState({open: false, base64:'', dataFile: ''});
    const [DPIfrontal, setDPIFrontal] = useState({state: false, data: {}});
    const [DPIAnverso, setDPIAnverso] = useState({state: false, data: {}});
    const [video, setVideo] = useState({state: false, data: {}})

    const uploadImage = async (event,data) => {
        event.target.files=null
        const file_size = event.target.files[0];

        if(file_size){
            const  sizeInMB = (file_size.size / (1024*1024)).toFixed(2);
            if(sizeInMB > 10){
                Alert.error(data.titulo)
                props.SIGNUP_SET_NOMBRE_TITULO_ARCHIVO(data.titulo)
                document.getElementById(data.id).value = null;
                props.SIGNUP_SET_FILE_BY_INDEX(data.id,null)
                if(data.id === 1){
                    props.SIGNUP_SET_ARCHIVO_DPI_FRONTAL_GRANDE(true)
                }else if(data.id === 2){
                    props.SIGNUP_SET_ARCHIVO_DPI_TRASERA_GRANDE(true)
                }
            }else{
                var arr1 = file_size.type.split('/');
                if(data.id === 1){
                    props.SIGNUP_SET_ARCHIVO_DPI_FRONTAL_GRANDE(false)
                    if(arr1[1] === 'jpg' || arr1[1] === 'jpeg' || arr1[1] === 'png'){
                        props.SIGNUP_SET_TIPO_ARCHIVO_DPI_FRONTAL_DIFERENTE(false)
                        const file = event.target.files[0];
                        const base64 = await convertBase64(file);   
                        let size = (file.size / 1024/1024).toFixed(2)+ 'MB';
                        let name = file.name;
                        setDPIFrontal({state:true, data: {base64: base64, name: name, size: size}});
                        props.SIGNUP_SET_FILE_BY_INDEX(data.id, base64);
                        if(base64)Alert.success(data.title+" cargado")
                    }else{
                        document.getElementById(data.id).value = null;
                        Alert.error('Formato no aceptado, tome o adjunte fotografía en formato .jpg, .jpeg, .png')
                        props.SIGNUP_SET_TIPO_ARCHIVO_DPI_FRONTAL_DIFERENTE(true)
                    }
                }else if(data.id === 2){
                    props.SIGNUP_SET_ARCHIVO_DPI_TRASERA_GRANDE(false)            
                    if(arr1[1] === 'jpg' || arr1[1] === 'jpeg' || arr1[1] === 'png'){
                        props.SIGNUP_SET_TIPO_ARCHIVO_DPI_TRASERA_DIFERENTE(false)
                        const file = event.target.files[0];
                        const base64 = await convertBase64(file);   
                        let size = (file.size / 1024/1024).toFixed(2)+ 'MB';
                        let name = file.name;
                        setDPIAnverso({state:true, data: {base64: base64, name: name, size: size}});
                        props.SIGNUP_SET_FILE_BY_INDEX(data.id, base64);
                        if(base64)Alert.success(data.title+" cargado")
                    }else{
                        document.getElementById(data.id).value = null;
                        Alert.error('Formato no aceptado, tome o adjunte fotografía en formato .jpg, .jpeg, .png')
                        props.SIGNUP_SET_TIPO_ARCHIVO_DPI_TRASERA_DIFERENTE(true)
                    }
                }else if(data.id === 3){
                    if(file_size.type !== "video/mp4"){
                        document.getElementById(data.id).value = null;
                        Alert.error("Formato no aceptado, grabe o adjunte video en formato .MP4");
                        return;
                    }

                    const file = event.target.files[0];
                    const base64 = await convertBase64(file); 
                    let size = (file.size / 1024/1024).toFixed(2)+ 'MB';
                    let name = file.name;
                    setVideo({state:true, data: {base64: base64, name: name, size: size}});
                    props.SIGNUP_SET_FILE_BY_INDEX(data.id, base64);
                    if(base64)Alert.success(data.title+" Cargado")
                    // if(arr1[1] === 'mp4' ){
                    // }else{
                    //     // Alert.error('formato inválido para el archivo de DPI de la parte trasera')
                    //     // props.SIGNUP_SET_TIPO_ARCHIVO_DPI_TRASERA_DIFERENTE(true)
                    // }
                }
            }
        }else{
            if(data.id === 1) setDPIFrontal({state:false, data: {}});
            else if(data.id === 2) setDPIAnverso({state:false, data: {}});
            else if(data.id === 3) setVideo({state:false, data: {}});
            Alert.error("Seleccionar "+data.title)
            props.SIGNUP_SET_FILE_BY_INDEX(data.id,null)
        }        
    };

    const convertBase64 = (file) => {
        if(file){
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => { resolve(fileReader.result); };
                fileReader.onerror = (error) => { reject(error);    };
            });
        } 
    };

    //ver los archivos
    const AbrirMostrarImagenModal = async (event, getData) => {
        let file = ''
        if(!getData?.base64) return showMessagePersonalizedPosition('warning', '¡Advertencia!', ('Por favor adjunte '+ getData?.title), 'center');
        
        if(getData?.id === 1 || getData?.id === 2 || getData?.id === 3)  
            file = getData?.base64.split('base64,')[1];
        else 
            file = '';

        setDatosArchivo({open: true, base64: file, dataFile: getData })
    }
    const CerrarMostrarImagenModal = () => {
        setDatosArchivo({open: false, base64:'', dataFile: ''})
    }    

    const DeleteFile = (e, data) =>{
        props.SIGNUP_SET_FILE_BY_INDEX(data.id,null)
        if(data.id === 1) setDPIFrontal(false);
        else if(data.id === 2) setDPIAnverso(false);
        else if(data.id === 3) setVideo(false);
        document.getElementById(data.id).value = null;
        Alert.error(data.title+' eliminada.')
    }
    const ShowFile = (props) =>{
        return (
            <div className={classes.showFile}>
                <div className={classes.image2}>
                    {
                        (props.id === 3) ? (
                            <video className={classes.img2} src={props.data?.base64}/>
                        ): <img className={classes.img2} alt="complex" src={props.data?.base64}/>
                    }
                </div>
                <div className={classes.dataImage}>
                    <div>Nombre: {props.data?.name}</div>
                    <div>Tamaño: {props.data?.size}</div>
                    <div className={classes.groupButton}>
                        <Button variant="contained" color="primary" onClick={(e)=> AbrirMostrarImagenModal(e,props.dataFiles)}>Ver</Button>
                        <Button variant="contained" color="secondary" onClick={(e)=> DeleteFile(e,props.dataFiles)}>Eliminar</Button>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div className={classes.root}>
            <CssBaseline />
            {props.files.map((data, index) => (
                <Paper square className={classes.paper} key={index}>
                    <Grid container>
                        <Grid item lg={6} md={6} sm={12} xs={12} >
                            <Grid item xs direction="column" spacing={2}>
                                <Grid item xs>
                                    <ButtonBase className={classes.image}>
                                        <img    className={classes.img}
                                                alt="complex" src={data.imagePath}/>
                                    </ButtonBase>                                    
                                    <Typography gutterBottom variant="subtitle1">{data.text}</Typography>
                                </Grid>
                                <Grid item xs>
                                    <input
                                        id={data.id}
                                        // multiple
                                        className="designButtonFile"
                                        type="file" 
                                        // capture="environment"
                                        accept={data.type}                     
                                        onChange={(e) => {uploadImage(e,data) }}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} >
                            <Grid item xs spacing={2} className={classes.containerTitleLogo}>
                                <div className={classes.containerImage}>
                                    {
                                        ((data.id === 1 && DPIfrontal.data?.base64)) ? (
                                            <ShowFile data={DPIfrontal.data} id={1} dataFiles={data}/>
                                        ) : (data.id === 2 && DPIAnverso.data?.base64) ? (
                                            <ShowFile data={DPIAnverso.data} id={2} dataFiles={data}/>
                                        ) : (data.id === 3 && video.data?.base64) ? (
                                            <ShowFile data={video.data} id={3} dataFiles={data}/>
                                        ):''
                                    }
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    {
                        ((data.id === 1 && !DPIfrontal.state) || (data.id === 2 && !DPIAnverso.state) || (data.id === 3 && !video.state)) ? (
                            <AlertaComponent className={classes.alert} severity="error">{data.alerta}</AlertaComponent>
                        ) :''
                    }
                </Paper>
            ))}
            {/* ver los archivos */}
            {
                (datosArchivo?.dataFile?.id === 1 || datosArchivo?.dataFile?.id === 2) ? (
                    <MostrarImageModal 
                        open={datosArchivo.open} 
                        handleClose={CerrarMostrarImagenModal} 
                        titulo={datosArchivo?.dataFile?.title}
                        base64={datosArchivo.base64}
                    />
                ) : (datosArchivo?.dataFile?.id === 3) ? (
                    <VideoPrev  
                        open={datosArchivo.open}
                        base64={datosArchivo.base64}
                        titulo={datosArchivo?.dataFile?.title}
                        handleClose={CerrarMostrarImagenModal} 
                    />
                ): ""
            }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (UploadDocs);