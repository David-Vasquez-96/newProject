import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    SIGNUP_SET_STEP: (step)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_STEP,"state":{"step":step}}),
    });
    
export default mapDispatchToProps;