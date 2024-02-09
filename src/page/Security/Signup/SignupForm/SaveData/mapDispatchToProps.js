import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    SIGNUP_SET_STEP: (step)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_STEP,"state":{"step":step}}),
    SIGNUP_SET_TOKEN_RECAPCHA: (tokenRecaptcha)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_TOKEN_RECAPCHA,"state":{"tokenRecaptcha":tokenRecaptcha}}),
    SIGNUP_SET_RECAPTCHA_STATUS: (RecaptchaStatus)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_RECAPTCHA_STATUS,"state":{"RecaptchaStatus":RecaptchaStatus}}),
    SIGNUP_SET_FILE_BY_INDEX: (index,base64)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_FILE_BY_INDEX,
            "state":{"index":index, "base64": base64}}),
    SIGNUP_SET_DATA: (data)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_DATA,"state":{"data":data}}),     
    });
    
export default mapDispatchToProps;