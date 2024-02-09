import React, { useState } from 'react';
import {useStyles} from './style';
import { Description } from '@material-ui/icons';
import { Card, Typography } from '@material-ui/core';

const LandingUSer=(props)=> {
    const classes = useStyles(props);
    const [listDocuments] = useState([
        {order: 1, borderColor: '5px solid #F3650E', icon: 'assets/PerfilUsuario.png', iconColor: '#034DA1', title: 'Instructivos', titleColor: '#034DA1'},
        {order: 1, borderColor: '5px solid #36B66F', icon: 'assets/PerfilUsuario.png', iconColor: '#034DA1', title: 'Políticas', titleColor: '#034DA1'},
        {order: 1, borderColor: '5px solid #FDBD00', icon: 'assets/PerfilUsuario.png', iconColor: '#034DA1', title: 'Procedimientos', titleColor: '#034DA1'},
        {order: 1, borderColor: '5px solid #0080CB', icon: 'assets/PerfilUsuario.png', iconColor: '#034DA1', title: 'Manuales', titleColor: '#034DA1'},
        {order: 1, borderColor: '5px solid #921F8F', icon: 'assets/PerfilUsuario.png', iconColor: '#034DA1', title: 'Matrices', titleColor: '#034DA1'},
        {order: 1, borderColor: '5px solid #EE4B9A', icon: 'assets/PerfilUsuario.png', iconColor: '#034DA1', title: 'Planes', titleColor: '#034DA1'},
        {order: 1, borderColor: '5px solid #921F8F', icon: 'assets/PerfilUsuario.png', iconColor: '#034DA1', title: 'Documentos Especiales', titleColor: '#034DA1'},
        {order: 1, borderColor: '5px solid #F3650E', icon: 'assets/PerfilUsuario.png', iconColor: '#034DA1', title: 'Formatos', titleColor: '#034DA1'},
        {order: 1, borderColor: '5px solid #36B66F', icon: 'assets/PerfilUsuario.png', iconColor: '#034DA1', title: 'Comunicados', titleColor: '#034DA1'},
        {order: 1, borderColor: '5px solid #FDBD00', icon: 'assets/PerfilUsuario.png', iconColor: '#034DA1', title: 'Auditoría', titleColor: '#034DA1'},
    ]);
    return (
        <div className={classes.DocumentsPrincipal}>
            <h1 className={classes.titlePrincipal} variant="h5" color="initial">{'Documentos'}</h1>
            <p className={classes.titleSecondary} variant="h5" color="initial">{'Navega en las siguientes categorías y encuentra fácilmente los documentos que necesites.'}</p>
            <div className={classes.listDocumentsPrincipal}>
                {
                    listDocuments.map((label, index) =>(
                        <div className={classes.listDocumentsSecondary}>                            
                            <Card className={classes.cardPrincipal} style={{border: label.borderColor, }} elevation={14}>
                                <img className={classes.mobileIcon} style={{color: label.iconColor}} src={label.icon} />
                            </Card>
                            <div className={classes.containerTitle}>                                
                                <Typography className={classes.cardTitle} style={{color: label.titleColor}}>{label.title}</Typography>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* <p className={classes.titleSecondary} variant="h5" color="initial">{'Navega en las siguientes categorías y encuentra fácilmente los documentos que necesites.'}</p> */}

        </div> 
    )
}
export default (LandingUSer);