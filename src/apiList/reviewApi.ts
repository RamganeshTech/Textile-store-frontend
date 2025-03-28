import { useMutation, useQuery } from "@tanstack/react-query";
import Api from "../apiClient/apiClient"
import { queryClient } from "../QueryClient/queryClient";

interface ReviewType {
    productId:string,
    description:(string | null),
    star:(number | null),
}

interface UpdateOrDeleteReviewType {
    productId:string,
    id:string,
    stars?:number,
    description?:string
}

const fetchReview = async (productId:string)=>{
    let {data} = await Api.get(`/review/getallreviews/${productId}`)
    console.log(data)
    return data.data;
}

const createReview = async (reviewData:ReviewType)=>{
    // console.log(reviewData, "reveiwData form create review")
    let {data} = await Api.post('/review/addreview', reviewData)
    console.log(data)
    return data.data;
}

const editReview = async ({productId, id:reviewId, description, stars}:UpdateOrDeleteReviewType)=>{
    console.log(reviewId, "from the edit review")
    let {data} = await Api.patch(`/review/editreview/${reviewId}`, {productId, description, stars})
    console.log(data)
    return data.data;
}

const deleteReview = async ({productId, id:reviewId}:UpdateOrDeleteReviewType)=>{
    console.log(productId, "from delete review appi")
    let {data} = await Api.delete(`/review/removereview/${reviewId}?productId=${productId}`)
    console.log(data)
    return data.data;
}


const useFetchReview = (productId:string)=>{
    return useQuery({
        queryKey:['review'],
        queryFn:()=> fetchReview(productId),
    })
}

const useCreateReview = ()=>{
    return useMutation({
        mutationFn:createReview,
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["review"] });
          },
    })
}

const useEditReview = ()=>{
    return useMutation({
        mutationFn:editReview,
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["review"] });
          },
    })
}

const useDeleteReview = ()=>{
    return useMutation({
        mutationFn:deleteReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["review"] });
          },
    })
}

export {useFetchReview, useCreateReview, useEditReview, useDeleteReview}