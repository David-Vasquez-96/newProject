import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({ 
    SET_MENU_ITEM_GROUP: (index)=> dispatch(
        {   "type":actionNames.SET_MENU_ITEM_GROUP,
            "state":{"index":index} 
        }
    )
});
export default mapDispatchToProps;