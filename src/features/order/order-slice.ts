import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AppState } from '../../app/store'
import { Employee } from '../employees/employees-slice'
import { awaiting } from '../../shared/utils'
import { Client } from '../client/client-slice'
import { Status } from './OrderStatus'

export interface Address {
    id: number
    flat: string
    house: string
    street: string
    city: string
}

export interface Delivery {
    id: number
    statusId: number
    address: Address
    courier?: Employee
    order?: Order
}

export interface Order {
    id: number
    statusId: number
    delivery?: Delivery
    client?: Client
    address?: Address
}

interface OrderState {
    orders: Order[]
    orderStatuses: Status[]
}

const testOrder: Order = {
    id: 1,
    statusId: 0,
    delivery: {
        id: 1,
        statusId: 1,
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
        }
    },
    client: {
        id: 1,
        email: "example@com",
        phoneNumber: '8912267',
        name: "Harry"
    }
}

const initialState: OrderState = {
    orders: [],
    orderStatuses: []
}

export interface ChangeStatusPayload {
    id: number
    statusId: number
}

export const fetchOrders = createAsyncThunk("orders/get", async () => {
    return await awaiting([
        {
            id: 1,
            statusId: 0,
            delivery: {
                id: 1,
                statusId: 1,
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
                }
            },
            client: {
                id: 1,
                email: "example@com",
                phoneNumber: '8912267',
                name: "Колесникова Татьяна"
            }
        },
        {
            id: 2,
            statusId: 0,
            delivery: {
                id: 1,
                statusId: 1,
                address: {
                    id: 1,
                    flat: '7',
                    house: "1А",
                    street: "Тверская ул.",
                    city: "Москва"
                },
                courier: {
                    id: 1,
                    name: "John"
                }
            },
            client: {
                id: 1,
                email: "example@com",
                phoneNumber: '8912267',
                name: "Иванов Максим"
            }
        },
        {
            id: 3,
            statusId: 0,
            delivery: {
                id: 1,
                statusId: 1,
                address: {
                    id: 1,
                    flat: '16',
                    house: "50",
                    street: "просп. Мира",
                    city: "Москва"
                },
                courier: {
                    id: 1,
                    name: "John"
                }
            },
            client: {
                id: 1,
                email: "example@com",
                phoneNumber: '8912267',
                name: "Петропавловская Лариса"
            }
        },
        {
            id: 4,
            statusId: 0,
            delivery: {
                id: 1,
                statusId: 1,
                address: {
                    id: 1,
                    flat: '117',
                    house: "23",
                    street: "ул. Хохрякова",
                    city: "Екатиренбург"
                },
                courier: {
                    id: 1,
                    name: "John"
                }
            },
            client: {
                id: 1,
                email: "example@com",
                phoneNumber: '8912267',
                name: "Ермаков Борис"
            }
        },
        {
            id: 5,
            statusId: 0,
            delivery: {
                id: 1,
                statusId: 1,
                address: {
                    id: 1,
                    flat: '78',
                    house: "6к2",
                    street: "просп. Чайковского",
                    city: "Тверь"
                },
                courier: {
                    id: 1,
                    name: "John"
                }
            },
            client: {
                id: 1,
                email: "example@com",
                phoneNumber: '8912267',
                name: "Смирнова Александра"
            }
        },
        {
            id: 206,
            statusId: 6,
            delivery: {
                id: 1,
                statusId: 1,
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
                }
            },
            client: {
                id: 28,
                email: "vincent1890@mail.ru",
                phoneNumber: '89525831096',
                name: "Заболотная Наталья"
            }
        },
        {
            id: 548,
            statusId: 6,
            delivery: {
                id: 1,
                statusId: 1,
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
                }
            },
            client: {
                id: 28,
                email: "vincent1890@mail.ru",
                phoneNumber: '89525831096',
                name: "Заболотная Наталья"
            }
        },
        {
            id: 690,
            statusId: 5,
            delivery: {
                id: 1,
                statusId: 1,
                address: {
                    id: 2,
                    flat: '313',
                    house: "13",
                    street: "ул. Сикейроса",
                    city: "Санкт-Петербург"
                },
                courier: {
                    id: 1,
                    name: "John"
                }
            },
            client: {
                id: 28,
                email: "vincent1890@mail.ru",
                phoneNumber: '89525831096',
                name: "Заболотная Наталья"
            }
        }
    ])
})

export const createOrder = createAsyncThunk("order/post", async (order: Order) => {
    return await awaiting({ ...order, id: Date.now() })
})

export const updateOrder = createAsyncThunk("order/put", async (order: Order) => {
    return await awaiting(order)
})

export const fetchOrderStatuses = createAsyncThunk('orderStatuses/get', async () => {
    return await awaiting([
        {
            id: 1,
            label: "Создан",
        },
        {
            id: 2,
            label: "Принят в обработку",
        },
        {
            id: 3,
            label: "Готовиться к отправке",
        },
        {
            id: 4,
            label: "Отправлен",
        },
        {
            id: 5,
            label: "Доставлен на склад",
        },
        {
            id: 6,
            label: "Получен",
        },
        {
            id: 7,
            label: "Отменён",
        }
    ])
})

const orderSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        changeStatus: (state, { payload }: PayloadAction<ChangeStatusPayload>) => {
            state.orders = state.orders.map((item) => item.id === payload.id ? { ...item, statusId: payload.statusId } : item)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.fulfilled, (state, { payload }: PayloadAction<Order[]>) => {
                state.orders = payload
            })
            .addCase(createOrder.fulfilled, (state, { payload }: PayloadAction<Order>) => {
                state.orders.push(payload)
            })
            .addCase(updateOrder.fulfilled, (state, { payload }: PayloadAction<Order>) => {
                state.orders = state.orders.map((item) => item.id === payload.id ? item = payload : item)
            })
            .addCase(fetchOrderStatuses.fulfilled, (state, { payload }: PayloadAction<Status[]>) => {
                state.orderStatuses = payload
            })
    }
})

export const getOrders = (state: AppState) => state.order.orders

export const getOrderById = (id: number) => (state: AppState) =>
    state.order.orders.find((item) => item.id === id)

export const getClientOrdersById = (id: number) => (state: AppState) =>
    state.order.orders.filter((item) => item.client?.id === id)

export const getOrderStatuses = (state: AppState) => state.order.orderStatuses

export const { changeStatus } = orderSlice.actions

export default orderSlice.reducer