import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
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
    throw error;
  }
};

const searchProducts = async ({pageParam = 1, search, filter}:{pageParam:number, search:string, filter:any}) => {
        const { data } = await Api.get(`/searchproducts?search=${search}&filter=${encodeURIComponent(JSON.stringify(filter))}&page=${pageParam}&limit=10`);
        // return data.data;
        return {
          products: data.data,
          hasNextPage: data.hasNextPage,
        };
}

// FOR CLOUDINARY IMAGE UPLOAD 
// export const uploadImagesToCloudinary = async (files: File[]): Promise<{ url: string; public_id: string }[]> => {
//     const formData = new FormData();
//     files.forEach(file => formData.append("file", file));  // append multiple files
  
//     const response = await Api.post("/products/uploadimage", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
  
//     return response.data.images; // Assuming backend sends { images: [...] }
//   };

export const uploadImagesToS3 = async (files: File[]): Promise<string[]> => {
 try{
  const formData = new FormData();
  files.forEach(file => formData.append("file", file));  // this must match backend field name

  const response = await Api.post("/products/uploadimage", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.images; // Already an array of image URLs
 }
 catch(err){
  console.log(err)
  throw err;
 }
};


  export const editProduct = async ({productData, productId}:{productData:any, productId:string})=>{
   try{
    let {data} = await Api.put(`/products/editproducts/${productId}`, productData)
    // console.log(data)
    return data.data
   }
   catch(error){
    throw error;
   }
  } 

  export const deleteProduct = async ({productId}:{productId:string})=>{
  try{
    let {data} = await Api.delete(`/products/deleteproduct/${productId}`)
    // console.log(data)
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
        // console.log(error)
    }
}

export const useFetchProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false, // Prevent refetch on tab switch
        retry:false
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

//  previous verison of infity scroll below
// export const useSearchProducts = () => {
//     return useMutation({
//         mutationFn: searchProducts,
//     })
// }

  export const useSearchProductsInfinite = (search: string, filter: any) => {
    return useInfiniteQuery({
      queryKey: ["search-products", search, filter],
      queryFn: ({ pageParam = 1 }) =>
        searchProducts({ pageParam, search, filter }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>{
       let nextpg =  lastPage.hasNextPage ? allPages.length + 1 : undefined;
       return nextpg
      },
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: false,
    });
  };

export const useFilterProuducts = ()=>{
    return useMutation({
        mutationFn: applyFilters
    })
}

export const useUploadImage = () => {
    return useMutation({
      // mutationFn: uploadImagesToCloudinary,
      mutationFn: uploadImagesToS3,
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