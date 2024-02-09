import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent, Slide, DialogTitle, DialogContentText } from '@material-ui/core/';
import { Close } from '@material-ui/icons'
import { useStyles } from './style';
import './style.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const classes = useStyles();
    const [menuActive, setMenuState] = React.useState(false);

    React.useEffect(() => {
        if (props.openModal === true) {
            changeAnimationStatus();
            setTimeout(function () { closeModal() }, 4000);
        }
    }, [props.openModal])

    const closeModal = () => {
        props.handCloseModal();
    }

    const changeAnimationStatus = () => {
        setMenuState(!menuActive)
        setTimeout(function () { setMenuState(false) }, 10);
    }

    return (
        <div>
            <Dialog open={props.openModal} TransitionComponent={Transition} keepMounted onClose={closeModal}
                aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                <Close className={classes.closeIcon} onClick={closeModal} />
                {(props.success || props.typeAlert === "success") ? (
                    <div className={menuActive ? "hide" : "check_mark_main"}>
                        <div class="sa-icon_main sa-success animate">
                            <span className="sa-line sa-tip animateSuccessTip"></span>
                            <span className="sa-line sa-long animateSuccessLong"></span>
                            <div className="sa-placeholder"></div>
                            <div className="sa-fix"></div>
                        </div>
                    </div>
                ) : ('')
                }
                {(props.error || props.typeAlert === "error") ? (
                    <div className={menuActive ? "hide" : "check_mark_main"}>
                        <div className="sa-icon_main sa-delete animate">
                            <span className="sa-line sa-tipDelete animateErrorTip"></span>
                            <span className="sa-line sa-longDelete animateErrorLong"></span>
                            <div className="sa-placeholderDelete"></div>
                            <div className="sa-fixDelete"></div>
                        </div>
                    </div>
                ) : ('')
                }
                {(props.warning || props.typeAlert === "warning") ? (
                    <div className={menuActive ? "hide" : "check_mark_main"}>
                        <div className="sa-icon_main sa-warning animate">
                            <span className="sa-line sa-tipWarning animateWarningTip"></span>
                            <span className="sa-line sa-longWarning animateWarningLong"></span>
                            <div className="sa-placeholderWarning"></div>
                            <div className="sa-fixWarning"></div>
                        </div>
                    </div>
                ) : ('')
                }
                {props.question ? (
                    <div className={menuActive ? "hide" : "check_mark_main"}>
                        <div className="sa-icon_main sa-confirmation animate">
                            <div className="sa-line-box sa-circleConfirmation animateConfirmationCircle"></div>
                            <span className="sa-line sa-tipConfirmation animateConfirmationTip"></span>
                            <span className="sa-line sa-longConfirmation animateConfirmationLong"></span>
                            <div className="sa-placeholderConfirmation"></div>
                            <div className="sa-fixConfirmation"></div>
                        </div>
                    </div>
                ) : ('')
                }
                <DialogTitle className={classes.title} id="alert-dialog-slide-title">
                    {props.title}
                </DialogTitle>
                <DialogContent className={classes.description}>
                    <DialogContentText className={classes.messageModal} id="alert-dialog-slide-description">
                        {props.mensaje}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}