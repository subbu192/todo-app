import { createSlice } from "@reduxjs/toolkit";

interface User {
    userid: number,
    username: string,
    usermail: string
};

const user: User = {
    userid: 0,
    username: '',
    usermail: ''
};

const userSlice = createSlice({
    name: "user",
    initialState: user,
    reducers: {
        updateUser: (state, action) => {
            state.userid = action.payload.userid,
            state.username = action.payload.username,
            state.usermail = action.payload.usermail
        },
    },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;