import { createSlice } from "@reduxjs/toolkit";

const initialState = { "item_index": 0,"item_group_index": 0 };

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuItemGroup: (state, action) => {
            state.item_group_index = action.payload.index;
        },
        setMenuItem: (state, action) => {
            state.item_index = action.payload.index;
        }
    }
});

export const { setMenuItemGroup, setMenuItem } = menuSlice.actions;
export default menuSlice.reducer;