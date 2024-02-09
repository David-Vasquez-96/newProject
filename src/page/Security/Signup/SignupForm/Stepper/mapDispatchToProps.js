import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    SIGNUP_SET_STEP: (step)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_STEP,"state":{"step":step}}),
    SIGNUP_SET_DATA: (data)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_DATA,"state":{"data":data}}),
    });
    
export default mapDispatchToProps;