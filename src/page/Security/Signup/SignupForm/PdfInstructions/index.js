import React, {useEffect, useState} from "react";
import { useStyles } from "./style";
import {Accordion, AccordionDetails, AccordionSummary, } from "@material-ui/core/";
import {Grid, Paper, Typography, ButtonBase, CssBaseline} from "@material-ui/core/";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function PdfInstructions(props) {
    const classes = useStyles();
    const carData = [
        {
            id: 1,
            title:'TÉRMINOS Y CONDICIONES',
            text: "Los presentes términos y condiciones rigen el uso de los servicios que el Tribunal Supremo Electoral, en adelante sera denominado como TSE, ofrece al ciudadano "+
            "y que ha puesto a su disposición a través del Portal Web de Servicios Digitales del Tribunal Supremo Electoral que se podrá abreviar como Portal Web, con base al objeto y funciones para los que fue creado."+
            " Al usar el Portal Web para realizar gestiones, inscripciones u obtener certifcaciones, usted acepta los términos y condiciones. Asimismo, estos servicios estarán sujetos a todas las disposiciones reguladas en el Decreto "+
            "1-85, Ley Electoral y de Partidos Políticos que establece todo lo relativo al ejercicio de los derechos políticos, lineamientos y gestiones correspondientes al proceso electoral y de acuerdo a la implementación de esta "+
            "plataforma informática, facilita el acceso a gestiones electrónicas dotándolas de seguridad jurídica"
        },
        {
            id: "2",
            title:'RESPONSABILIDAD DE LA CONTRASEÑA',
            text: "La contraseña de acceso al Portal Web de Servicios Digitales del Tribunal Supremo Electoral, registrada por el usuario es de carácter personal e intransferible, al utilizar el servicio, el ciudadano está obligado a manejar con "+
            "confidencialidad su acceso, entendiendo que es el responsable por la utilización del mismo o de la información a la que se tiene acceso, en el caso de que la contraseña haya sido expuesta, debe proceder a cambiarla de "+
            "inmediato utilizando la opción prevista para tal fin en el Portal Web. El ciudadano acepta y es consciente de su total responsabilidad por cualquier consulta u operación realizada a través del Portal Web en su nombre.",
        },
        {
            id: "3",
            title:'PRIVACIDAD Y PROTECCIÓN DE DATOS',
            text: "El TSE tiene acceso exclusivo a la información ingresada por el ciudadano y será utilizada como se consigno en el formulario de registro. En el caso que, sea necesario modificar sus datos, podrá realizarlo a través de los "+
            "medios que el Tribunal Supremo Electoral defina para el efecto, de forma electrónica o presencial según sea el caso. El ciudadano acepta que el TSE utilice los datos personales suministrados a través del Portal Web para uso "+
            "exclusivo y específico de las gestiones que esté realizando ante el Tribunal Supremo Electoral. El TSE utilizará los datos proporcionados únicamente para los fines y propósitos establecidos en la normativa "+
            "vigente e implementará los niveles de seguridad para asegurar su adecuado uso y protección.",
        },
        {
            id: "4",
            title:'RESPONSABILIDAD DE ACCESO',
            text: "El ciudadano es el único responsable por el funcionamiento y seguridad del equipo, software y conexión hacia los servicios que el TSE presta por Internet. El TSE no es responsable de daños o perjuicios que pudieran "+
            "derivar de problemas o fallas motivadas por causas ajenas al TSE, tales como problemas del servicio de los proveedores de telecomunicaciones o software malicioso que pudiera infectar por medio de Internet los equipos de los ciudadanos."
        },
        {
            id: "5",
            title:'CAMBIOS EN LOS TÉRMINOS Y CONDICIONES',
            text: "El TSE se reserva el derecho de modifcar en cualquier momento las condiciones generales de uso del Portal Web. Todo cambio en los términos y condiciones serán informados a través del Portal Web y al correo "+
            "electrónico principal del ciudadano, por lo tanto, se le recomienda consultar periódicamente las presentes condiciones generales de uso de la misma."
        }
    ];

    const [expanded, setExpanded] = useState(true);

    const handleChange = (panel) => (event, isExpanded) => {
        // setExpanded(isExpanded ? panel : false);
        setExpanded(panel);
    };

    useEffect(() => {

    },[])
    return (
        <div className={classes.root}>
            <CssBaseline />
            <h3 >Términos y Condiciones para el uso del sistema del Portal Web TSE.</h3>
            {carData.map((data) => (               
                <Accordion expanded={'panel'+data.id === 'panel'+data.id} onChange={handleChange('panel'+data.id)}>
                    <AccordionSummary
                        // expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={classes.accordionSummary}
                    >
                        <Typography className={classes.heading}>{data.title}</Typography>
                        {/* <Typography className={classes.secondaryHeading}>Ver detalle.</Typography> */}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{data.text}</Typography>
                    </AccordionDetails>
                </Accordion>                
            ))}
        </div>
    );
}
