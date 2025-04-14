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
    const { data } = await Api.post("/products/createproduct", productData);
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

export const uploadImagesToCloudinary = async (files: File[]): Promise<{ url: string; public_id: string }[]> => {
    const formData = new FormData();
    files.forEach(file => formData.append("file", file));  // append multiple files
  
    console.log("formData in the upload images cloudinary", formData)
    const response = await Api.post("/products/uploadimage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    return response.data.images; // Assuming backend sends { images: [...] }
  };

  export const editProduct = async ({productData, productId}:{productData:any, productId:string})=>{
   try{
    let {data} = await Api.put(`/products/editproducts/${productId}`, productData)
    console.log(data)
    return data.data
   }
   catch(error){
    throw error;
   }
  } 

  export const deleteProduct = async ({productId}:{productId:string})=>{
  try{
    let {data} = await Api.delete(`/products/deleteproduct/${productId}`)
    console.log(data)
    return data.data
  }
  catch(error){
    throw error
  }
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
        staleTime: 1000 * 60 * 10,
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
    })
}

export const useFilterProuducts = ()=>{
    return useMutation({
        mutationFn: applyFilters
    })
}

export const useUploadImage = () => {
    return useMutation({
      mutationFn: uploadImagesToCloudinary,
    });
  };

  export const useEditProduct = ()=>{
    return useMutation({
        mutationFn: editProduct,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["products"]})
        }
    })
  }

  export const useDeleteProduct = ()=>{
    return useMutation({
        mutationFn: deleteProduct,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["products"]})
        }
    })
  }