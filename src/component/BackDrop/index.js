import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container, Grid } from '@material-ui/core';
import { useStyles } from "./styles";

export default function SimpleBackdrop(props) {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={props.open}>
        <Container maxWidth="xs" className={classes.colorComponente}>
            <Grid container direction="row" justifyContent="center" alignItems="center" >
                <Grid className={classes.rootContainer} item xs={12} > 
                    <CircularProgress size={70} className={classes.circularProgress} color="inherit" />
                    <div className={classes.title}> {props.title ? props.title : 'Cargando ...'}</div>
                </Grid>
            </Grid>
            <div className={classes.lineaDegradadaBottom}></div>
        </Container>      
    </Backdrop>
  );
}