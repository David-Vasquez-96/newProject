import React, { useEffect,useRef } from "react";
import { useStyles } from "./style";
import ReCAPTCHA from "react-google-recaptcha";
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';

const Recapcha = (props)=> {
    const   classes = useStyles(),
            reCaptcha = useRef(),
            siteKeyReCaptcha="6LdGFmkaAAAAAIseqTvJnS1GiGMIrH9qtlpfifhG";

    const setTokenRecapcha=(value)=>{
        props.SIGNUP_SET_TOKEN_RECAPCHA(value);
    }

    const clearTokenRecapcha=()=>{
        props.SIGNUP_SET_TOKEN_RECAPCHA("");
    }
    
    useEffect(() => {
        if(props.tokenRecaptcha === "") {            
            reCaptcha.current.reset()             
        }
    },[props.tokenRecaptcha]);

    return (
        <div>  
            <div className={classes.root}>
                <ReCAPTCHA  ref={reCaptcha} size="normal"
                            sitekey={siteKeyReCaptcha}
                            onChange={setTokenRecapcha}
                            onExpired={clearTokenRecapcha}
                />
          </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (Recapcha);