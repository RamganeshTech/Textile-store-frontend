import { useMutation, useQuery } from "@tanstack/react-query";
import Api from "../apiClient/apiClient"; // Axios instance
import { queryClient } from './../QueryClient/queryClient';
import { FilterOptionsType } from "../pages/AllProducts/AllProducts";
import { ProductType } from "../Types/types";

// Fetch function
const fetchProducts = async () => {
    const { data } = await Api.get("/products/getproducts");
    // console.log(data)
    return data.data;
};

const createProduct = async (productData:ProductType) => {
  try{
    const { data } = await Api.post("/products/createproduct");
    // console.log(data)
    return data.data;
  }
  catch(error){
    console.log(error);
    throw error;
  }
};

const searchProducts = async ({search, filter}:{search:string, filter:any}) => {
    // try {
    console.log("calling hte search prodcs")
        const { data } = await Api.get(`/searchproducts?search=${search}&filter=${encodeURIComponent(JSON.stringify(filter))}`);
        console.log(data)
        return data.data;
    // }
    // catch (error) {
    //     console.log(error)
    // }
}

const applyFilters = async (filterData: FilterOptionsType) => {
    try {
        const { data } = await Api.get(`/filterproducts`, {data: filterData});
        // console.log(data)
        return data.data;
    }
    catch (error) {
        console.log(error)
    }
}

export const useFetchProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        staleTime: 1 * 60 * 1000, // Cache for 5 minutes
        refetchOnWindowFocus: false, // Prevent refetch on tab switch
        // refetchOnReconnect: false, // Prevent refetch on internet reconnect
    });
};

export const useCreateProduct = ()=>{
    return useMutation({
        mutationFn:createProduct,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["products"]})
        }
    })
}

export const useSearchProducts = () => {
    return useMutation({
        mutationFn: searchProducts,
        // onSuccess: () => {
        //     queryClient.invalidateQueries({
        //         queryKey: ['products']
        //     }); // ✅ Ensure UI refresh
        // },
    })
}

export const useFilterProuducts = ()=>{
    return useMutation({
        mutationFn: applyFilters
    })
}