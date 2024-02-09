import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    CONSTANCIAAFILIACIONAPARTIDOSPOLITICOS_SET_DATA: (data)=> 
        dispatch({ "type":actionNames.CONSTANCIAAFILIACIONAPARTIDOSPOLITICOS_SET_DATA,
        "state":{"data":data} 
    }),
});
export default mapDispatchToProps;