import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useStyles} from './style';
import { Divider, Typography } from '@material-ui/core';

const ComponeneteFooter=(props)=> {
    const classes = useStyles(props); 
    const [items] = useState([
        {title: 'Políticas de Privacidad', to: '/'},
        {title: 'Términos y Condiciones', to: '/'},
        // {title: '', to: '/'},
    ])
    const [datosEmpresa] = useState([
        {data: 'Soporte'},
        {data: 'Tel: 12345678 Ext. 4452'},
        {data: 'Correo: projectx@gmail.com'},
    ])
    return (
        <div className={classes.ContainerPrincipal}>
            <div className={classes.containerZero}>
                <img className={classes.mobileIcon} src={'assets/PerfilUsuario.png'} />
                <h1 className={classes.titlePrincipal} variant="h5" color="initial">{'Project X'}</h1>
            </div>
            <Divider className={classes.dividerHorizontal}/>
            <Divider className={classes.dividerVertical} orientation="vertical" />
            <div className={classes.containerFirstSection}>
                {
                    items.map((label, index)=>(
                        <Typography variant="h6" className={classes.titleContent} key={index}>
                            <Link className={classes.link} to={label.to} >{label.title}</Link>
                        </Typography>
                    ))
                }
            </div>
            <Divider className={classes.dividerHorizontal}/>
            <Divider className={classes.dividerVertical} orientation="vertical" />
            <div className={classes.containerSecondSection}>
                {
                    datosEmpresa.map((label, index)=>(
                        <Typography variant="h6" className={classes.titleContent} key={index}>{label.data}</Typography>
                    ))
                }                    
            </div>
        </div> 
    )
}
export default (ComponeneteFooter);