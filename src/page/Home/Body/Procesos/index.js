import React, { useState } from 'react';
import {useStyles} from './style';
import { Card, Typography } from '@material-ui/core';
import ComponentCard from './ComponentCard'

const PageProcess=(props)=> {
    const classes = useStyles(props);
    const [listDocuments] = useState([
        {order: 1, backgroundColor:'#F3650E', icon: 'assets/subir.svg', title: 'Instructivos', titleColor: '#034DA1'},
        {order: 1, backgroundColor:'#36B66F', icon: 'assets/subir.svg', title: 'Políticas', titleColor: '#034DA1'},
        {order: 1, backgroundColor:'#FDBD00', icon: 'assets/subir.svg', title: 'Procedimientos', titleColor: '#034DA1'},
        {order: 1, backgroundColor:'#0080CB', icon: 'assets/subir.svg', title: 'Manuales', titleColor: '#034DA1'},
        {order: 1, backgroundColor:'#921F8F', icon: 'assets/subir.svg', title: 'Matrices', titleColor: '#034DA1'},
        {order: 1, backgroundColor:'#EE4B9A', icon: 'assets/subir.svg', title: 'Planes', titleColor: '#034DA1'},
        {order: 1, backgroundColor:'#921F8F', icon: 'assets/subir.svg', title: 'Documentos Especiales', titleColor: '#034DA1'},
        {order: 1, backgroundColor:'#F3650E', icon: 'assets/subir.svg', title: 'Formatos', titleColor: '#034DA1'},
        {order: 1, backgroundColor:'#36B66F', icon: 'assets/subir.svg', title: 'Comunicados', titleColor: '#034DA1'},
        {order: 1, backgroundColor:'#FDBD00', icon: 'assets/subir.svg', title: 'Auditoría', titleColor: '#034DA1'},
    ]);
    var anchoDePantalla = window.innerWidth;

    return (
        <div className={classes.DocumentsPrincipal}>
            <h1 className={classes.titlePrincipal} variant="h5" color="initial">{'Procesos'+ anchoDePantalla}</h1>
            <p className={classes.titleSecondary} variant="h5" color="initial">{'Selecciona uno de los subprocesos y explora los documentos que necesitas.'}</p>
            <div className={classes.listDocumentsPrincipal}>
                {
                    listDocuments.map((label, index) =>(
                        <ComponentCard label={label}/>
                    ))
                }
            </div>

        </div> 
    )
}
export default (PageProcess);