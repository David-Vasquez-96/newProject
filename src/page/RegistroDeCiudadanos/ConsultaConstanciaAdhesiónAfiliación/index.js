import React, { useEffect, useState } from 'react';
import { Divider, ListItemIcon, ListItemText, ListItem, Container, Chip, Grid, List } from '@material-ui/core'
import { PeopleAlt, Today, DescriptionOutlined } from '@material-ui/icons';
import Alert from 'react-s-alert';
/********** COMPONENTS **********/
import LoadingSpinner from "component/LoadingSpinner";
import Title from 'component/TitleWithIcon';
import Footer from 'page/Home/Footer2';
/********** SERVICES **********/
import ApiServices from 'service/ApiServices';
/********** SYYLES **********/
import { useStyles } from './style';

export default function ConsultaConstanciaAdhesionAfiliacion(props) {
/********** VARIABLES **********/
    const classes = useStyles(props);
    const [controller] = useState('afiliacionesDocumentos'),
        [loading, setLoading] = useState(false),
        [dataExist, setDataExist] = useState(false),
        [data, setData] = useState();

/********** FUNCTIONS **********/
    useEffect(() => {
        validationSheet()
    }, [])

    const validationSheet = async () => {
        let getURL = props.location.pathname
        var arrayData = getURL.split('/');
        let cve = arrayData[arrayData.length - 1];
        setLoading(true);
        try {
            let response = await ApiServices[controller].constanciaAdhesionAfiliacion(cve);

            if (response.error !== null) {
                Alert.error(response.error.message);
                setDataExist(false)
            } else if (response.data !== "") {
                setData(response.data);                
                setDataExist(true)
            }
            setLoading(false);
        } catch (exception) {
            exception.status === 404
                ? Alert.error("Problemas de conexión, intente de nuevo mas tarde")
                :Alert.warning("Problemas de conexión, intente de nuevo mas tarde");
            setLoading(false);
            setDataExist(false)
        }
    }

/********** RENDER **********/
    return (
        <div className={classes.containerPDF}>
            {loading && <LoadingSpinner open={loading}></LoadingSpinner>}
            {dataExist ?
                <Container className={classes.container}>
                    <Grid className={classes.colorComponente}>
                        <Grid item xs={12} direction="row" justify="center" alignItems="center">
                            <div className={classes.gridList} >
                                <br />
                                <Title title={"Información del Documento"} icon={"/menu/constancia.svg"} />
                                <Divider ></Divider>
                                <List className={classes.rootLista} dense>
                                    <ListItem>
                                        <ListItemIcon className={classes.colorIcon}> <PeopleAlt /> </ListItemIcon>
                                        <ListItemText className={classes.colorIcon} primary="Organización Política: " />
                                        <Chip className={classes.colorChip} label={data.nameOp} />
                                    </ListItem>                                    
                                    <ListItem>
                                        <ListItemIcon className={classes.colorIcon}> <Today /> </ListItemIcon>
                                        <ListItemText className={classes.colorIcon} primary="Fecha y Hora de Solicitud: " />
                                        <Chip className={classes.colorChip} label={data.fechaSolicitudCreacion} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon className={classes.colorIcon}> <Today /> </ListItemIcon>
                                        <ListItemText className={classes.colorIcon} primary="Fecha y Hora de Resolución: " />
                                        <Chip className={classes.colorChip} label={data.fechaSolicitudResolucion} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon className={classes.colorIcon}> <DescriptionOutlined /> </ListItemIcon>
                                        <ListItemText className={classes.colorIcon} primary="Estado del Documento: " />
                                        <Chip className={classes.colorChip} label={data.statusSolicitud} />
                                    </ListItem>
                                </List>
                                <Divider ></Divider>
                                <br />
                                <div className={classes.lineaDegradadaBottom}></div>
                            </div>
                        </Grid>
                    </Grid>
                </Container> : <Title title='No existe registro del Documento' icon={"/menu/infogeneral.svg"} />}
                <Footer />
        </div>
    )
}