import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { awaiting } from "../shared/utils"
import { AppState } from "./store"
import {
    apiFetchCurrentUser,
    apiLogIn,
    apiLogOut,
    apiSignUp,
    apiUpdateClient,
    LogInPayload,
    LogInResponse,
    RequestResponse,
    SignUpPayload,
    SignUpResponse
} from "../shared/utils/api"

export type RoleType = 'admin' | 'dispatcher' | 'courier' | 'client'

export interface Role {
    id: number
    name: string
    type: RoleType
}

export interface User {
    id?: number
    name?: string
    role?: Role | null
    // client
    phoneNumber?: string
    email?: string
    password?: string
    passwordConfirmation?: string
}

interface InitialState {
    user: User | null
    access_token: string | null
}

const initialState: InitialState = {
    user: null,
    access_token: localStorage.getItem('access_token')
}


export const fetchCurrentUser = createAsyncThunk("app/getUser", async (payload, { getState }) => {

    const state = getState()

    // @ts-ignore
    if (!state.app.access_token) { // <void, {getState: () => {app: InitialState}}>
        return null
    }

    // @ts-ignore
    if (state.app.access_token === 'access_token_client') {
        return await awaiting({
            status: '',
            data: {
                id: 28,
                name: 'Заболотная Наталья',
                role: {
                    id: 1,
                    name: 'Client',
                    type: 'client'
                },
                phoneNumber: '89525831096',
                email: 'vincent1890@mail.ru'
            }
        })
    }

    // @ts-ignore
    if (state.app.access_token === 'access_token_courier') {
        return await awaiting({
            status: '',
            data: {
                id: 28,
                name: 'Заболотная Наталья',
                role: {
                    id: 1,
                    name: 'Courier',
                    type: 'courier'
                },
                phoneNumber: '89525831096',
                email: 'vincent1890@mail.ru'
            }
        })
    }

    // @ts-ignore
    if (state.app.access_token === 'access_token_admin') {
        return await awaiting({
            status: '',
            data: {
                id: 28,
                name: 'Заболотная Наталья',
                role: {
                    id: 1,
                    name: 'Administarator',
                    type: 'admin'
                },
                phoneNumber: '89525831096',
                email: 'vincent1890@mail.ru'
            }
        })
    }
    
    // @ts-ignore
    if (state.app.access_token === 'access_token_dispatcher') {
        return await awaiting({
            status: '',
            data: {
                id: 28,
                name: 'Заболотная Наталья',
                role: {
                    id: 1,
                    name: 'Dispatcher',
                    type: 'dispatcher'
                },
                phoneNumber: '89525831096',
                email: 'vincent1890@mail.ru'
            }
        })
    }

})

export const logIn = createAsyncThunk("app/login", async ({ email, password }: LogInPayload) => {

    const access_token = email === 'client@company.com' ? 'access_token_client' : 
    email === 'courier@company.com' ? 'access_token_courier' :
    email === 'admin@company.com' ? 'access_token_admin' :
    email === 'dispatcher@company.com' ? 'access_token_dispatcher' :
    'undefined'

    return await awaiting({
        status: '',
        data: {
            access_token
        }
    })

})

export const signUp = createAsyncThunk("app/signUp", async ({ name, phoneNumber, email, password }: SignUpPayload) => {
    return await awaiting({
        status: '',
        data: {
            access_token: 'access_token'
        }
    })
})

export const logOut = createAsyncThunk("app/logout", async (payload, { getState }) => {

    const state = getState()

    // @ts-ignore
    if (!state.app.access_token) { // <void, {getState: () => {app: InitialState}}>
        return null
    }

    // @ts-ignore
    return await awaiting()
})

export const updateClient = createAsyncThunk("client/put", async (client: User) => {
    return await awaiting({
        status: '',
        data: client
    })
})


/* export const fetchCurrentUser = createAsyncThunk(
    "app/getUserServer",
    async () => await apiFetchCurrentUser()
)

export const logIn = createAsyncThunk(
    "app/loginServer", async (payload: LogInPayload) => await apiLogIn( payload )
)

export const signUp = createAsyncThunk(
    "app/signUpServer", async ( payload: SignUpPayload) => await apiSignUp( payload )
)

export const logOut = createAsyncThunk(
    "app/logoutServer", async () => await apiLogOut()
)

export const updateClient = createAsyncThunk(
    "client/putServer", async (client: User) => await apiUpdateClient( client?.id, client )
) */


const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.fulfilled, (state,
                { payload }: PayloadAction<RequestResponse<User> | null>) => {
                if (payload?.data) state.user = payload.data
            })
            .addCase(logOut.fulfilled, (state) => {
                localStorage.removeItem('access_token')
                state.user = null
                state.access_token = null
            })
            .addCase(logIn.fulfilled, (state,
                { payload }: PayloadAction<RequestResponse<LogInResponse>>) => {
                if (payload.data?.access_token) {
                    state.access_token = payload.data.access_token
                    localStorage.setItem('access_token', payload.data.access_token)
                }
            })
            .addCase(signUp.fulfilled, (state,
                { payload }: PayloadAction<RequestResponse<SignUpResponse>>
            ) => {
                if (payload.data?.access_token) {
                    state.access_token = payload.data.access_token
                    localStorage.setItem('access_token', payload.data.access_token)
                }
            })
            .addCase(updateClient.fulfilled, (state,
                { payload }: PayloadAction<RequestResponse<User> | null>) => {
                if (payload?.data) state.user = { ...state.user, ...payload.data }
            })
    }
})

export const getUser = (state: AppState) => state.app.user

export const getAccessToken = (state: AppState) => state.app.access_token

export default appSlice.reducer