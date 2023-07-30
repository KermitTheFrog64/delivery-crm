import { User } from "../../app/app-slice"

interface OrderPayload {
    id?: number
    name: string
}

export interface RequestOptions<PayloadType = any> {
    path: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    payload?: PayloadType
}

export interface RequestResponse<DataType = any> {
    status: number
    data: DataType | null
}

export interface LogInPayload {
    email: string
    password: string
}
export interface LogInResponse {
    access_token: string
}

export interface SignUpPayload extends LogInPayload {
    name: string
    phoneNumber: string
    passwordConfirmation?: string
}
export interface SignUpResponse extends LogInResponse {
    // ...
}

export const request = async <Payload = any, Response = any>({
    path, method, payload
}: RequestOptions<Payload>): Promise<RequestResponse<Response>> => {

    const access_token = localStorage.getItem('access_token')

    const request = await fetch(path, {
        method,
        body: payload ? JSON.stringify(payload) : null,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    const status = request.status

    let data = null

    try {
        data = await request.json()
    } catch (error: any) {
        console.log(error)
    }
    return { status, data }
}

// crud - create (POST), read (GET), update (PUT), delete (DELETE)


export const apiFetchCurrentUser = () => {
    return request<User>({
        path: '/api/user', method: 'GET'
    })
}

export const apiLogIn = (payload: LogInPayload) => {
    return request<LogInPayload, LogInResponse>({
        path: '/api/login', method: 'POST', payload
    })
}

export const apiSignUp = (payload: SignUpPayload) => {
    return request<SignUpPayload, SignUpResponse>({
        path: '/api/login', method: 'POST', payload
    })
}

export const apiLogOut = () => {
    return request({
        path: '/api/logout', method: 'DELETE'
    })
}

export const apiUpdateClient = (userId?: number, payload?: User) => {
    if (!userId) {
        return null
    }
    return request<User>({
        path: `/api/user/${userId}`, method: 'PUT', payload
    })
}

export const createOrder = (payload: OrderPayload) => {
    return request<OrderPayload>({
        path: '/api/orders', method: 'POST', payload
    })
}

export const readOne = (orderId: number) => {
    return request<OrderPayload>({
        path: `/api/orders/${orderId}`, method: 'GET'
    })
}