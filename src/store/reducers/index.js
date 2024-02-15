import security from "./security";
import menu from "./menu";
import { combineReducers } from "redux";
import categorias from './categorias';
const allReducers = combineReducers({
  security: security,
  menu: menu,
  categorias,
});

export default allReducers;
