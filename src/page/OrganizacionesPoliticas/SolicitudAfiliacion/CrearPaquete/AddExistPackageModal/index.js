import React, { useState, useEffect } from 'react';
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
    const [controllerPackage] = useState('paquetesDeAfiliacionYAdhesion'),
        [mensaje, setMensaje] = useState({ tipoError: '', tipoMensaje: '' }),    
        [loadingStepperSpinner, setloadingStepperSpinner] = useState(false),
        [open, setOpen] = useState(false),
        [elements, setElements] = useState({
            idPackage: {
                idelement: "idPackage", value: "", label: "Identificador del paquete *", pattern: "", disabled: false,
                validators: ["required"], errorMessages: ["Dato Requerido"], isError: false, elementType: "autocompleteV2", list: []
            },
        });

/********** FUNCTIONS **********/
    /*  Este método ejecuta "getIdPackage" cuando el valor open del modal cambia desde su padre "CrearPaquete/index" */
    useEffect(() => {
        if (props.open) {
            getIdPackage();
        }
    }, [props.open]);

    /*  Este método obtiene todos los paquetes que se hayan creado y que esten en estado 0 - Disponible
        y que sean faseOp 3 - partido político, se ejecuta desde el useEffect */
    const getIdPackage = async () => {
        try {
            let newElements = Object.assign({}, elements);
            newElements.idPackage.list = [];

            const hasPermission = await ApiServices.userSecurity.hasPermission(controllerPackage, "list");
            if (hasPermission.error) {
                setloadingStepperSpinner(false);
            } else {
                ApiServices[controllerPackage].searchCriteria.clear();
                ApiServices[controllerPackage].searchCriteria.setOperator("and");
                ApiServices[controllerPackage].searchCriteria.addEquals("estado", 0);
                ApiServices[controllerPackage].searchCriteria.setOperator("and");
                ApiServices[controllerPackage].searchCriteria.addEquals("faseOP", 3);
                ApiServices[controllerPackage].orderCriteria.clear();
                ApiServices[controllerPackage].orderCriteria.addDesc("fechaCreacionParseada");

                let response = await ApiServices[controllerPackage].customGET('list');
                let data = [];
                if (response.error !== null) {
                    setOpen(true);
                    setMensaje({ tipoMensaje: response.error.message, tipoError: 'error' });
                }
                else if (response.data !== "") {
                    /* Se agrega la información obtenida de los paquetes al autoComplete */
                    data = response.data;
                    Object.keys(data).forEach((element, key, _array) => {
                        newElements.idPackage.list.push({
                            id: data[element].id,
                            name: data[element].nombreCompletoPaquete,
                        });
                    });
                    setElements(newElements);
                }
                setloadingStepperSpinner(false);
            }
        } catch (exception) {
            setOpen(true);
            setMensaje({ tipoMensaje: "Problemas al obtener los paquetes. Por favor intente más tarde.", tipoError: 'error' });
            setloadingStepperSpinner(false);
        }
    }

    /*  El método guarda las hojas seleccionadas en el paquete existente que se seleccione se ejecuta en el botón "Añadir Hoja" */
    const save = async () => {
        setOpen(false);
        var dataNewPackage = {
            "hojas": []
        }
        let allGood = true;
        allGood = functions.checkIsEmptyWhenRequiredElement(elements, setElements);

        if (allGood) {
            setloadingStepperSpinner(true);
            var idPackage = parseInt(elements.idPackage.value.id);
            for (let value of props.dataPackage) {
                dataNewPackage.hojas.push({ 'noHoja': value.id })
            }
            try {
                let response = await ApiServices.paquetesDeAfiliacionYAdhesion.agregarPaqueteExistente(idPackage, dataNewPackage);
                if (response.error !== null) {
                    setOpen(true);
                    setMensaje({ tipoError: 'error', tipoMensaje: response.error.message })
                } else {
                    closeModal();
                    props.reloadList();
                    props.requestSuccess(idPackage)
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
        elements.idPackage.value = '';
        elements.idPackage.isError = false;
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
                <Title title="Agregar hoja a un paquete existente." />
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
                                                    <strong>Ingrese identificador del paquete al que se agregara la hoja</strong>
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