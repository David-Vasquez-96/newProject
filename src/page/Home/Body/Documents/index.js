import React, { useState } from 'react';
import {useStyles} from './style';
import ComponentCircle from './ComponentCircle'

const PageDocuments=(props)=> {
    const classes = useStyles(props);
    const [listDocuments] = useState([
        {order: 1, borderColor: '#F3650E', icon: 'assets/PerfilUsuario.png', title: 'Instructivos', titleColor: '#034DA1'},
        {order: 1, borderColor: '#36B66F', icon: 'assets/PerfilUsuario.png', title: 'Políticas', titleColor: '#034DA1'},
        {order: 1, borderColor: '#FDBD00', icon: 'assets/PerfilUsuario.png', title: 'Procedimientos', titleColor: '#034DA1'},
        {order: 1, borderColor: '#0080CB', icon: 'assets/PerfilUsuario.png', title: 'Manuales', titleColor: '#034DA1'},
        {order: 1, borderColor: '#921F8F', icon: 'assets/PerfilUsuario.png', title: 'Matrices', titleColor: '#034DA1'},
        {order: 1, borderColor: '#EE4B9A', icon: 'assets/PerfilUsuario.png', title: 'Planes', titleColor: '#034DA1'},
        {order: 1, borderColor: '#921F8F', icon: 'assets/PerfilUsuario.png', title: 'Documentos Especiales', titleColor: '#034DA1'},
        {order: 1, borderColor: '#F3650E', icon: 'assets/PerfilUsuario.png', title: 'Formatos', titleColor: '#034DA1'},
        {order: 1, borderColor: '#36B66F', icon: 'assets/PerfilUsuario.png', title: 'Comunicados', titleColor: '#034DA1'},
        {order: 1, borderColor: '#FDBD00', icon: 'assets/PerfilUsuario.png', title: 'Auditoría', titleColor: '#034DA1'},
    ]);

    return (
        <div className={classes.DocumentsPrincipal}>
            <h1 className={classes.titlePrincipal} variant="h5" color="initial">{'Documentos'}</h1>
            <p className={classes.titleSecondary} variant="h5" color="initial">{'Navega en las siguientes categorías y encuentra fácilmente los documentos que necesites.'}</p>
            <div className={classes.listDocumentsPrincipal}>
                {
                    listDocuments.map((label, index) =>(
                        <ComponentCircle label={label}/>
                    ))
                }
            </div>
        </div> 
    )
}
export default (PageDocuments);