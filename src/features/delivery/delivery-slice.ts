import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import { AppState } from '../../app/store'

import { ChangeStatusPayload, Delivery } from '../order/order-slice'
import { awaiting } from '../../shared/utils'

interface DeliveryState {
    deliveries: Delivery[]
}

const initialState: DeliveryState = {
    deliveries: []
}

const testDelivery: Delivery = {
    id: 1,
    statusId: 2,
    address: {
        id: 1,
        flat: '23',
        house: "23A",
        street: "ggg",
        city: "Moscow"
    },
    courier: {
        id: 1,
        name: "John"
    },
    order: {
        id: 1,
        statusId: 1,
        client: {
            id: 1,
            email: "example@com",
            phoneNumber: '8912267',
            name: "Александр Иванов"
        }
    }
}

export const fetchDeliveries = createAsyncThunk("deliveries/get", async () => {
    return await awaiting([
        {
            id: 101,
            statusId: 2,
            address: {
                id: 1,
                flat: '3',
                    house: "78",
                    street: "Северный пр.",
                    city: "Санкт-Петербург"
            },
            courier: {
                id: 1,
                name: "John"
            },
            order: {
                id: 1,
                statusId: 1,
                client: {
                    id: 1,
                    email: "example@com",
                    phoneNumber: '89011234567',
                    name: "Александр Иванов"
                }
            }
        },
        {
            id: 102,
            statusId: 2,
            address: {
                id: 1,
                flat: '23',
                house: "23A",
                street: "ggg",
                city: "Moscow"
            },
            courier: {
                id: 1,
                name: "John"
            },
            order: {
                id: 2,
                statusId: 1,
                client: {
                    id: 1,
                    email: "example@com",
                    phoneNumber: '89269876543',
                    name: "Екатерина Смирнова"
                }
            }
        },
        {
            id: 103,
            statusId: 2,
            address: {
                id: 1,
                flat: '23',
                house: "23A",
                street: "ggg",
                city: "Moscow"
            },
            courier: {
                id: 1,
                name: "John"
            },
            order: {
                id: 3,
                statusId: 1,
                client: {
                    id: 1,
                    email: "example@com",
                    phoneNumber: '84955551234',
                    name: "Дмитрий Петров"
                }
            }
        },
        {
            id: 104,
            statusId: 2,
            address: {
                id: 1,
                flat: '23',
                house: "23A",
                street: "ggg",
                city: "Moscow"
            },
            courier: {
                id: 1,
                name: "John"
            },
            order: {
                id: 4,
                statusId: 1,
                client: {
                    id: 1,
                    email: "example@com",
                    phoneNumber: '89998887766',
                    name: "Ольга Николаева"
                }
            }
        }
    ])
})

const deliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {
        changeStatus: (state, { payload }: PayloadAction<ChangeStatusPayload>) => {
            state.deliveries = state.deliveries.map((item) => item.id === payload.id ? { ...item, statusId: payload.statusId } : item)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeliveries.fulfilled, (state, { payload }: PayloadAction<Delivery[]>) => {
                state.deliveries = payload
            })
    }
})

export const getDeliveries = (state: AppState) => state.delivery.deliveries

export const getDeliveryById = (id: number) => (state: AppState) => state.delivery.deliveries.find((item) => item.id === id)

export const { changeStatus } = deliverySlice.actions

export default deliverySlice.reducer