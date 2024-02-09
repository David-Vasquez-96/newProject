import React, { useState } from 'react';
import { Button, Typography, Grid, Card, CardContent, FormControl, Icon, Input, InputLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
/********** STYLES **********/
import { useStyles } from './styles';

export default function CardInput({ valueInput, valueChangeInput, searchButton, clearButton }) {
    /********** VARIABLES **********/
    const classes = useStyles();
    const [showAlert, setShowAlert] = useState(false),
        [message, setMessage] = useState(false);

    /********** FUNCTIONS **********/
    /*  El método ejecuta "validateFoil" en el archivo "/ingresarAdherente/index" para buscar la hoja mediante correlativo */
    const handleClick = () => {
        setShowAlert(false);
        if (!valueInput) {
            setShowAlert(true);
            setMessage("Todos los campos son requeridos");
            return;
        } else {
            searchButton();
        }
    }

    /*  El método ejecuta "clearAllRegister" en el archivo "/ingresarAdherente/index" para limpiar los campos de la tabla
        y el input de correlativo */
    const clearRegister = () => {
        setShowAlert(false);
        clearButton();
    }

    /********** RENDER **********/
    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
                <Grid item xs={12} container direction="row" >
                    <Typography className={classes.formTextTitle}>
                        <strong>Buscar hoja para agregar adherentes</strong>
                    </Typography>
                </Grid>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="standard-adornment-password">Ingrese número de hoja *</InputLabel>
                    <Input type={'text'} value={valueInput} onChange={e => valueChangeInput(e.target.value)}
                        variant="outlined" name="searchValue" required />
                </FormControl>
                <Button className={classes.button} label={"Buscar "} onClick={handleClick} variant="contained">
                    <Icon className={classes.icon} >search</Icon>
                    Buscar Hoja
                </Button>
                <Button className={classes.button} label={"Buscar "} onClick={clearRegister} variant="contained" >
                    <Icon className={classes.icon} >clear</Icon>
                    Limpiar Datos
                </Button>
            </CardContent>
            {showAlert && (
                <CardContent>
                    <Alert className={classes.marginLeft} severity="error">{message}</Alert>
                </CardContent>
            )}
        </Card>
    )
}