import React, { useState, useEffect } from "react";
import { Container, Grid, Button } from "@material-ui/core/";
import { Icon, CircularProgress } from "@material-ui/core/";
import { Send } from "@material-ui/icons";
/********** COMPONENTS **********/
import ConfirmationElement from 'component/ConfirmationElement';
import ResponseElement from "component/MensajeElement";
import Form from "component/Form/FormTwoColumns";
/********** SERVICES **********/
import ApiServices from "service/ApiServices";
import { functions } from "constant/index";
/********** STYLES **********/
import { useStyles } from "./style";

export default function FormNewPackage(props) {
/********** VARIABLES **********/
    const classes = useStyles(),
        [mensaje, setMensaje] = useState({ tipoError: "success", tipoMensaje: "" }),
        [openConfirmDialog, setOpenConfirmDialog] = useState(false),
        [titleError, setTitleError] = useState(''),
        [loading, setLoading] = useState(false),
        [open, setOpen] = useState(false),
        [elementsAffiliate, setElementsAffiliate] = useState({
            noLinea: {
                idelement: "noLinea", value: "", margin: '40px 0px 0px 40px', label: "Número de línea *", validators: ["required"],
                pattern: "^[0-9]*$", errorMessages: ["Número de Línea requerido"], isError: false, elementType: "input", maxLengthTwo: 1,
                disabled: false, key: 15, keys: [15, 16],
            },
            cui: {
                idelement: "cui", value: "", margin: '40px 40px 0px 0px', label: "Número de CUI *", requiredLength: 13, validators: ["required"],
                isError: false, pattern: "^[0-9]*$", disabled: false, errorMessages: ["CUI requerido"], keys: [21, 22],
                elementType: "input",  key: 21,
            },
            lastName: {
                idelement: "lastName", value: "", margin: '40px 0px 0px 40px', label: "Primer apellido *", validators: ["required"],
                pattern: "^([\\w_Ññ][\\w_ Ññ]*[\\w_Ññ]){1,25}$", errorMessages: ["Apellido requerido. Sin tíldes. Sin espacios al inicio al final"],
                isError: false, elementType: "input",  key: 17, keys: [17, 18],
            },
            secondLastName: {
                idelement: "secondLastName", value: "", margin: '40px 40px 0px 0px', label: "Segundo apellido ", validators: ["requireds"],
                pattern: "^([\\w_Ññ][\\w_ Ññ]*[\\w_Ññ]){0,25}$", errorMessages: ["Sin tíldes. Sin espacios al inicio al final"],
                isError: false, elementType: "input",  key: 19, keys: [19, 20],
            },
            firstName: {
                idelement: "firstName", value: "", margin: '40px 0px 0px 40px', label: "Primer nombre *", validators: ["required"],
                pattern: "^([\\w_Ññ][\\w_ Ññ]*[\\w_Ññ]){1,25}$", errorMessages: ["Nombre requerido. Sin tíldes. Sin espacios al inicio al final"], isError: false,
                elementType: "input", key: 13, keys: [13, 14],
            },
            secondName: {
                idelement: "secondName", value: "", margin: '40px 40px 0px 0px', label: "Segundo nombre ", validators: ["requireds"],
                pattern: "^([\\w_Ññ][\\w_ Ññ]*[\\w_Ññ]){0,25}$", errorMessages: ["Nombre requerido. Sin tíldes. Sin espacios al inicio al final"], isError: false,
                elementType: "input",  key: 15, keys: [15, 16],
            },            
            afiliateDate: {
                idelement: "afiliateDate", value:  null,  label: "Fecha de Adhesión *", validators: ["required"],
                pattern: "^[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}$", errorMessages: ['Fecha requerida en formato: dd/MM/yyyy'], isError: false, elementType: "date",
                margin: '40px 0px 0px 55px', key: 23, keys: [23, 24], maxDate: new Date()
            },
        }),
        [elementsAfiliado, setElementsAfiliado] = useState(elementsAffiliate);

/********** FUNCTIONS **********/
    /*  Cuando el "newModal" se despliega valida si se trata de una actualización de datos o ingreso de nueva información
        se valida con el prop "updateData" */
    useEffect(() => {
        if (props.updateData != null) {
            elementsAffiliate['noLinea'].value = props.updateData?.noLinea;
            elementsAffiliate['noLinea'].disabled = true;
            elementsAffiliate['cui'].value = String(props.updateData?.cui);
            elementsAffiliate['cui'].disabled = true
            elementsAffiliate['firstName'].value = props.updateData?.primerNombre;
            elementsAffiliate['secondName'].value = props.updateData?.segundoNombre ? props.updateData?.segundoNombre : "";
            elementsAffiliate['lastName'].value = props.updateData?.primerApellido;
            elementsAffiliate['secondLastName'].value = props.updateData?.segundoApellido ? props.updateData?.segundoApellido : "";
            elementsAffiliate['afiliateDate'].value = new Date(props.updateData?.fechaAfiliacion);
            setElementsAffiliate({ ...elementsAffiliate });
        } else {
            elementsAffiliate['noLinea'].disabled = false;
            elementsAffiliate['cui'].disabled = false;
            setElementsAffiliate({ ...elementsAffiliate });
        }
    }, [props.updateData])
    
    /*  El método valida la información del CUI para verificaar inconsistencias a la hora de agregarlo a la hoja
        se ejectua por el botón "Agregar Solicitud" */
    const saveAffiliate = async () => {
        let allGood = true;
        allGood = functions.checkIsEmptyWhenRequiredElement(elementsAffiliate, setElementsAffiliate);
        if (allGood) {
            try {
                setLoading(true);
                let response = await ApiServices.hojasAfiliacionYAdhesion.verificarCUI({ cui: elementsAffiliate.cui.value });
                if (response.error !== null) {
                    /*  Si el ciudadano presenta inconsistencias se abre el modal para confirmar si se quiere agregar */
                    setTitleError(response.error.message);
                    setOpenConfirmDialog(true);
                } else {
                    /* Si el CUI no tiene ninguna inconsistencia, se ejecuta el método para guardar al ciudadano en la hoja */
                    insertInformation();
                }
                setLoading(false);
            } catch (error) {
                setOpen(true);
                setMensaje({ tipoError: "error", tipoMensaje: "Error al enviar la solicitud. Por favor intente más tarde." });
            }
        } else {
            setMensaje({ tipoError: "error", tipoMensaje: "Verifique que la información ingresada sea correcta.", });
            setOpen(true);
        }
    }

    /*  El método se encarga de guardar la información del ciudadano en la hoja se ejecuta desde el método "saveAffiliate"  */
    const insertInformation = async () => {
        var dataAfiliado = {
            'noLinea': elementsAffiliate.noLinea.value, 'cui': elementsAffiliate.cui.value, 'fechaAfiliacion': elementsAffiliate.afiliateDate.value,
            'primerNombre': (elementsAffiliate.firstName.value).toUpperCase(), 'segundoNombre': (elementsAffiliate.secondName.value).toUpperCase(),
            'id': '', 'idHojaAfiliacion': '', 'primerApellido': (elementsAffiliate.lastName.value).toUpperCase(),
            'segundoApellido': (elementsAffiliate.secondLastName.value).toUpperCase(),
        }
        try {
            if (props.updateData) {
                /* Si el ciudadano va ser actualizado se envia la nueva información para actualizar */
                handleCloseSendModal();                
                dataAfiliado.id = props.updateData.id;
                dataAfiliado.idHojaAfiliacion = props.updateData.idHojaAfiliacion
                let response = await ApiServices.hojasAfiliacionYAdhesion.actualizarAfiliado(dataAfiliado);
                if (response.error !== null) {
                    setOpen(true);
                    setMensaje({ tipoError: 'error', tipoMensaje: response.error.message })
                } else {
                    setMensaje({
                        tipoError: 'success',
                        tipoMensaje: "El ciudadano con CUI " + elementsAffiliate.cui.value + " se actualizó correctamente en la linea " + elementsAffiliate.noLinea.value
                    })
                    cancel();
                    setOpen(true);
                }               
            } else {
                /* Si la información que se va agregar es nueva se agrega el ciudadano en la hoja */
                handleCloseSendModal();
                let response = await ApiServices.hojasAfiliacionYAdhesion.guardarAfiliado(props.correlativo, dataAfiliado);
                if (response.error !== null) {
                    setOpen(true);
                    setMensaje({ tipoError: 'error', tipoMensaje: response.error.message })
                } else {
                    setMensaje({
                        tipoError: 'success',
                        tipoMensaje: "El ciudadano con CUI " + elementsAffiliate.cui.value + " se agrego correctamente en la linea " + elementsAffiliate.noLinea.value
                    })
                    functions.clearElementValuesNoDate(elementsAfiliado, setElementsAfiliado);
                    setOpen(true);
                }
            }
        } catch (error) {
            setOpen(true);
            setMensaje({ tipoError: "error", tipoMensaje: "Error al enviar la solicitud. Por favor intente más tarde." });
        }
    }

    /*  El método cierra el modal "ResponseElement" de mensaje de alerta */
    const handClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    /*  Este método sirve para cerrar todo el modal para ingresar al ciudadano y actualiza la tabla, se ejectua en el 
        botón "Cerrar"   */
    const cancel = () => {
        props.updateState();
        functions.clearElementValuesNoDate(elementsAfiliado, setElementsAfiliado);
        props.handleClose();
    };

    /*  El método cierra el "ConfirmationElement" que muestra si un ciudadano presenta inconsistencias  */
    const handleCloseSendModal = () => {
        setOpenConfirmDialog(false);
        setTitleError('');
    }

/********** RENDER **********/
    return (
        <React.Fragment>
            <div className={classes.root}>
                <Container className={classes.colorComponente}>
                    <ConfirmationElement open={openConfirmDialog} handleClose={handleCloseSendModal} handleConfirm={insertInformation}
                        titleModal={titleError} subtitleModal={'El ciudadano que desea ingresar presenta inconsistencias, agregarlo a la hoja electrónica implica una investigación por Inspeccción. ¿Seguro que desea agregar de igual forma?'} />
                    <Grid container>
                        <Grid className={classes.comboboxGrid} item xs={12}>
                            <React.Fragment>
                                <Form elements={elementsAffiliate} />
                            </React.Fragment>
                        </Grid>
                        <React.Fragment>
                            <Grid item xs={12} container direction="row" justify="center" alignItems="center" className={classes.buttonsGrid}>
                                <div className={classes.wrapper}>
                                    <Button onClick={cancel} color="secondary" variant="contained">
                                        <Icon className={classes.icon}> cancel </Icon> Cerrar
                                    </Button>
                                </div>
                                <div className={classes.wrapper}>
                                    <Button variant="contained" onClick={saveAffiliate} color="primary">
                                        Agregar Solicitud
                                        {loading ? <div className={classes.circularProgress}><CircularProgress /></div> :
                                            <div className={classes.iconSendRequest}><Send /> </div>}
                                    </Button>
                                </div>
                            </Grid>
                        </React.Fragment>
                    </Grid>
                </Container>
                <br />
            </div>
            <ResponseElement type={mensaje.tipoError} content={mensaje.tipoMensaje} open={open} handClose={handClose} hideDuration={3000} />
        </React.Fragment>
    );
}