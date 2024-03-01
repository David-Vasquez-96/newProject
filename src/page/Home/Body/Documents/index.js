import React, { useState } from 'react';
import {useStyles} from './style';
import ComponentCircle from './ComponentCircle'
import { useHistory } from "react-router-dom";
import { useSelector , useDispatch } from 'react-redux';
import { saveDataNewCategory } from 'store/reducers/categoriaSlide';

const PageDocuments=(props)=> {
    const classes = useStyles(props);
    const listDocuments = useSelector(state => state.categoria.categoryList);
    const history = useHistory();
    const dispatch = useDispatch();

    const FuncionMostrarListadoDeCategorias = (data) =>{
        dispatch(saveDataNewCategory({id: data?.id, borderColor: data?.borderColor, icon: data?.icon, name: data?.name}));
        history.push("/listadoPorCategorias", {})
    }
    return (
        <div className={classes.DocumentsPrincipal}>
            <h1 className={classes.titlePrincipal} variant="h5" color="initial">{'Documentos'}</h1>
            <p className={classes.titleSecondary} variant="h5" color="initial">{'Navega en las siguientes categorías y encuentra fácilmente los documentos que necesites.'}</p>
            <div className={classes.listDocumentsPrincipal} >
                {
                    listDocuments.map((label, index) =>(
                        <div onClick={()=>FuncionMostrarListadoDeCategorias(label)}>                            
                            <ComponentCircle 
                                title={label.name || 'Título'} 
                                borderColor={label.borderColor}
                                image = {label.icon}
                                key={index}
                            />
                        </div>
                    ))
                }
            </div>
        </div> 
    )
}
export default (PageDocuments);