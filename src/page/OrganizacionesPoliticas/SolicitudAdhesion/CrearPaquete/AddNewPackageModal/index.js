import React, { useState } from 'react';
import { Slide, Grid, Container, Typography, Button } from '@material-ui/core/';
import AlertMaterial from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import { Icon } from "@material-ui/core/";
import { Send } from '@material-ui/icons';
/********** COMPONENTS **********/
import LoadingSpinner from 'component/LoadingSpinner';
import Form from 'component/Form/FormTwoColumns';
import { functions } from "constant/index";
import Title from 'component/Title';
/********** SERVICES **********/
import ApiServices from 'service/ApiServices';
/********** STYLES **********/
import { useStyles } from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
/********** VARIABLES **********/
    const classes = useStyles(props);
    const [mensaje, setMensaje] = useState({ tipoError: '', tipoMensaje: '' }),
        [loadingStepperSpinner, setloadingStepperSpinner] = useState(false),
        [open, setOpen] = useState(false),
        [elements, setElements] = useState({
            namePackage: {
                idelement: "namePackage", value: "", label: "Nombre del paquete ", pattern: "", disabled: false,
                errorMessages: ["Dato Requerido"], isError: false, elementType: "input", validators: [""],
                key: 60, keys: [60, 61],
            },
        });

/********** FUNCTIONS **********/
    /*  El método guarda las hojas seleccionadas en un paquete nuevo con el nombre que coloquemos (opcional) "Añadir Hoja" */
    const save = async () => {
        setOpen(false);
        let allGood = true;
        allGood = functions.checkIsEmptyWhenRequiredElement(elements, setElements);

        if (allGood) {
            setloadingStepperSpinner(true);
            var namePackage = elements.namePackage.value;
            var dataNewPackage = {
                "nombrePaquete": namePackage.toUpperCase(),
                "hojas": []
            }
            /* Asignamos todas las hojas que se hayan seleccionado en el arreglo que se enviara para guardar el paquete */
            for (let value of props.dataPackage) {
                dataNewPackage.hojas.push({ 'noHoja': value.id })
            }
            try {
                let response = await ApiServices.paquetesDeAfiliacionYAdhesion.crearPaquete(dataNewPackage);
                if (response.error !== null) {
                    setOpen(true);
                    setMensaje({ tipoError: 'error', tipoMensaje: response.error.message })
                } else {
                    closeModal();
                    props.reloadList();
                    props.requestSuccess()
                }
                setloadingStepperSpinner(false);
            } catch (exception) {
                setloadingStepperSpinner(false);
                setOpen(true);
                setMensaje({ tipoError: 'error', tipoMensaje: "Error al Guardar el Paquete, Intente de Nuevo" })
            }
        } else {
            setOpen(true);
            setMensaje({ tipoError: 'error', tipoMensaje: "Debe completar todos los campos obligatorios (*) del formulario." })
        }
    }

    /*  El método limpia los valores de error y de value para el autoComplete del Id del paquete, se ejecuta desde el método "closeModal" */
    const clear = () => {
        elements.namePackage.value = '';
        elements.namePackage.isError = false;
    }
    
    /*  Este método cierra el modal para añadir a paquete existente y limpia los valores, se ejecuta desde el botón cancelar o
        al presionar fuera del modal */
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
                <Title title="Agregar hoja a un paquete nuevo." />
                <React.Fragment>
                    <div className={classes.signupContainer}>
                        <div className={classes.signupBox}>
                            <React.Fragment>
                                <div className={classes.root}>
                                    <br />
                                    <Container className={classes.colorComponente}>
                                        <Grid container>
                                            <Grid item xs={12} container direction="row" justify="center" alignItems="center" className={classes.formTitle}>
                                                <Typography component="span" variant="body1" color="textPrimary">
                                                    <strong>Ingrese nombre para el paquete (Opcional)</strong>
                                                </Typography>
                                            </Grid>
                                            {open ?
                                                <Container maxWidth="sm">
                                                    <AlertMaterial variant="outlined" severity="error">
                                                        {mensaje.tipoMensaje}
                                                    </AlertMaterial>
                                                </Container> : ""
                                            }
                                            <Grid item xs={12} container direction="row" justify="center" alignItems="center" className={classes.inputContainer}>
                                                <Form elements={elements} />
                                            </Grid>
                                            <React.Fragment>
                                                <Grid item xs={12} container direction="row" justify="center" alignItems="center" className={classes.buttonsGrid}>
                                                    <div className={classes.wrapper}>
                                                        <Button onClick={closeModal} color="secondary" variant="contained">
                                                            <Icon className={classes.icon}> cancel </Icon> Cancelar
                                                        </Button>
                                                    </div>
                                                    <div className={classes.wrapper}>
                                                        <Button variant="contained" onClick={save} color="primary" endIcon={<Send />}>
                                                            Añadir Hoja
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
                <LoadingSpinner open={loadingStepperSpinner}></LoadingSpinner>
            </Dialog>
        </div>
    );
}