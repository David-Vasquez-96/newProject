import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ApiServices from 'service/ApiServices';
import Alert from 'react-s-alert';
import {Icon, Button, CircularProgress } from '@material-ui/core/';
import {NoteAdd, HighlightOff, Description} from '@material-ui/icons'
import {useStyles} from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles();

    const save =async ()=>{
        setLoading(true);
        try{
            let response = await ApiServices.constanciaCandidatoEleccionPopular.createRegister({});
            if (response.error!==null) Alert.error(response.error.message);
            else {
                Alert.success("Solicitud guardada");
                props.handleClose();
            }
        }catch(exception){
            //console.log("exeption",exception);
            Alert.error("Error al guardar la solicitud");
        }
        setLoading(false);
    }

    return (
        <div>
            <Dialog     open={props.open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={props.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description">
                <DialogTitle className={classes.title} id="alert-dialog-slide-title"><Description fontSize="large"/>{"Confirme la creación de su solicitud de constancia."}</DialogTitle>
                <DialogContent className={classes.description}>
                    <DialogContentText id="alert-dialog-slide-description">
                        Para generar una solicitud de constancia de postulación a cargo de elección popular, debe hacer clic en el botón "Crear solicitud"
                    </DialogContentText>
                </DialogContent>
        
                <DialogActions className={classes.dialogActions}>
                    <Button onClick={props.handleClose} color="secondary" variant="contained" endIcon={<HighlightOff />}>
                        Cancelar
                    </Button>
                    <Button onClick={save} color="primary" variant="contained" endIcon={<NoteAdd />}>
                        {loading ?  (<div className={classes.circularProgress}><CircularProgress /></div>) : "" }
                        Crear solicitud
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}