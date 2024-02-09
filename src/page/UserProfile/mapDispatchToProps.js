import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    CERTIFICACIONDEGOCEDESUSDERECHOSPOLITICOS_SET_DATA: (data)=> 
        dispatch({ "type":actionNames.CERTIFICACIONDEGOCEDESUSDERECHOSPOLITICOS_SET_DATA,
        "state":{"data":data} 
    }),
});
export default mapDispatchToProps;