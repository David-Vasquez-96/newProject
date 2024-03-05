import React from 'react';
import {useStyles} from './style';
import { Card, Typography } from '@material-ui/core';
import { ViewCarousel } from '@material-ui/icons';

const ComponenteCardListadoPorProceso=(props)=> {
    const classes = useStyles(props);
    return (
        <Card className={classes.contendorCard}>
            <div className={classes.iconos}>
                {/* <ViewCarousel fontSize="large"/>
                <ViewCarousel fontSize="large"/> */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,192L84.7,32L169.4,96L254.1,128L338.8,256L423.5,64L508.2,64L592.9,256L677.6,160L762.4,64L847.1,128L931.8,288L1016.5,224L1101.2,128L1185.9,192L1270.6,32L1355.3,256L1440,320L1440,0L1355.3,0L1270.6,0L1185.9,0L1101.2,0L1016.5,0L931.8,0L847.1,0L762.4,0L677.6,0L592.9,0L508.2,0L423.5,0L338.8,0L254.1,0L169.4,0L84.7,0L0,0Z"></path></svg>
            </div>
            <div className={classes.containerImage}>      
                {
                    (props.data?.formato === '.pdf') ?
                        <img className={classes.mobileIcon} src={'assets/pdf2.png'} />
                    : (props.data?.formato === '.xlsx') ?
                        <img className={classes.mobileIcon} src={'assets/excel.png'} />
                    : (props.data?.formato === '.docx') ?
                        <img className={classes.mobileIcon} src={'assets/word.png'} />
                    : (props.data?.formato === '.png') ?
                        <img className={classes.mobileIcon} src={'assets/imagen.png'} />
                    : (props.data?.formato === '.mp4') ?
                        <img className={classes.mobileIcon} src={'assets/video.png'} />
                    : null
                }
                <Typography className={classes.cardTitle}>{props?.data?.name}</Typography>
            </div>
            <Typography className={classes.cardSubTitle}>Última actualización: {props?.data?.publicacion}</Typography>
        </Card>
    )
}
export default (ComponenteCardListadoPorProceso);