import { useMutation, useQuery } from "@tanstack/react-query";
import Api from './../apiClient/apiClient';
import { queryClient } from "../QueryClient/queryClient";


type FavouriteParamType = {
    productId:string,
    // image:string,
    // size:string,
    // color:string
}

const fetchFavourites = async ()=>{
    let {data} = await Api.get('/favourite/getfavouriteitems')
   console.log(data)

    return data.data
}


const addToFavourite = async (favouriteItem:FavouriteParamType)=>{
    console.log(favouriteItem)
    let {data} = await Api.post('/favourite/addtofavourite', favouriteItem)
   console.log(data)

    return data.data
}


const removeFromFavourite = async (favouritedata:{productId:String})=>{
    let {data} = await Api.delete('/favourite/deletefavouriteitem', {data: favouritedata})
   console.log(data)

    return data.data
}

export const useFetchFavourite = ()=>{
    return useQuery({
        queryKey: ["favourite"],
        queryFn:fetchFavourites,
        staleTime: 1000 * 60 * 10
    })
}


export const useAddToFavourite = ()=>{
    return useMutation({
        mutationFn:addToFavourite,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: ['favourite']})
        }
    })
}


export const useRemoveFavourite = ()=>{
    return useMutation({
        mutationFn: removeFromFavourite,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: ['favourite']})
        }
    })
}