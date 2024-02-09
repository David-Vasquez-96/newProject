import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography,
    Divider, 
} from '@material-ui/core/';
import {useStyles} from './style';
import Title from 'component/TitleWithIcon';

export default function AsistenciaTecnica(props) {
    const classes = useStyles();
    const [datosAsisteciaTecnica, setDatosAsistenciaTecnica] = useState([
        {nombre: 'CARLOS ALBERTO SOLORZANO PALACIOS',    extension: '12346'},
        {nombre: 'HUGO RENE PINZON FRANCO',              extension: '12342'},
        {nombre: 'MARCELINO SANCHEZ JUAREZ',             extension: '12347'},
        {nombre: 'OSCAR ABEL ECHEVERRIA BARRERA',        extension: '12345'},
        {nombre: 'OTTO RAUL URBINA CASTRO',              extension: '12343'},
        {nombre: 'PEDRO ANTONIO GONZALEZ CASTAÑEDA',     extension: '12344'},
    ])

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <Title title="Asistencia Técnica" icon={"/assets/AsistenciaTecnica.png"}/>     
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        En caso de necesitar asistencia técnica, puede comunicarse a: 
                    </DialogContentText>                    
                    <Divider />                           
                    <List className={classes.root}>
                        { datosAsisteciaTecnica.map((data) =>(
                            <>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="/assets/AsistenciaTecnica.png" />
                                    </ListItemAvatar>
                                    <ListItemText primary={data.nombre}
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">Télefono: 2378-3900</Typography>
                                                {" — Extensión: "+data.extension}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider />
                            </>
                        ))}
                    </List>                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary" autoFocus variant="outlined">Cerrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
    }
