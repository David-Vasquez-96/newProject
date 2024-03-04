import React, {useState} from 'react'
import {Container, Grid, Paper, Typography } from '@material-ui/core';
import {AccountCircle, CreditCard, Email} from '@material-ui/icons';
import { useStyles } from "./Style";

export default function UserInformation (props) {
    const classes = useStyles()
    const [information] = useState([
        {title: 'CUI del DPI:', content: props.DatosUsuario.code, icon: <CreditCard />},
        {title: 'Nombre completo:', content: props.DatosUsuario.name, icon: <AccountCircle />},
        {title: 'Correo electrónico:', content: props.DatosUsuario.email, icon: <Email />}
    ]);

    return (
        <Container maxWidth="md" className={classes.containerPrincipal}>
            <div className={classes.title}>Datos del ciudadano(a)</div>
            <Grid container spacing={1} className={classes.grid}>
                {
                    information.map((data, index) => {
                        return (
                            <>
                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                    <Paper className={classes.paper} elevation={0}>
                                        {data.icon}
                                        <Typography className={classes.contentTitle}>{data.title}</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item lg={6} md={6} sm={6} xs={12} wrap="nowrap">
                                    <Paper className={classes.paper} elevation={0}>
                                        <Typography className={classes.content}>{data.content}</Typography>
                                    </Paper>
                                </Grid>
                            </>
                    )})}
            </Grid>
        </Container>       
    )
}