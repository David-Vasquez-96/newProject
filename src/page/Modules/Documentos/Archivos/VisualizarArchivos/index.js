import React, { useState } from 'react';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import FileViewer from 'react-file-viewer';


const ComponenteVisualizarArchivo=(props)=> {   
    const classes = useStyles();
    console.log('visualizar archivo: ', props.data)
    return (
        <DialogoPersonalizado 
            open={props.open}
            fullScreen={true}
            closeModal={props.closeModal}
            iconToolbar={props.iconToolbar}
            titleToolbar={props.titleToolbar}
        >
            <div className={classes.containerPrincipalCategoria}>
                {
                        (props.data?.base64 && props.data?.formato==='.pdf') ? (
                            <FileViewer fileType={'pdf'} filePath={props.data?.base64} />
                        ): (props.data?.base64 && props.data?.formato==='.xlsx') ? (
                            <FileViewer fileType={'xlsx'} filePath={props.data?.base64} />
                        ): (props.data?.base64 && props.data?.formato==='.docx') ? (
                            <FileViewer fileType={'docx'} filePath={props.data?.base64} />
                        ): (props.data?.base64 && props.data?.formato==='.jpg') ? (
                            <FileViewer fileType={'jpg'} filePath={props.data?.base64} />
                        ): (props.data?.base64 && props.data?.formato==='.jpeg') ? (
                            <FileViewer fileType={'jpeg'} filePath={props.data?.base64} />
                        ): (props.data?.base64 && props.data?.formato==='.png') ? (
                            <FileViewer fileType={'png'} filePath={props.data?.base64} />
                        ): (props.data?.base64 && props.data?.formato==='.svg') ? (
                            <FileViewer fileType={'svg'} filePath={props.data?.base64} />
                        ): (props.data?.base64 && props.data?.formato==='.mp4') ? (
                            <FileViewer fileType={'mp4'} filePath={props.data?.base64} />
                        ):(
                            <div>
                                {/* <Title title={props.message} icon={""}/> */}
                                <img className={classes.img} alt="complex" src="/assets/pdf.png" />
                            </div>                            
                        )                    
                }
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteVisualizarArchivo);