import React, { useState } from 'react';
import { Button, Typography, Grid, Card, CardContent, Icon } from '@material-ui/core';
import { CreateNewFolder } from "@material-ui/icons";
/********** STYLES **********/
import { useStyles } from './styles';

export default function CardInput({ createPackage, existPackage }) {
/********** VARIABLES **********/
    const classes = useStyles();   

/********** FUNCTIONS **********/
    /*  El método despliega el modal para crear un nuevo paquete  */
    const handleClickNewPackage = () => {
        createPackage();
    }

    /*  El método despliega el modal para agregar a un paquete existente */
    const handleClickExistPackage = () => {
        existPackage();
    }

/********** RENDER **********/
    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
                <Grid item xs={12} container direction="row" >
                    <Typography className={classes.formTextTitle}>
                        <strong>Opciones para los paquetes</strong>
                    </Typography>
                </Grid>
                <Button className={classes.button} label={""} onClick={handleClickNewPackage} variant="contained">
                    <Icon className={classes.icon} >add</Icon>
                    Crear paquete nuevo
                </Button>
                <Button className={classes.button} label={""} onClick={handleClickExistPackage} variant="contained"
                    startIcon={<CreateNewFolder />} >
                    Agregar a un paquete existente
                </Button>
            </CardContent>           
        </Card>
    )
}