import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    CONSTANCIACANDIDATOELECCIONPOPULAR_SET_DATA: (data)=> 
        dispatch({ "type":actionNames.CONSTANCIACANDIDATOELECCIONPOPULAR_SET_DATA,
        "state":{"data":data} 
    }),
});
export default mapDispatchToProps;