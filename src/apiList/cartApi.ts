import Api from "../apiClient/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const addToCart = async (cartData:any)=>{
   let {data} = await Api.post('/cart/addtocart', {cartItems:cartData})
  //  console.log(data)
   return data.data
}

export const getCart = async ()=>{
    let {data} = await Api.get('/cart/getcartitems')
  //  console.log(data)

    return data.data
}

export const removeCartItems = async (cartdata:any)=>{
try{
    let {data} = await Api.delete(`/cart/deletecartitem/${cartdata.productId}`,{
      data: {
        size: cartdata.size,
        color: cartdata.color
      }
    })

    return data.data
}
catch(err){
  if(err instanceof Error){
    console.log(err)
    throw new Error(err.message)
  }
}
}

export const removeCartQuantity = async ({id, quantity, size, color}:{id:string, quantity:number, size:string, color:string})=>{
  try{
      let {data} = await Api.patch(`/cart/removequantity/${id}`, {quantity, size, color})
    //  console.log(data)
      return data.data
  }
  catch(err){
    if(err instanceof Error){
      // console.log(err)
      throw new Error(err.message)
    }
  }
}


export const useFetchCart = ()=>{
    return useQuery({
        queryKey:['cart'],
        queryFn:  getCart,
        staleTime: 1000 * 60 * 10
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