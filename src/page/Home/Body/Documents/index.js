import React, { useState } from 'react';
import {useStyles} from './style';
import ComponentCircle from './ComponentCircle'
import { useSelector } from 'react-redux';

const PageDocuments=(props)=> {
    const classes = useStyles(props);
    const listDocuments = useSelector(state => state.categoria.categoryList);

    return (
        <div className={classes.DocumentsPrincipal}>
            <h1 className={classes.titlePrincipal} variant="h5" color="initial">{'Documentos'}</h1>
            <p className={classes.titleSecondary} variant="h5" color="initial">{'Navega en las siguientes categorías y encuentra fácilmente los documentos que necesites.'}</p>
            <div className={classes.listDocumentsPrincipal}>
                {
                    listDocuments.map((label, index) =>(
                        <ComponentCircle 
                            title={label.name || 'Título'} 
                            borderColor={label.borderColor}
                            image = {label.icon}
                            key={index}
                        />                        
                    ))
                }
            </div>
        </div> 
    )
}
export default (PageDocuments);