import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'User',
    initialState: {
        loggedIn: false,
        userInfo: null
    },
    reducers: {
        setUser: (proxy, { payload }) => {
            if ( !payload )
                return {
                    loggedIn: false,
                    userInfo: payload || null
                }

                return {
                    loggedIn: true,
                    userInfo: payload
                }
        },
        removeUser: (proxy, { payload }) => {
                return {
                    loggedIn: false,
                    userInfo: payload?.innerData || null
                }
        }
    }
})


export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;