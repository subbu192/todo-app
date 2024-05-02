import { createSlice } from "@reduxjs/toolkit";

interface ViewState {
    sidebar: boolean,
    todoarea: boolean,
    tododetails: boolean
};

const viewstate: ViewState = {
    sidebar: true,
    todoarea: true,
    tododetails: true
};

const viewstateSlice = createSlice({
    name: "viewstate",
    initialState: viewstate,
    reducers: {
        updateViewState: (state, action) => {
            state.sidebar = action.payload.sidebar,
            state.todoarea = action.payload.todoarea,
            state.tododetails = action.payload.tododetails
        }
    },
});

export const { updateViewState } = viewstateSlice.actions;

export default viewstateSlice.reducer;