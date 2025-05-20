import { useQuery } from "@tanstack/react-query";
import Api from "../apiClient/apiClient"

const fetchOffer = async ()=>{
   try{
   const {data} = await Api.get('/offers/activeoffers');
    console.log("data from the fetchOffers", data)
    return data.data
   }
   catch(error){
    throw error;
   }
}

export const useFetchOffer = ()=>{
   return useQuery({
      queryKey:['offer'],
      queryFn: fetchOffer,
      staleTime: 1000 * 60 * 10,
      retry: false,
      refetchOnWindowFocus:false
   })
}
