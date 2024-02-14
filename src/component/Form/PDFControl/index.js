import React, { Fragment, useState } from 'react';
import BotonPersonalizado from 'component/BotonNormal'
import {useStyles} from './styles';
import { InsertDriveFile } from '@material-ui/icons';
import MostrarPDFModal from 'component/PdfModal'
import ApiServices from 'service/ApiServices';
import { showMessagePersonalizedPosition } from 'service/SweetAlert';

export default function FormControlFile(props) {
    const [dataModal, setDataModal] = useState({open:false, base64:'', message:''})
    const ObtenerDocumentosEnPDF = async () => {
        try {
            let response =  await ApiServices[props.controller].obtenerDocumento(props.value);
            if (response.error!=null) {
                setDataModal({open: true, base64: '', message:response.error.message})
                // showMessagePersonalizedPosition('warning', 'Oops!', response.error.message, 'center')
            }else {
                if(response.data === ""){
                    setDataModal({open: true, base64: '', message:''})
                }else{
                    setDataModal({open: true, base64: response.data})
                }
            }        
        } catch (error) {
            showMessagePersonalizedPosition('error', 'Oops!', error.message, 'center')
        }
    }
    const cerrarModal = () => {
        setDataModal({open: false, base64: ''})
    }    
    return (
        <div style={{width: '100%', display:'flex', justifyContent: 'center', margin: '15px 0px 0px 0px'}}>
            <MostrarPDFModal 
                open={dataModal.open} 
                handleClose={cerrarModal} 
                title={props.label}
                base64={dataModal.base64}
                message={dataModal.message}
            />                                   
            {props?.showInputFile && (
                    <BotonPersonalizado title={props.label} botonPersonalizado={true} function={ObtenerDocumentosEnPDF} icon={<InsertDriveFile />} />
            )}
        </div>
    )
}

FormControlFile.defaultProps = {
    showInputFile: true,
    fileType : 'pdf'
}