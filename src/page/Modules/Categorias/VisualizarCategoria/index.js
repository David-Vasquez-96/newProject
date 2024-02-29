import React, { useState } from 'react';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import ComponentCircle from 'page/Home/Body/Documents/ComponentCircle'

const ComponenteVisualizarCategoria=(props)=> {   
    const classes = useStyles();
    return (
        <DialogoPersonalizado 
            open={props.open}
            fullScreen={false}
            closeModal={props.closeModal}
            iconToolbar={props.iconToolbar}
            titleToolbar={props.titleToolbar}
        >
            <div className={classes.containerPrincipalCategoria}>
                    <ComponentCircle 
                        title={props?.data?.name} 
                        borderColor={props?.data?.borderColor}
                        image = {props?.data?.icon}
                    />
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteVisualizarCategoria);