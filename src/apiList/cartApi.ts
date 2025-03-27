import axios from "axios";
import Api from "../apiClient/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const addToCart = async (cartData:any)=>{
    console.log(cartData)
   let {data} = await Api.post('/cart/addtocart', {cartItems:cartData})
   console.log(data)
   return data.data
}

export const getCart = async ()=>{
    let {data} = await Api.get('/cart/getcartitems')
   console.log(data)

    return data.data
}

export const removeCartItems = async (cartdata:string)=>{
try{
  console.log(cartdata)
    let {data} = await Api.delete(`/cart/deletecartitem/${cartdata}`)
   console.log(data)

    return data.data
}
catch(err){
  if(err instanceof Error){
    console.log(err)
    throw new Error(err.message)
  }
}
}

export const removeCartQuantity = async ({id, quantity}:{id:string, quantity:number})=>{
  try{
      let {data} = await Api.patch(`/cart/removequantity/${id}`, {quantity})
     console.log(data)
      return data.data
  }
  catch(err){
    if(err instanceof Error){
      console.log(err)
      throw new Error(err.message)
    }
  }
}


export const useFetchCart = ()=>{
    return useQuery({
        queryKey:['cart'],
        queryFn:  getCart
    })
}


export const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: addToCart,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    });
  };
  
  export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: removeCartItems,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    });
  };

  export const useRemoveQuantityFromCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: removeCartQuantity,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    });
  };