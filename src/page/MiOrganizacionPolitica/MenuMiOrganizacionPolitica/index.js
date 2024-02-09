import React from 'react';
import PropTypes from 'prop-types';
import {Paper , Tabs, AppBar, Typography, Box, withStyles} from '@material-ui/core/';
import MuiTab from '@material-ui/core/Tab';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import EqualizerIcon from '@material-ui/icons/Equalizer';
//components
import { useStyles } from "./styles";
import InformacionGeneral from '../InformacionGeneral/index'
import DatosDeAfiliados from '../DatosDeAfiliaciones/index'
import Los40AfiliadosPorMunicipios from '../Los40AfiliadosPorMunicipios'
import ReporteAsambleasOPASAM from '../ReporteAsambleasOPASAM'
import ReporteDeComites from '../ReporteDeComites'
import { Description } from '@material-ui/icons';

const Tab = withStyles({
	root: {
        "&$selected": {
            backgroundColor: "#1D5079",
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        },
        "&$selected:hover": {
            backgroundColor: "#1D5079",
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        },
        "&:hover": {
            backgroundColor: "black",
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        }
	},
	selected: {}
  })(MuiTab);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`scrollable-force-tabpanel-${index}`} aria-labelledby={`scrollable-force-tab-${index}`} {...other}>
            {value === index && (
                <Box p={2}> <Typography>{children}</Typography> </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node, index: PropTypes.any.isRequired, value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

export default function ScrollableTabsButtonForce() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper  className={classes.root} elevation={0}>
            <AppBar position="static" color="white" elevation={0}>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    indicatorColor="primary" 
                    textColor="primary"
                    scrollButtons="on"
                    variant="scrollable"
                    aria-label="scrollable force tabs example"
                >
                    {/* <Tab label="Información General" icon={<ContactMailIcon />} {...a11yProps(0)} /> */}
                    <Tab label="Información General" icon={<Description/>} {...a11yProps(0)} />
                    <Tab label="Listado de Afiliados" icon={<Description/>} {...a11yProps(1)} />
                    <Tab label="Total de afiliados de los 40" icon={<Description/>} {...a11yProps(2)} />
                    {/* <Tab label="Reporte de Asambleas OPASAM" icon={<img className={classes.img} alt="complex" src={"/assets/ReporteAsambleas.png"} />} {...a11yProps(3)} /> */}
                    {/* <Tab label="Reporte de Comites" icon={<img className={classes.img} alt="complex" src={"/assets/ReporteComites.png"} />} {...a11yProps(4)} /> */}
                </Tabs>
            </AppBar>
            {/* Informacion general */}
            <TabPanel value={value}  index={0}>
                <InformacionGeneral/>
            </TabPanel>
            {/* Datos de afiliados */}
            <TabPanel value={value} index={1}>
                <DatosDeAfiliados/>
            </TabPanel>
            {/* los 40, afiliados por municipios */}
            <TabPanel value={value} index={2}>
                <Los40AfiliadosPorMunicipios/>
            </TabPanel>
            {/* Reporte de asambleas opasam */}
            {/* <TabPanel value={value} index={3}>
                <ReporteAsambleasOPASAM/>
            </TabPanel> */}
            {/* Reporte de comites */}
            {/* <TabPanel value={value} index={4}>
                <ReporteDeComites/>
            </TabPanel> */}
        </Paper >
    );
}