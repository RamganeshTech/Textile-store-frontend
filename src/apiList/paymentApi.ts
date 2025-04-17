import { useMutation } from "@tanstack/react-query"
import Api from "../apiClient/apiClient"

const createOrder = async (orderData:any)=>{
    let {data} = await Api.post('/order', orderData)
//    console.log(data)
    return data.data
}


export const useCreateOrder = ()=>{
    return useMutation({
        mutationFn:createOrder,
    })
}