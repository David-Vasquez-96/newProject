import React, {useState} from 'react';
import {Grid, Card, CardActionArea, CardContent, CardMedia, Divider, IconButton } from '@material-ui/core/';
import {useStyles} from './styles';
import {Visibility} from '@material-ui/icons';
import ModalImage from 'component/ImageModal';

function Card64Image(props) {
    const classes = useStyles(props),
    [verImagen, setVerImagen] = useState(false),
    [datosImagen, setDatosImagen] = useState({image:'', title:'',});

    const VerImagen =(datosImagen)=>{
        if(!datosImagen?.image || !datosImagen?.title) return null;
        setDatosImagen({image: datosImagen?.image, title: datosImagen?.title})
        setVerImagen(true)
    }
    const CerrarVerImagen =()=>{
        setVerImagen(false)
    }

    return (
        <div>
            <Grid container className={classes.rootGrid} justifyContent="center" >
                <Grid item className={classes.itemGrid}>
                    <Card className={classes.rootCard}>
                        <CardActionArea>
                            <div className={classes.contentMedia}>
                                <CardMedia
                                    className={classes.media}
                                    alt="image"
                                    image={props.image ? props.image.includes('base64,') ? props.image : `data:image/jpeg;base64,${props.image}` : props.src}
                                    title={props.title}
                                    onClick={()=>VerImagen({image: props.image, title: props.label})}
                                />
                            </div>
                            <CardContent  className={classes.cardContent}>
                            {props.showTitle && (
                                <Grid item xs={12}>
                                    <div className={classes.centerTitle}><Divider /> <strong>{props.label}</strong> <Divider /></div>
                                </Grid >
                            )}
                            </CardContent>
                        </CardActionArea>
                        <IconButton size={"medium"} className={classes.iconVisibility} onClick={()=>VerImagen({image: props.image, title: props.label})}><Visibility  style={{ fontSize: 30 }} /></IconButton>
                    </Card>
                    {props.showTitle2 && (
                    <CardContent  className={classes.cardContent}>
                        <Grid item xs={12}>
                            <div className={classes.centerTitle2}><Divider /> <strong >{props.title}</strong> <Divider /></div>
                        </Grid >
                    </CardContent>
                    )}
                </Grid>
                <ModalImage base64={datosImagen.image} title={datosImagen.title} open={verImagen} handleClose={CerrarVerImagen} showDownloadButton={props.showDownloadButton} src={props.src} />
            </Grid>
        </div>
    );
}

Card64Image.propsDefault = {
    src: "/assets/simboloPdf.svg",
    showTitle : true
}
export default Card64Image;