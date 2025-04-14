import React, { useEffect } from 'react'
import { useFetchProducts } from '../../../apiList/productApi'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store/store'
import { useDispatch } from 'react-redux'
import { setProducts } from '../../../slices/products'
import AdminProducts from '../../../components/Adminsubcomponents/AdminProducts/AdminProducts'
import Loading from '../../../components/LoadingState/Loading'
import style from './ListProducts.module.css'

const ListProducts = () => {

    let {data:products, isPending:fetchprodpending, isError:fetchProdIsError, error:fetchProdError} = useFetchProducts()
    
    const dispatch = useDispatch<AppDispatch>();
    const reduxProducts = useSelector((state: RootState) => state.products.products);

    // Sync React Query data to Redux
    useEffect(() => {
        if (products) {
            dispatch(setProducts(products));
        }
    }, [products, dispatch]);
   
  return (
   <main className={`${style.maincontainer}`}>
    {!fetchProdError && fetchprodpending &&  <div className="h-[80vh] sm:h-[80vh] w-[100vw] flex justify-center items-center">
         <Loading />
       </div>}

   {!fetchprodpending && fetchProdError &&  <div className="h-[80vh] sm:h-[80vh] w-[100vw] flex justify-center items-center">
          <p className="text-lg sm:text-2xl lg:text-4xl">{fetchProdError ? (fetchProdError as unknown as Error).message : "Something went wrong"}</p>
          </div>}

   <section className={`${style.listproducts}`}>
   {reduxProducts && reduxProducts.map(product=>{
    return (
      <AdminProducts key={product._id} product={product} />
    )
   })}
   </section>
   </main>
  )
}

export default ListProducts