import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    LOGOUT: ()=> dispatch({ "type":actionNames.LOGOUT,"state":{} }),
    SET_MENU: (menu)=> dispatch({ "type":actionNames.SET_MENU,
                                        "state":{"menu":menu,
                                                } 
                                    }),
    SIGNUP_SET_STEP: (step)=> 
        dispatch({ "type":actionNames.SIGNUP_SET_STEP,"state":{"step":step}}),                                    
});
export default mapDispatchToProps;