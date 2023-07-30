import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../app/app-slice"
import { awaiting } from "../../shared/utils"
import { AppState } from "../../app/store"

export interface Client extends User {
    // ...
}

interface ClientState {
    clients: Client[]
}

const initialState: ClientState = {
    clients: []
}

export const fetchClient = createAsyncThunk("client/get", async (id: number) => {
    return await awaiting({
        id: 28,
        name: 'Emma',
        role: {
            id: 4,
            name: 'Client',
            type: 'client'
        },
        phoneNumber: '89525831096',
        email: '123@example.com'
    })
})

export const fetchClients = createAsyncThunk("clients/get", async () => {
    return await awaiting([
        {
            id: 28,
            name: 'Пышкина Алёна',
            role: {
                id: 4,
                name: 'Client',
                type: 'client'
            },
            phoneNumber: '89525831096',
            email: 'emma@example.com'
        },
        {
            id: 45,
            name: 'Nick',
            role: {
                id: 4,
                name: 'Client',
                type: 'client'
            },
            phoneNumber: '89525831096',
            email: 'nick@example.com'
        },
        {
            id: 33,
            name: 'Pol',
            role: {
                id: 4,
                name: 'Client',
                type: 'client'
            },
            phoneNumber: '89525831096',
            email: 'pol@example.com'
        }
    ])
})

const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.fulfilled, (state, { payload }: PayloadAction<Client[]>) => {
                state.clients = payload
            })
    },
})

export const getClients = (state: AppState) => state.client.clients

export default clientSlice.reducer