import React, { useState, useEffect } from "react";
import { Folder, LibraryAdd, LibraryAddCheck, Description, Send } from '@material-ui/icons';
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
import PropTypes from 'prop-types';
import Alert from "react-s-alert";
/********** COMPONENTS **********/
import TitleWithIconBar from 'component/TitleWithIcon';
import IngresarAdherentes from './IngresarAdherente';
import PaquetesOperados from "./PaquetesOperados";
import PaquetesEnviados from "./PaquetesEnviados";
import PaquetesCreados from "./PaquetesCreados";
import CrearPaquete from './CrearPaquete';
/********** SERVICES **********/
import ApiServices from "service/ApiServices";
/********** STYLES **********/
import { useStyles } from './style';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`scrollable-force-tabpanel-${index}`} aria-labelledby={`scrollable-force-tab-${index}`} {...other} >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return { id: `scrollable-force-tab-${index}`, 'aria-controls': `scrollable-force-tabpanel-${index}` };
}

export default function ScrollableTabsButtonForce(props) {
    /********** VARIABLES **********/
    const classes = useStyles();
    const [descriptionArray, setDescriptionArray] = useState([
        'Para agregar adherentes ingrese el número de la hoja y presione el botón "Buscar hoja".',
        'Para crear un paquete nuevo, primero seleccione las hojas que quiere agregar.',
        'Si el paquete se encuentra listo, presione el botón "Enviar Paquete" para iniciar el proceso de Depuración.',
        'Descargue la constancia en la columna "Documentos" y adjuntela al paquete físico para su entrega.',
        'Cuando la dependencia de Organizaciones Políticas depure la información el "Estado" del paquete se mostrará como "Paquete Operado".']);
    const [value, setValue] = useState(0);
    const [faseOPData, setFaseOpData] = useState("");
    const [controller] = useState('solicitudHojasAdhesion');
    var authenticated = props.authenticated;

    /********** FUNCTIONS **********/
    useEffect(() => {
        checkAutorizationList()
    }, []);

    const handleChange = (event, newValue) => { setValue(newValue); };
    
    const checkAutorizationList = async () => {
        try {
            const hasPermission = await ApiServices.userSecurity.hasPermission(controller, "list");
            if (hasPermission.error) {
                Alert.error(hasPermission.error);
            } else {
                let response = await ApiServices[controller].listRegister();
                if (response.error !== null) Alert.error(response.error.message);
                else if (response.data !== "") {
                    setFaseOpData(response.data.dataOp);
                }
                if (response.data.dataOp.faseOp === 3) {
                    setDescriptionArray(['', ' ', ' ', '', ''])
                }
            }
        } catch (exception) {
            exception.status === 404 ? Alert.warning("Intente de nuevo") : Alert.error("Intente de nuevo");
        }
    }

    /********** RENDER **********/
    return (
        <div className={classes.root}>
            <TitleWithIconBar title="Solicitudes de registro de adhesión" description={descriptionArray[value]} icon={"/menu/Constancia.png"} />
            <br /> <br />
            <AppBar position="static" color="default" elevation={0}>
                <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="on" indicatorColor="primary"
                    textColor="primary" aria-label="scrollable force tabs example">
                    <Tab label="Ingresar Adherentes" icon={<LibraryAdd />} {...a11yProps(0)} />
                    <Tab label="Crear Paquete" icon={<Description />} {...a11yProps(1)} />
                    <Tab label="Paquetes Creados" icon={<Folder />} {...a11yProps(2)} />
                    <Tab label="Paquetes Enviados" icon={<Send />} {...a11yProps(3)} />
                    <Tab label="Paquetes Operados" icon={<LibraryAddCheck />} {...a11yProps(4)} />
                </Tabs>
            </AppBar>
            {/* Ingreso Adherentes*/}
            <TabPanel value={value} index={0}>
                <IngresarAdherentes faseOpData={faseOPData} />
            </TabPanel>
            {/* Crear Paquete */}
            <TabPanel value={value} index={1}>
                <CrearPaquete faseOpData={faseOPData} />
            </TabPanel>
            {/* Paquetes Creados */}
            <TabPanel value={value} index={2}>
                <PaquetesCreados faseOpData={faseOPData} />
            </TabPanel>
            {/* Paquetes Enviados */}
            <TabPanel value={value} index={3}>
                <PaquetesEnviados authenticated={authenticated} currentUser={props.currentUser} />
            </TabPanel>
            {/* Paquetes Operados */}
            <TabPanel value={value} index={4}>
                <PaquetesOperados authenticated={authenticated} currentUser={props.currentUser} />
            </TabPanel>
            <br /> <br /> <br />
        </div>
    );
}