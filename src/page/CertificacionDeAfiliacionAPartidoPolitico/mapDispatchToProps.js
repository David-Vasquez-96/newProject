import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    CERTIFICACIONDEAFILIACIONAPARTIDOPOLITICO_SET_DATA: (data)=> 
        dispatch({ "type":actionNames.CERTIFICACIONDEAFILIACIONAPARTIDOPOLITICO_SET_DATA,
        "state":{"data":data} 
    }),
});
export default mapDispatchToProps;