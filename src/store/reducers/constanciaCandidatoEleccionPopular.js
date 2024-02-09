const initialState= {data:[]};

const reducer = (state = initialState, action )=>{
    switch(action.type){
        case "CONSTANCIACANDIDATOELECCIONPOPULAR_SET_DATA":
            var newStateList = Object.assign({}, state);
            newStateList.data=action.state.data;
            return newStateList;
        default:
            return state;
    }
}

export default reducer;