import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    SIGNUP_SET_TOKEN_RECAPCHA: (tokenRecaptcha)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_TOKEN_RECAPCHA,"state":{"tokenRecaptcha":tokenRecaptcha}}),
    SIGNUP_SET_RECAPTCHA_STATUS: (RecaptchaStatus)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_RECAPTCHA_STATUS,"state":{"RecaptchaStatus":RecaptchaStatus}}),
    });
    
export default mapDispatchToProps;