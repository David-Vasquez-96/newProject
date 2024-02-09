import React, { useEffect, useState } from 'react';
import {useStyles} from './style';
import IconElement from 'component/IconElement';
import {Divider, Backdrop , CircularProgress,ListItemIcon, ListItemText, ListItem, Container, Chip, Grid, List, Icon, Button } from '@material-ui/core'
import {AccountCircle, Description, Filter1, Today } from '@material-ui/icons';
import Footer from 'page/Home/Footer2';
import ApiServices from 'service/ApiServices';
import Alert from 'react-s-alert';
import Title from 'component/TitleWithIcon';
import {functions} from 'constant/index';

const ValidarSolicitud = (props) => {
    const classes = useStyles(props);
    const [openProgress, setOpenProgress] = React.useState(false);
    const [getBase64PDF, setGetBase64PDF] = useState()
    const [userData, setUserData] = useState({})
    const [imagen, setImagen] = useState('')
    const [desactivarBoton, setDesactivarBoton] = useState(false)

    const ObtenerBase64PDF = async () => {
        setOpenProgress(true)
        let getURL = props.location.pathname
        var getCVEPDF = getURL.split('/');
        try {
            let response = await ApiServices.validarCertificacion.autorizacion(getCVEPDF[3]);
            if(response.error === null){
                setDesactivarBoton(false)
                setUserData(response.data)
                setImagen("/menu/Constancia.png")
                setGetBase64PDF(response.data.base64)
                setOpenProgress(false)
            }else{
                setDesactivarBoton(true)
                Alert.error(response.error)
                setUserData({tipo: response.error.message})
                setImagen("/menu/infogeneral.svg")
                setOpenProgress(false)
            }
        } catch (error) {
            Alert.warning("Intente de nuevo")
            setOpenProgress(false)
        }
    }

    useEffect(() => {        
        ObtenerBase64PDF();
    }, [])
    return (
        <div className={classes.containerPDF}>
            <Title title={userData.tipo} icon={imagen} />
            <div>
                <Backdrop className={classes.backdrop} open={openProgress}>
                    Cargando certificado ...
                    <CircularProgress color="inherit"></CircularProgress>
                </Backdrop>            
            </div> 
            <Container className={classes.container}>        
                <Grid className={classes.colorComponente}>
                    <Grid item xs={12} direction="row" justify="center" alignItems="center">
                        <div className={classes.gridList} >
                            <br/>
                            <Title title="Información" icon={"/menu/constancia.svg"}/>
                            <Divider ></Divider>
                            <List className={classes.rootLista} dense>
                                <ListItem>
                                    <ListItemIcon className={classes.colorIcon}> <Today /> </ListItemIcon>
                                    <ListItemText className={classes.colorIcon} primary="Fecha resolución: " />
                                    <Chip className={classes.colorChip} label={userData.fecha} />                                
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon className={classes.colorIcon}> <Filter1 /> </ListItemIcon>
                                    <ListItemText className={classes.colorIcon} primary="CUI del DPI: " />
                                    <Chip className={classes.colorChip} label={userData.cui} />                                
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon className={classes.colorIcon}> <AccountCircle /> </ListItemIcon>
                                    <ListItemText className={classes.colorIcon} primary="Nombre completo: " />
                                    <Chip className={classes.colorChip} label={userData.name} />                                
                                </ListItem>
                            </List>
                            <Divider ></Divider>
                            <br/>
                            <Button variant="outlined" size="small" color="primary"
                                endIcon={<Icon>get_app</Icon>} disabled={desactivarBoton}
                                onClick={()=>{
                                    functions.downloadPDFFromStringBase64(getBase64PDF,"Documento para la habilitación de servicios.pdf"); 
                                }}
                            >Descargar</Button><br/><br/>
                            <div className={classes.lineaDegradadaBottom}></div>
                        </div>
                    </Grid>
                </Grid>               
            </Container>                            
            <Footer />
        </div>
    ) 
}
export default ValidarSolicitud;