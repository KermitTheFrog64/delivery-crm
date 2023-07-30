import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Role } from "../../app/app-slice"
import { awaiting } from "../../shared/utils"
import { AppState } from "../../app/store"

export interface Employee {
    id?: number
    name?: string
    role?: Role | null
    phoneNumber?: string
    email?: string
    password?: string
    passwordConfirmation?: string
}

interface Employees {
    employees: Employee[]
    roles: Role[]
}

const initialState: Employees = {
    employees: [],
    roles: [],
}

export const fetchEmployees = createAsyncThunk("employees/get", async () => {
    return await awaiting([
        {
            id: 1,
            name: 'Иванова Мария',
            role: {
                id: 1,
                name: 'Администратор',
                type: 'admin'
            }
        },
        {
            id: 2,
            name: 'Смирнова Валерия',
            role: {
                id: 2,
                name: 'Диспетчер',
                type: 'dispatcher'
            }
        },
        {
            id: 3,
            name: 'Пономарёв Роман',
            role: {
                id: 3,
                name: 'Курьер',
                type: 'courier'
            }
        }
    ])
})

export const fetchRoles = createAsyncThunk("roles/get", async () => {
    return await awaiting([
        {
            id: 1,
            name: 'Администратор',
            type: 'admin'
        },
        {
            id: 2,
            name: 'Диспетчер',
            type: 'dispatcher'
        },
        {
            id: 3,
            name: 'Курьер',
            type: 'courier'
        }
    ])
})

export const createEmployee = createAsyncThunk("employees/post", async (employee: Employee) => {
    return await awaiting({ id: Date.now(), ...employee })
})

export const updateEmployee = createAsyncThunk("employees/put", async (employee: Employee) => {
    return await awaiting(employee)
})

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.fulfilled, (state, { payload }: PayloadAction<Employee[]>) => {
                state.employees = payload
            })
            .addCase(createEmployee.fulfilled, (state, { payload }: PayloadAction<Employee>) => {
                state.employees.push(payload)
            })
            .addCase(updateEmployee.fulfilled, (state, { payload }: PayloadAction<Employee>) => {
                state.employees = state.employees.map((item) => item.id === payload.id ? item = payload : item)
            })
            .addCase(fetchRoles.fulfilled, (state, { payload }: PayloadAction<Role[]>) => {
                state.roles = payload
            })
    }
})

export const getEmployees = (state: AppState) => state.employees.employees

export const getRoles = (state: AppState) => state.employees.roles

export const getEmployeeById = (id: number) => (state: AppState) => state.employees.employees.find((item) => item.id === id)

export const getCouriers = (state: AppState) => state.employees.employees.filter((item) => item.role?.id === 3)

export default employeesSlice.reducer