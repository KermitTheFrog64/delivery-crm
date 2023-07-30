import { configureStore } from '@reduxjs/toolkit'
import deliveryReducer from '../features/delivery/delivery-slice'
import orderReducer from '../features/order/order-slice'
import employeesReducer from '../features/employees/employees-slice'
import appReducer from './app-slice'
import clientReducer from '../features/client/client-slice'

export const store = configureStore({
    reducer: {
        delivery: deliveryReducer,
        order: orderReducer,
        app: appReducer,
        employees: employeesReducer,
        client: clientReducer
    }
})

export type AppDispatch = typeof store.dispatch

export type AppState = ReturnType<typeof store.getState>

export default store 