import React from 'react';
import {useStyles} from './style';
import Header from './Header/index'
import Documents from './Documents'
const LandingUSer=(props)=> {
    const classes = useStyles(props);
    return (
        <div className={classes.BodyPrincipal}>
            <Header />
            <Documents />
        </div> 
    )
}
export default (LandingUSer);