import React, { useEffect, useState } from 'react'
import { withGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { RECATPCHA_KEY, RECAPTCHA_PROJECT_ID, RECAPTCHA_API_KEY, REACT_APP_API_RECATPCHA, ACTION_RECAPTCHA} from 'constant'
import UploadDocs from '../Upload';
import SaveData from 'page/Security/Signup/SignupForm/SaveData';
import DialogLoadingMessage from 'component/BackDropCustom';
import { CssBaseline } from '@material-ui/core';

const ReCaptchaComponent =  (props) => {
  const [token, setToken] = useState(undefined);
  const [loadingMessage, setLoadingMessage] = useState({loading: false, title:''})
  
  const getToken = async () => {
    const {executeRecaptcha} = props.googleReCaptchaProps;
    const tokenStorage = sessionStorage.getItem("recatpcha")
    setToken(tokenStorage)
    if (!tokenStorage && executeRecaptcha) {
      const token = await executeRecaptcha(ACTION_RECAPTCHA);
      sessionStorage.setItem('recatpcha', token);
      setToken(token)
    }
  };

  const sendRecaptcha = async () => {
    setLoadingMessage({loading: true, title: 'Procesando solicitud. Espere un momento ...'})        

    const GoogleVerifyUrlRecaptcha = `${REACT_APP_API_RECATPCHA}/v1beta1/projects/${RECAPTCHA_PROJECT_ID}/assessments?key=${RECAPTCHA_API_KEY}`;

    const data = {
        "event": {
          "token": token,
          "siteKey": RECATPCHA_KEY,
          "expectedAction": ACTION_RECAPTCHA,
        }
    }

    try {
        const response = await fetch(GoogleVerifyUrlRecaptcha, {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const dataResponse = await response.json();

        if(dataResponse?.error) {
          setLoadingMessage({loading: false, title: ''})        
          return {status: false, error: 'invalid_key'};
        }

        if(response.status === 200 && dataResponse) {
          const {event, tokenProperties} = dataResponse;
          if(tokenProperties.action !== event?.expectedAction || !tokenProperties.valid) {
            setLoadingMessage({loading: false, title: ''})        
            return {status: false, error: ''};

          } else {
            setLoadingMessage({loading: false, title: ''})        
            return {status: true, error: ''};
          }
        } else{
          setLoadingMessage({loading: false, title: ''})        
            return {status: false, error: ''};
        }
    } catch (error) {
      setLoadingMessage({loading: false, title: ''})        
        return {status: false, error: 'invalid_key'};
    }

  };
  return (
    <div>
        <CssBaseline />
        <DialogLoadingMessage open={loadingMessage.loading} title={loadingMessage.title}/>
        <UploadDocs/>
        {/* <Recapcha/> */}
        <SaveData googleReCaptchaProps={props.googleReCaptchaProps} sendRecaptcha={sendRecaptcha} getToken={getToken} />
    </div>
  )
}

export const WithGoogleRecaptcha  = withGoogleReCaptcha(ReCaptchaComponent);


