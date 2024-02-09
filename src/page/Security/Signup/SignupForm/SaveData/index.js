import React, {useEffect, useState} from 'react';
import { useStyles } from "./style";
import Button from "@material-ui/core/Button";
import {Send, NavigateBefore, ListAlt} from '@material-ui/icons';
import Alert from 'react-s-alert';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import ApiServices from 'service/ApiServices';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import ModalConfirmation from 'component/ModalConfirmation/ModalConfirmacion';
import modalStyles from 'component/ModalConfirmation/styles';
import { Typography } from '@material-ui/core';
import CountDownTimer from 'component/counterDownTimer.js';
import BotonPersonalizado from 'component/BotonNormal'
import {functions} from 'constant/index';
import DialogLoadingMessage from 'component/BackDropCustom';
import ComfirmaciónDeDatos from './ConfirmaciónDeDatos'

const SaveDataComponent = (props)=> {
    const   classes = useStyles(props),
            classesModal = modalStyles(),
            [loading, setLoading] = React.useState(false),
            [loadingMessage, setLoadingMessage] = useState({loading: false, title:''}),
            [success, setSuccess] = React.useState(false),
            [startounterDownTimer, setStartCounterDownTimer] = React.useState(false),
            [DayshoursMinSecs, setDayshoursMinSecs] = React.useState({days: 0, hours:0, minutes: 2, seconds: 0}),
            buttonClassname = clsx({
                [classes.buttonSuccess]: success,
            }),
            ClearRecaptcha = () =>{
                sessionStorage.removeItem('recatpcha');
                sessionStorage.removeItem("countdown")
            },
            ClearCircularProgressButton = () =>{
                setSuccess(true);
                setLoading(false);
                setLoadingMessage({loading: false, title: ''})        
            },
            ClearFiles = () => {
                props.SIGNUP_SET_FILE_BY_INDEX(1,null);
                props.SIGNUP_SET_FILE_BY_INDEX(2,null);
                props.SIGNUP_SET_FILE_BY_INDEX(3,null);
            },
            [modalConfirmation, setModalConfirmation] = React.useState(false),
            [modalConfirmarDatos, setModalConfirmarDatos] = useState({open: false, title: ''});

    useEffect( () => {
        getSessionStorage();
    } , []);

    const getSessionStorage = () => {
        const countDown = sessionStorage.getItem('countdown');
        if(countDown) {
            const {dys, hrs, mins, secs} = JSON.parse(countDown);
            if(secs <= 0) {
                return sessionStorage.removeItem('countdown');
            }
            setDayshoursMinSecs({days: dys, hours:hrs, minutes: mins, seconds: secs})
        }
    };

    const showModalConfirmation = () => {
        if(validateTheDocumentDoesnotExist(props?.files)) {
            Alert.error("Todos los documentos son requeridos");
            setModalConfirmation(false)
        } else {
            // setLoadingMessage({loading: true, title: 'Procesando solicitud. Espere un momento ...'})        
            setModalConfirmation(true)
            setStartCounterDownTimer(true);
            props.getToken();
        }
    };

    const stopCounterDownTimer = () => {
        setModalConfirmation(false)
        setStartCounterDownTimer(false);
        sessionStorage.removeItem("recatpcha")
        sessionStorage.removeItem("countdown")
    }

    const createUserRequest = async () => {
        setLoadingMessage({loading: true, title: 'Procesando solicitud. Espere un momento ...'})        
        setSuccess(false);
        setLoading(true);
        try {
            ClearCircularProgressButton()

            if(props.ArchivoDPIFrontalGrande === true){
                Alert.error("Archivo de fotografía de la parte frontal del DPI es demasiado grande, tamaño maximo 25 MB")
            }else if(props.ArchivoDPITraseraGrande === true){
                Alert.error("Archivo de fotografía de la parte trasera del DPI es demasiado grande, tamaño maximo 25 MB")
            }else if(props.TipoArchivoDPIFrontalDiferente === true){
                Alert.error("Formato inválido, verifique los formatos aceptables para el archivo de Fotografía de DPI de la parte frontal")
            }else if(props.TipoArchivoDPITraseroDiferente === true){
                Alert.error("Formato inválido, verifique los formatos aceptables para el archivo de Fotografía de DPI de la parte trasera")
            }else{
                try {
                    let saveData = Object.assign({}, props.data);
                    saveData.cuiFileObverse=props.files[0].base64;
                    saveData.cuiFileBack=props.files[1].base64;
                    saveData.videoFile=props.files[2].base64;

                    setModalConfirmation(false)
                    const response = await props.sendRecaptcha();

                    if(!response) {
                        Alert.warning('Error en la funcionalidad de reCaptcha. Ponganse en contacto con el Administrador sí este mensaje persiste.');
                        return ClearCircularProgressButton();
                    }

                    const {error, status} = response;

                    if(!status && error === 'invalid_key') {
                        Alert.warning('Error en la funcionalidad de reCaptcha. Ponganse en contacto con el Administrador sí este mensaje persiste.');
                        return ClearCircularProgressButton();
                    }

                    if(!status) {
                        Alert.warning('reCAPTCHA inválido, volver a intentar ');
                        return  ClearCircularProgressButton();
                    }

                    if(props.data.country_id?.id === 1){
                        saveData.paisId = ''
                        saveData.estadoId = ''
                        saveData.ciudadId = ''
                        saveData.departamento_id = props.data.state_id?.id
                        saveData.municipio_id = props.data.city_id?.id
                    }else{
                        saveData.paisId = props.data.country_id?.id
                        saveData.estadoId = props.data.state_id?.id
                        saveData.ciudadId = props.data.city_id?.id
                        saveData.departamento_id = ''
                        saveData.municipio_id = ''
                    }
                    setLoadingMessage({loading: true, title: 'Procesando solicitud. Espere un momento ...'})     
                    let responseCreate = await ApiServices.solicitudUsuario.createRegisterPublic(saveData);
                    if(responseCreate.error === null){
                        props.data.firstName = ""
                        props.data.secondName= ""
                        props.data.thirdName = ""
                        props.data.firstLastName = ""
                        props.data.secondLastName= ""
                        props.data.marriedLastName=""
                        props.data.cui = ""
                        props.data.email=""
                        props.data.birthDate= new Date()
                        props.data.state_id = ""
                        props.data.city_id = ""
                        props.data.country_id = ""
                        Alert.success("Solicitud guardada")
                        ClearFiles()
                        ClearRecaptcha()
                        props.SIGNUP_SET_STEP(props.step+1);
                        ClearCircularProgressButton()
                    }else{
                        Alert.error(responseCreate.error.message);
                        ClearRecaptcha()
                        ClearCircularProgressButton()
                    }
            } catch (error) {
                setModalConfirmation(false)
                Alert.error('Error No hay conectividad con el servidor ' +error);
                ClearRecaptcha();
                ClearCircularProgressButton()
            }
        }
            ClearRecaptcha()
            ClearCircularProgressButton()
        }catch (error) {
            Alert.error('Error en la funcionalidad de reCaptcha. Ponganse en contacto con el Administrador sí este mensaje persiste.');
            ClearRecaptcha()
            ClearCircularProgressButton()
        }
        setLoadingMessage({loading: false, title: ''})        
    }

    const validateTheDocumentDoesnotExist = (documents) => {
        const resultado = documents.some(element => !element?.base64);
        return resultado;
    };

    const backStep=()=>{
        props.SIGNUP_SET_STEP(props.step-1)
        ClearFiles();
    };

    const closeModalConfirmation = () => {
        setModalConfirmation(false)
        stopCounterDownTimer()
    };

    const abrirModalConfirmacionDeDatos = () =>{
        if(validateTheDocumentDoesnotExist(props?.files)) 
            Alert.error("Todos los documentos son requeridos");
        else
            setModalConfirmarDatos({open: true, title: 'Confirmar datos'})        
    }
    const cerrarModalConfirmacionDeDatos = () =>{
        setModalConfirmarDatos({open: false, title: ''})        
    }
    return (
        <>
            <div className={classes.rootdiv}>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                <DialogLoadingMessage open={loadingMessage.loading} title={loadingMessage.title}/>
                <div className={classes.wrapper}>
                    {/* <Button variant="outlined" color="primary" onClick={abrirModalConfirmacionDeDatos} className={classes.SpaceButton} endIcon={<NavigateBefore />}>modal</Button> */}
                    <Button variant="outlined" color="secondary" onClick={backStep} className={classes.SpaceButton} endIcon={<NavigateBefore />}>Regresar</Button>
                    <Button variant="outlined" color="primary" onClick={abrirModalConfirmacionDeDatos} disabled={loading} className={buttonClassname} endIcon={<Send />}>Enviar Solicitud</Button>
                    {/* <Button variant="outlined" color="primary" onClick={showModalConfirmation} disabled={loading} className={buttonClassname} endIcon={<Send />}>Enviar Solicitud</Button> */}
                </div>

                {/* Modal confirmation add new candidate */}
                <ModalConfirmation
                    actionAdd={createUserRequest}
                    open={modalConfirmation}
                    closeModal={closeModalConfirmation}
                    titleButton="Sí, enviar solicitud"
                >
                    <Typography className={classesModal.title} >
                        ¿Está seguro de enviar la solicitud de creación de usuario?
                    </Typography>
                    <Typography className={classesModal.description} >
                    Tiempo restante para enviar la solicitud
                    </Typography>
                    <CountDownTimer
                        DayshoursMinSecs={DayshoursMinSecs}
                        showMinutes={true}
                        startounterDownTimer={startounterDownTimer}
                        stopCounterDownTimer={stopCounterDownTimer}
                    />
                </ModalConfirmation>
                {
                    (modalConfirmarDatos.open) && (                        
                        <ComfirmaciónDeDatos 
                            open={modalConfirmarDatos.open}
                            titleToolbar={modalConfirmarDatos.title}
                            closeModal={cerrarModalConfirmacionDeDatos} 
                            iconToolbar={<ListAlt />}
                            data={props.data}
                            files={props.files}
                            showModalConfirmation={showModalConfirmation}
                        />
                    )
                }
            </div>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (SaveDataComponent);