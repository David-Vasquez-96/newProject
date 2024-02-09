import React, {useState} from 'react';
import {Grid, Card, CardActionArea, CardContent, Divider, IconButton } from '@material-ui/core/';
import {useStyles} from './styles';
import {Visibility} from '@material-ui/icons';
import Base64Pdf from '../base64pdf';

function Card64Pdf(props) {
    const classes = useStyles(props),
    [verPDF, setVerPDF] = useState(false),
    [datosPDF, setDatosPDF] = useState({pdf:'', title:'',});

    const VerPDF =(datosPDF)=>{
        if(!datosPDF?.pdf || !datosPDF?.title) return null;
        setDatosPDF({pdf: datosPDF?.pdf, title: datosPDF?.title})
        setVerPDF(true)
    }
    const CerrarVerPDF =()=>{
        setVerPDF(false)
    }

    return (
        <div>
            <Grid container className={classes.rootGrid} justifyContent="center" >
                <Grid item>
                    <Card className={classes.rootCard} >
                        <CardActionArea>
                            <div className={classes.contentMedia}>
                            {props.pdf ? (
                                <iframe src={props.pdf.includes('base64,') ? props.pdf : `data:application/pdf;base64,${props.pdf}`} width="100%" height="100%" allowFullScreen loading={"lazy"}/>
                            ) : (
                                <img
                                    width="80%" height="80%"
                                    alt="img to upload file"
                                    src={props.src ? props.src : "/assets/simboloPdf.svg"}
                                />
                            )}
                            </div>
                            {props.showTitle && (
                                <CardContent  className={classes.cardContent}>
                                    <Grid item xs={12}>
                                        <div className={classes.centerTitle}><Divider /> <strong>{props.label}</strong> <Divider /></div>
                                    </Grid >
                                </CardContent>
                            )}
                        </CardActionArea>
                        <IconButton size={"medium"} className={classes.iconVisibility} onClick={()=>VerPDF({pdf: props.pdf, title: props.label})}><Visibility  style={{ fontSize: 30 }} /></IconButton>
                    </Card>
                </Grid>
                <Base64Pdf pdf={datosPDF.pdf} title={datosPDF.title} open={verPDF} handleClose={CerrarVerPDF}  showDownloadButton={props.showDownloadButton} src={props.src} />
            </Grid>
        </div>
    );
}

Card64Pdf.defaultProps = {
    showInMovil : false
}

export default Card64Pdf;