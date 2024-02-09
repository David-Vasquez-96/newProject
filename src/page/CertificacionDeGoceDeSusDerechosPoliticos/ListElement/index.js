import React, { useState, useEffect } from 'react';
import {ListItem, List, Divider, ListItemText, ListItemAvatar, Typography, Box, Avatar} from '@material-ui/core/';
import {useStyles} from './style';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import {currency} from 'constant/index';
import DetailInformation from './DetailInformation';
import {Icon, Button, Chip} from '@material-ui/core/';
import ApiServices from 'service/ApiServices';
import Alert from 'react-s-alert';
import {functions} from 'constant/index';
import Pagination from "react-pagination-list";
import {Assignment, Timer} from '@material-ui/icons';
import DoneIcon from '@material-ui/icons/Done';
const ListElement=(props)=> {
    const classes = useStyles(props);    
    const [data, setData] = React.useState(props.data);
    const splitDate = (date) => {
        if(date !== undefined){
            var arr1 = date.split('-');
            var arr2 = arr1[2].split('T');
            var finalDate = arr2[0]+'/'+arr1[1]+'/'+arr1[0] ;
            return finalDate;              
        }
    }
    const handleDelete = () => {
        console.info('');
    };    
    useEffect(() => {  
        setData(props.data);
    });
 
    return (
        <div>
        <List className={classes.root}>
            <div >
            { data.length > 0 ?                
                <Pagination
                    data={data}
                    pageSize={5}
                    renderItem={(row, key) => 
                    <div key={key}>
                        <div className={classes.centrarChip}>
                            <Chip  label={"Solicitud # "+row.id} 
                                clickable
                                color="primary"
                                variant="outlined"
                            />
                        </div>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}><Assignment /></Avatar>
                            </ListItemAvatar>                            
                            <ListItemText
                                secondary={
                                    <React.Fragment>
                                        <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">{"DPI: "}</Typography>
                                        <Typography component="span" variant="body2" color="textPrimary">{row.cui}</Typography>
                                        <br></br>
                                        <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">{"Nombre: "}</Typography>
                                        <Typography component="span" variant="body2" color="textPrimary">{row.nombre}</Typography>
                                        <br></br>
                                        <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">{"Fecha de solicitud: "}</Typography>
                                        <Typography component="span" variant="body2" color="textPrimary">{splitDate(row.fechaSolicitud)}</Typography>
                                        <br></br>
                                        {
                                            (row.fechaResolucion===null) ? "": 
                                                (
                                                    <div>
                                                        <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">{"Fecha de resolución: "}</Typography>
                                                        <Typography component="span" variant="body2" color="textPrimary">{splitDate(row.fechaResolucion)}</Typography>
                                                        <br></br>
                                                    </div>
                                                )                                                 
                                        }                                                                                          
                                        <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">{"Estado: "}</Typography>
                                        <Typography component="span" variant="body2" color="textPrimary">
                                            {
                                                (row.esVerificado===true && row.esRechazado===false) ? 
                                                    (
                                                        <Chip variant="outlined" label="Solicitud Aceptada" clickable
                                                            color="primary" deleteIcon={<DoneIcon />} onDelete={handleDelete}
                                                        />                                                                                                                        
                                                    ) : (row.esVerificado===true && row.esRechazado===true) ? 
                                                    (
                                                        <Chip variant="outlined" label="Solicitud Rechazada" clickable
                                                            color="secondary" onDelete={handleDelete}
                                                        />                                                            
                                                    ) :
                                                        (<Chip icon={<Timer />} label="En proceso" variant="outlined"/>) 
                                            }  
                                        </Typography>
                                        <br/>
                                        {
                                            (row.esVerificado===true && row.esRechazado===true) ? 
                                                (
                                                    <div>
                                                        <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">{"Observación: "}</Typography>
                                                        <Typography component="span" variant="body2" color="textPrimary">{row.observacion}</Typography>
                                                        <br></br>
                                                    </div>
                                                ) : ""
                                        }                                              
                                        <Typography component="span" variant="body2" color="textPrimary">
                                            {
                                                (row.esVerificado===true && row.esRechazado===false) ? 
                                                < div className={classes.margen}>
                                                    <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">{"Archivo: "}</Typography>
                                                    <Button variant="outlined" size="small" color="primary"
                                                        endIcon={<Icon>get_app</Icon>}
                                                        onClick={async()=>{
                                                            let response =  await ApiServices.certificacionDeGoceDeSusDerechosPoliticos.openFile(row.id);
                                                            if (response.error!=null) Alert.error("Intente de nuevo");
                                                            else functions.downloadPDFFromStringBase64(response.data.base64,"Certificación de afiliación a partidos políticos.pdf"); 
                                                        }}
                                                    >Descargar</Button>
                                                </div>
                                                :
                                                    ""
                                            }                                  
                                        </Typography>
                                        <br></br>
                                        <div className={classes.lineaDegradadaBottom}></div>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </div>
                    }
                />
                    :<div className={classes.centrarMensaje}> <strong>No existen registros de solicitudes. </strong> </div>
                }                                
            </div>                        
        </List>
          
        <br/>
        <Divider/>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(ListElement);