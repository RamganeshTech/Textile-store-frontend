import { useQuery } from "@tanstack/react-query";
import Api from "..//apiClient/apiClient"; // Axios instance

// Fetch function
const fetchProducts = async () => {
    const { data } = await Api.get("/products/getproducts");
    console.log(data)
    return data.data;
};


export const useFetchProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        staleTime: 1 * 60 * 1000, // Cache for 5 minutes
    });
};
