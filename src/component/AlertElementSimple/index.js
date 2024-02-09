import React from 'react';
import { useStyles } from './style';
import './style.css';

export default function AlertDialogSlide(props) {
    const classes = useStyles();
    const [menuActive, setMenuState] = React.useState(false);

    React.useEffect(()=> {
        if (props.openModal === true) {
            changeAnimationStatus();
        }
    }, [props.openModal])
    
    const changeAnimationStatus = () => {
        setMenuState(!menuActive)
        setTimeout(function () { setMenuState(false) }, 10);
    }
        
    return (
        <div>
            {props.success ? (
                <div className={menuActive ? "hide" : "check_mark"}>
                    <div class="sa-icon sa-success animate">
                        <span className="sa-line sa-tip animateSuccessTip"></span>
                        <span className="sa-line sa-long animateSuccessLong"></span>
                        <div className="sa-placeholder"></div>
                        <div className="sa-fix"></div>
                    </div>
                </div>
            ) : ('')
            }
            {props.error ? (
                <div className={menuActive ? "hide" : "check_mark"}>
                    <div className="sa-icon sa-delete animate">
                        <span className="sa-line sa-tipDelete animateErrorTip"></span>
                        <span className="sa-line sa-longDelete animateErrorLong"></span>
                        <div className="sa-placeholderDelete"></div>
                        <div className="sa-fixDelete"></div>
                    </div>
                </div>
            ) : ('')
            }
            {props.warning ? (
                <div className={menuActive ? "hide" : "check_mark"}>
                    <div className="sa-icon sa-warning animate">
                        <span className="sa-line sa-tipWarning animateWarningTip"></span>
                        <span className="sa-line sa-longWarning animateWarningLong"></span>
                        <div className="sa-placeholderWarning"></div>
                        <div className="sa-fixWarning"></div>
                    </div>
                </div>
            ) : ('')
            }
            {props.question ? (
                <div className={menuActive ? "hide" : "check_mark"}>
                    <div className="sa-icon sa-confirmation animate">   
                        <div className="sa-line-box sa-circleConfirmation animateConfirmationCircle"></div>
                        <span className="sa-line sa-tipConfirmation animateConfirmationTip"></span>
                        <span className="sa-line sa-longConfirmation animateConfirmationLong"></span>
                        <div className="sa-placeholderConfirmation"></div>
                        <div className="sa-fixConfirmation"></div>
                    </div>
                </div>
            ) : ('')
            }
        </div>
    );
}