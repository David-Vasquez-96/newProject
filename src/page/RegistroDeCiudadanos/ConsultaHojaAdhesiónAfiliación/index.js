import React, { useEffect, useState } from 'react';
import { Divider, ListItemIcon, ListItemText, ListItem, Container, Chip, Grid, List } from '@material-ui/core'
import { PeopleAlt, Filter1, Today, DescriptionOutlined } from '@material-ui/icons';
import Alert from 'react-s-alert';
/********** COMPONENTS **********/
import LoadingSpinner from "component/LoadingSpinner";
import Title from 'component/TitleWithIcon';
import Footer from 'page/Home/Footer2';
/********** FUNCTIONS **********/
import { functions } from "constant/functions";
/********** SERVICES **********/
import ApiServices from 'service/ApiServices';
/********** STYLES **********/
import { useStyles } from './style';

export default function ConsultaHojaAdhesionAfiliacion(props) {
/********** VARIABLES **********/
    const classes = useStyles(props);
    const [controller] = useState('afiliacionesDocumentos'),        
        [loading, setLoading] = useState(false),
        [loadingMessage, setLoadingMessage] = useState('Cargando...'),
        [titleOp, setTitleOp] = useState(''),
        [dataExist, setDataExist] = useState(false),
        [dataHoja, setDataHoja] = useState({
            nameOp: '', numHoja: '', fechaSolicitud: '', fechaAutorizacion: '', status: ''
        });

/********** FUNCTIONS **********/
    useEffect(() => {
        validationSheet()
    }, [])

    const validationSheet = async () => {
        let getURL = props.location.pathname
        var arrayData = getURL.split('/');
        let codigoOp = arrayData[arrayData.length - 2];
        let correlativo = arrayData[arrayData.length - 1]
        setLoading(true);
        try {
            let response = await ApiServices[controller].hojasAdhesionAfiliacion(codigoOp, correlativo);

            if (response.error !== null) {
                Alert.error(response.error.message);
                setDataExist(false)
            } else if (response.data !== "") {
                let hoja = response.data[0];
                let detalle = response.data[1];

                if (hoja.organizacionPoliticaModel.faseOp === 2) {
                    setTitleOp('Adhesión')
                } else if (hoja.organizacionPoliticaModel.faseOp === 3) {
                    setTitleOp('Afiliación')
                }

                setDataHoja({
                    nameOp: hoja.organizacionPoliticaModel.nombreOp, numHoja: hoja.correlativoHoja,
                    fechaSolicitud: detalle.fechaCreacionSolicitud, fechaAutorizacion: detalle.fechaResolucionSolicitud,
                    status: hoja.estadoHojaAfiliacion.descripcion
                });
                setDataExist(true)
            }
            setLoading(false);

        } catch (exception) {
            exception.status === 404
                ? Alert.error("Problemas de conexión, intente de nuevo mas tarde")
                : Alert.error("Problemas de conexión, intente de nuevo mas tarde");
            setLoading(false);
            setDataExist(false)
        }
    }

/********** RENDER **********/
    return (
        <div className={classes.containerPDF}>
            <LoadingSpinner open={loading} message={loadingMessage} ></LoadingSpinner>
            {dataExist ?
                <Container className={classes.container}>
                    <Grid className={classes.colorComponente}>
                        <Grid item xs={12} direction="row" justify="center" alignItems="center">
                            <div className={classes.gridList} >
                                <br />
                                <Title title={"Información de la Hoja de " + titleOp} icon={"/menu/constancia.svg"} />
                                <Divider ></Divider>
                                <List className={classes.rootLista} dense>
                                    <ListItem>
                                        <ListItemIcon className={classes.colorIcon}> <PeopleAlt /> </ListItemIcon>
                                        <ListItemText className={classes.colorIcon} primary="Organización Política: " />
                                        <Chip className={classes.colorChip} label={dataHoja.nameOp} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon className={classes.colorIcon}> <Filter1 /> </ListItemIcon>
                                        <ListItemText className={classes.colorIcon} primary="Número de Hoja: " />
                                        <Chip className={classes.colorChip} label={dataHoja.numHoja} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon className={classes.colorIcon}> <Today /> </ListItemIcon>
                                        <ListItemText className={classes.colorIcon} primary="Fecha de Solicitud: " />
                                        <Chip className={classes.colorChip} label={functions.dateFormatGeneral(dataHoja.fechaSolicitud)} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon className={classes.colorIcon}> <Today /> </ListItemIcon>
                                        <ListItemText className={classes.colorIcon} primary="Fecha de Autorización: " />
                                        <Chip className={classes.colorChip} label={functions.dateFormatGeneral(dataHoja.fechaAutorizacion)} />
                                    </ListItem>                                    
                                    <ListItem>
                                        <ListItemIcon className={classes.colorIcon}> <DescriptionOutlined /> </ListItemIcon>
                                        <ListItemText className={classes.colorIcon} primary="Status de Hoja: " />
                                        <Chip className={classes.colorChip} label={dataHoja.status} />
                                    </ListItem>
                                </List>
                                <Divider ></Divider>
                                <br />
                                <div className={classes.lineaDegradadaBottom}></div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            : <Title title='No existe registro de la hoja' icon={"/menu/infogeneral.svg"} />}
            <Footer />
        </div>
    )
}