import React from 'react';
import {useStyles} from './style';
import Header from './Header/index'
import Documents from './Documents'
import Process from './Procesos'

const LandingUSer=(props)=> {
    const classes = useStyles(props);
    return (
        <div className={classes.BodyPrincipal}>
            <Header />
            <Documents />
            <Process />
        </div> 
    )
}
export default (LandingUSer);