import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { client1 } from "../../api/client";
import { AuthDataType, AuthStateType, loginInitialLoad, parseAuthData, parseAuthError, registerInitialLoad, userAuthParamType } from "./authUtilities";

const initialValue: AuthStateType = {
    status: "idle",
    data: {
        isAuth: false,
        access_token: false,
        username: false,
        firstname: false,
        lastname: false,
        fullname: false
    },
    error: false
}

const AuthSlice = createSlice(
    {
        name: "auth",
        initialState: initialValue,
        reducers: {
            resetStatusNError: state => {
                state.status = "idle";
                state.error = false;
            },
            unSetAuth: state => {
                state.data = initialValue.data;
            },
            setError: (state, action: { payload: string, type: string }) => {
                state.error = action.payload
            },
            setAuth: {
                reducer(state, action:PayloadAction<AuthDataType>){
                    state.data = action.payload
                },
                prepare(access_token:string){
                    return {
                        payload: parseAuthData(access_token)
                    };
                },
            }
        },
        extraReducers(builder) {
            builder.addCase(authUser.pending, (state) => {
                state.status = "loading"
            })
            builder.addCase(authUser.fulfilled, (state, action) => {
                state.status = "completed";
                state.data = action.payload
            })
            builder.addCase(authUser.rejected, (state, action) => {
                state.status = "failed";
                state.data = initialValue.data;
                state.error = action.error?.message || "login failed";
            })
            builder.addCase(logoutUser.fulfilled, state=>{
                state.data = initialValue.data
            })
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async()=>{
        try {
            await client1.get("/auth/logout");
            return;
        } catch (error) {
            console.log("logout failed")
            console.log(error)
        }
    }
)

export const authUser = createAsyncThunk(
    'auth/authUser',
    async ({action, initialPayload}:userAuthParamType) => {
        try {
            let result;
            if (action === "login") {
                result = await client1.post("/auth/login", initialPayload as loginInitialLoad);
            } else{
                result = await client1.post("/auth/register", initialPayload as registerInitialLoad);
            }
            console.log(result.data);
            return parseAuthData(result.data.accToken);
        } catch (error) {
            throw new Error(parseAuthError(error as Error))
        }
    }
)

export const { resetStatusNError, unSetAuth, setError, setAuth } = AuthSlice.actions;

export default AuthSlice.reducer;