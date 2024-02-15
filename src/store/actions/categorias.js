import {actionNames} from 'constant/index';
const actions = {};

actions.CATEGORIAS_SET_DATA =(state)=>{
    return { type:actionNames.CATEGORIAS_SET_DATA, state};
}

export default actions;


