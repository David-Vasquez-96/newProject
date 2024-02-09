const initialState = { tabsAdhesion: 0 };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SOLICITUDHOJASADHESIONTABSADHESION":
            var newStateTabs = Object.assign({}, state);
            newStateTabs.tabsAdhesion = action.state.tabsAdhesion;
            return newStateTabs;
        default:
            return state;
    }
}

export default reducer;