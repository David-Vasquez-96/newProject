import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        "&>h6":{
            fontSize: "1.5rem",
        }
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
            </IconButton>
        ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
    return (
        <div>
            <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
                <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
                    Información para el usuario
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom style={{textAlign: 'justify'}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;De conformidad con el artículo 9 de la Ley Electoral y de Partidos Políticos y artículo 4
                        del Reglamento de la Ley Electoral y de Partidos Políticos y Decreto No. 1-2023 del Tribunal Supremo Electoral
                    </Typography>
                    <Typography gutterBottom style={{textAlign: 'justify'}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Todo ciudadano requiere estar inscrito en el Registro de Ciudadanos con anticipación no menor de tres meses
                        al evento de Elecciones Generales y de Diputados al Parlamento Centroamericano 2023
                    </Typography>
                    <Typography gutterBottom style={{textAlign: 'justify'}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Por lo que se informa que dicho plazo concluyo el 25 de marzo de 2023, por lo que si su solicitud de
                        creación de usuario es para solicitar su inscripción de ciudadano en el Registro de Ciudadanos de este Tribunal,
                        no podrá  ser procesada ante el vencimiento del plazo.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' autoFocus onClick={props.handleClose} color="primary">
                        ok, he entendido
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
