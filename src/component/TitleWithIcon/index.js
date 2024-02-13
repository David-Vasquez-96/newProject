import React from 'react';
import { useStyles } from "./style";
import {Grid, AppBar, Toolbar, ButtonBase} from '@material-ui/core'

export default function Title(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" elevation={0}>
                <Toolbar variant="dense" className={classes.AppBar}>
                <Grid container direction="row" justify="center" alignItems="center">
                    {
                        props.icon ? (
                            <Grid item xs={12} > { props.icon }</Grid>                            
                        ): props.image ? (
                            <Grid item xs={12} >
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={props.image} />
                                </ButtonBase>
                            </Grid>
                        ):('')
                    }
                        <h1 className={classes.h1} variant="h5" color="initial">{props.title}</h1>   
                </Grid>
                </Toolbar>
            </AppBar> 
            <div className={classes.lineaDegradadaBottom}></div>
        </div>
    );
}