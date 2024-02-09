import React from 'react';
import {AppBar, Toolbar, ButtonBase} from '@material-ui/core/';
import {useStyles} from './style';

const LandingUSer=(props)=> {
    const classes = useStyles(props);
    return (
        <div className={classes.headerPrincipal}>
            <img className={classes.img} alt="complex" src={"/assets/userComputer.png"} />
            <h1 className={classes.h1} variant="h5" color="initial">{'Bienvenidos a Zona de Conocimiento'}</h1>
            {/* <div className={classes.backgroundImagee}/> */}
        </div> 
    )
}
export default (LandingUSer);