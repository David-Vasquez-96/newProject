import React from 'react';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import ComponentCard from 'page/Home/Body/Procesos/ComponentCard'

const ComponenteVisualizarProceso=(props)=> {   
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
                    <ComponentCard 
                        title={props?.data?.title} 
                        backgroundColor={props?.data?.backgroundColor}
                        image = {props?.data?.image}
                    />
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteVisualizarProceso);