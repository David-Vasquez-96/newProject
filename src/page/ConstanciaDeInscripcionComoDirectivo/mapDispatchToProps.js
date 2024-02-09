import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    CONSTANCIADEINSCRIPCIONCOMODIRECTIVO_SET_DATA: (data)=> 
        dispatch({ "type":actionNames.CONSTANCIADEINSCRIPCIONCOMODIRECTIVO_SET_DATA,
        "state":{"data":data} 
    }),
});
export default mapDispatchToProps;