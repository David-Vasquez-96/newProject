import React, { useState, useEffect } from "react";
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
import { Folder, LibraryAdd } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Alert from "react-s-alert";
/********** COMPONENTS **********/
import SolicitudesProcesadas from './SolicitudesProcesadas';
import TitleWithIconBar from 'component/TitleWithIcon';
import LoadingSpinner from "component/LoadingSpinner";
import StatusDescription from "../StatusDescription";
import SolicitudesNuevas from './SolicitudesNuevas';
/********** SERVICES **********/
import ApiServices from "service/ApiServices";
/********** STYLES **********/
import { makeStyles } from '@material-ui/core/styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`scrollable-force-tabpanel-${index}`} aria-labelledby={`scrollable-force-tab-${index}`} {...other}>
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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    lineaDegradadaBottom: {
        position: "relative",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 4,
        background: `linear-gradient(344deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`,
    },
}));

export default function ScrollableTabsButtonForce() {
/********** VARIABLES **********/
    const classes = useStyles();
    const [controller] = useState('solicitudHojasAdhesion'),
        [descriptionArray, setDescriptionArray] = useState([' ', ' ', ' ']),
        [authorized, setAuthorized] = useState(true),
        [loading, setLoading] = useState(false),
        [dataOp, setDataOp] = useState(""),
        [value, setValue] = useState(0);

/********** FUNCTIONS **********/
    useEffect(() => {
        showList()
    }, []);

    /*  Este método únicamente se utiliza para obtener la faseOP del usuario logueado, para permitir o no el acceso a la ventana */
    const showList = async () => {
        try {
            setLoading(true);
            const hasPermission = await ApiServices.userSecurity.hasPermission(controller, "listFilter");
            if (hasPermission.error) {
                setLoading(false);
                setAuthorized(false)
            } else {
                ApiServices[controller].orderCriteria.clear();
                ApiServices[controller].orderCriteria.addAsc("fechaCreacionSolicitud");
                ApiServices[controller].searchCriteria.clear();
                ApiServices[controller].searchCriteria.setOperator("or");
                ApiServices[controller].searchCriteria.addEquals("idEstadoSolicitud", 1);
                ApiServices[controller].searchCriteria.addEquals("idEstadoSolicitud", 2);

                let response = await ApiServices[controller].listFilter();
                if (response.error !== null) Alert.error(response.error.message);
                else if (response.data !== "") {
                    setDataOp(response.data);
                    if (response.data.dataOp.faseOp != 3) {
                        setDescriptionArray(['Para realizar una nueva solicitud de hojas de adhesión presione el botón "Crear Solicitud"', ' ', ' '])
                    }
                }
                setAuthorized(true)
                setLoading(false);
            }
        } catch (exception) {
            exception.status === 404 ? Alert.warning("Intente de nuevo") : Alert.warning("Intente de nuevo ");
            setLoading(false);
            setAuthorized(false)
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

/********** RENDER **********/
    return (
        <div className={classes.root}>
            {loading && (<LoadingSpinner open={loading}></LoadingSpinner>)}
            <TitleWithIconBar title="Solicitud de Hojas de Adhesión" icon={"/menu/Constancia.png"} description={descriptionArray[value]} />
            <AppBar position="static" color="default" elevation={0}>
                <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="on" indicatorColor="primary" textColor="primary"
                    aria-label="scrollable force tabs example">
                    <Tab label="Nuevas Solicitudes" icon={<LibraryAdd />} {...a11yProps(0)} />
                    <Tab label="Solicitudes Procesadas" icon={<Folder />} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            {/* Solicitudes de Adhesion*/}
            <TabPanel value={value} index={0}>
                <SolicitudesNuevas data={dataOp} authorized={authorized} />
            </TabPanel>
            {/* Solicitudes de Adhesion Procesadas*/}
            <TabPanel value={value} index={1}>
                <SolicitudesProcesadas />
            </TabPanel>
            <StatusDescription />
            <div className={classes.lineaDegradadaBottom}></div>
            <br /><br /><br /><br />
        </div>
    );
} 