import React, { useState } from 'react';
import { Slide, DialogContentText, Grid, Checkbox, Container, Typography, Button, Icon } from '@material-ui/core/';
import AlertMaterial from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import { Send } from '@material-ui/icons'
/********** COMPONENTS **********/
import Form from 'component/Form/FormTwoColumns';
import Title from 'component/Title';
/********** SERVICES **********/
import ApiServices from 'service/ApiServices';
import { functions } from "constant/index";
/********** STYLES **********/
import { useStyles } from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
/********** VARIABLES **********/
    const classes = useStyles(props),
        [mensaje, setMensaje] = useState({ tipoError: '', tipoMensaje: '' }),
        [checked, setChecked] = useState(false),        
        [open, setOpen] = useState(false),
        [elements, setElements] = useState({
            cantSheets: {
                idelement: "cantSheets", value: "", label: "Cantidad de Hojas *", pattern: "", disabled: false,
                validators: ["required"], errorMessages: ["Dato Requerido"], isError: false, elementType: "dropdown",
                list: [{ id: 50, name: "50" }, { id: 100, name: "100" }, { id: 200, name: "200" }, { id: 300, name: "300" }, { id: 400, name: "400" }, { id: 500, name: "500" }],
            }
        });
    const limitSheet = 500;

/********** FUNCTIONS **********/
    /*  Este método guarda la solicitud de hojas que se realice al tener todos los campos correctos, 
        despues recarga nuevamente la tabla con la nueva información*/
    const save = async () => {
        setOpen(false);
        let allGood = true;
        let errorMessage = "Debe completar todos los campos obligatorios (*) del formulario.";
        allGood = functions.checkIsEmptyWhenRequiredElement(elements, setElements);        
        if (allGood) {
            if(elements.cantSheets.value === 0){
                setOpen(true);
                setMensaje({ tipoError: 'error', tipoMensaje: errorMessage })
            }else{
                var cantSheets = parseInt(elements.cantSheets.value);
                if (cantSheets <= limitSheet) {
                    try {
                        let response = await ApiServices.solicitudHojasAdhesion.createRequest({ cantidadHojas: cantSheets });
                        if (response.error !== null) {
                            setOpen(true);
                            setMensaje({ tipoError: 'error', tipoMensaje: response.error })
                        } else {
                            clear();
                            props.reloadList();
                            props.requestSuccess(response.data.cantidadDeHojas, response.data.id);
                        }
                    } catch (exception) {
                        setOpen(true);
                        setMensaje({ tipoError: 'error', tipoMensaje: "Error al Guardar la Solicitud, Intente de Nuevo" })
                    }
                } else {
                    setOpen(true);
                    setMensaje({ tipoError: 'error', tipoMensaje: "No puede solicitar mas de " + limitSheet + " hojas." })
                }
            }            
        } else {
            setOpen(true);
            setMensaje({ tipoError: 'error', tipoMensaje: errorMessage })
        }
    }

    /*  Este método valida cuando el usuario presiona el checkbox y lo activa o desactiva */
    const handleChangeCheckBox = (event) => {
        setChecked(event.target.checked)
    };
    
    /*  El método limpia los valores que se hayan ingresado y desactiva el checkbox */
    const clear = () => {
        elements.cantSheets.value = '';
        elements.cantSheets.isError = false;
        setChecked(false)
    }

    /*  El método cierra el modal y limpia toda la información ingresada */
    const closeModal = () => {
        clear();
        props.handleClose();
        setOpen(false);
    }

/********** RENDER **********/
    return (
        <div>
            <Dialog open={props.open} maxWidth={"lg"} fullWidth={true} TransitionComponent={Transition} keepMounted onClose={closeModal}
                aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                <Title title="Generar nueva solicitud de hojas de adhesión" />
                <React.Fragment>
                    <div className={classes.signupContainer}>
                        <div className={classes.signupBox}>
                            <React.Fragment>
                                <div className={classes.root}>
                                    <br />
                                    <Container className={classes.colorComponente}>
                                        <Grid container>
                                            <Grid item xs={12} container direction="column" justify="center" alignItems="center" className={classes.formTitle}>
                                                <Typography component="span" variant="body1" color="textPrimary">
                                                    <strong>Seleccione la cantidad de hojas a solicitar</strong>
                                                </Typography>
                                                {open ?
                                                    <Container maxWidth="sm">
                                                        <AlertMaterial variant="outlined" severity="error">
                                                            {mensaje.tipoMensaje}
                                                        </AlertMaterial>
                                                    </Container> : ""
                                                }
                                            </Grid>
                                            <Grid item xs={12} container direction="row" justify="center" alignItems="center" className={classes.inputContainer}>
                                                <Form elements={elements} />
                                            </Grid>
                                            <DialogContentText>
                                                <Grid container className={classes.gridContainer}>
                                                    <Grid item xs={1} className={classes.checkBoxContainer}>
                                                        <Checkbox checked={checked} color="primary" onChange={handleChangeCheckBox} />
                                                    </Grid>
                                                    <Grid item xs={10} >
                                                        <p className={classes.checkText}>{"Por medio de la presente solicitud confirmo que en nombre del Comité para la Constitución de Partido Político que represento, " +
                                                            "se realiza el requerimiento al Secretario del Registro de Ciudadanos para la generación de las hojas de adhesión."}</p>
                                                    </Grid>
                                                </Grid>
                                            </DialogContentText>
                                            <React.Fragment>
                                                <Grid item xs={12} container direction="row" justify="center" alignItems="center" className={classes.buttonsGrid}>
                                                    <div className={classes.wrapper}>
                                                        <Button onClick={closeModal} color="secondary" variant="contained">
                                                            <Icon className={classes.icon}> cancel </Icon> Cancelar
                                                        </Button>
                                                    </div>
                                                    <div className={classes.wrapper}>
                                                        <Button variant="contained" onClick={save} color="primary" disabled={!checked} endIcon={<Send />}>
                                                            Enviar Solicitud
                                                        </Button>
                                                    </div>
                                                </Grid>
                                            </React.Fragment>
                                        </Grid>
                                        <br />
                                        <div className={classes.lineaDegradadaBottom}></div>
                                    </Container>
                                    <br />
                                </div>
                            </React.Fragment>
                        </div>
                    </div>
                </React.Fragment>
            </Dialog>
        </div>
    );
}