import React, { useState } from "react";
import { useStyles } from "./style";
import { Container, Grid, Typography } from "@material-ui/core/";
//COMPONENTS
import Form from "component/Form/FormTwoColumns";
import FormularioNacional from "./FormularioNacional";
import FormularioExtranjero from "./FormularioExtranjero";

function CrearCitaEmpadronamiento(props) {
    const classes = useStyles(),
        [apiErrors, ] = useState([]),
        [selectedFormValue, setSelectedFormValue] = React.useState("Nacional");

    const validateChangeInputRadio = (element) => {
        if (Number(element.value) === 1) {setSelectedFormValue("Extranjero")} 
        else {setSelectedFormValue("Nacional")}
    };

    const [elementsRadioButton, ] = useState({    
        extranjeroONacional: {
            idelement: "extranjeroONacional", value: "0", label: "Seleccione el territorio en el que se encuentra el ciudadano.", isError: false, elementType: "radio", errorMessages: ["Debe seleccionar una opción"],
            options: [{ value: "0", label: "Nacional" },{ value: "1", label: "Extranjero" }], disabled: false, validateChangeInputRadio: validateChangeInputRadio,
        },
    });

    return (
        <React.Fragment>
            <div className={classes.root}>
                <br />
                <Container className={classes.colorComponente}>
                    <Grid container>
                        <Grid item xs={12} container direction="row" justify="center" alignItems="center" className={classes.formTitle}>
                            <Typography component="span" variant="body1" color="textPrimary">
                                <strong>Datos de Cita de Empadronamiento </strong>
                            </Typography>
                        </Grid>
                        <Grid className={classes.AlignTable} item xs={12}>
                            <Form elements={elementsRadioButton} apiErrors={apiErrors} validateChangeInputRadio={validateChangeInputRadio}/>
                        </Grid>
                        {selectedFormValue === "Nacional" ? (<FormularioNacional {...props}/>) : (<FormularioExtranjero {...props}/>)}
                    </Grid>
                    <br />
                    <div className={classes.lineaDegradadaBottom}></div>
                </Container>
                <br />
            </div>
        </React.Fragment>
    );
}

export default CrearCitaEmpadronamiento;
