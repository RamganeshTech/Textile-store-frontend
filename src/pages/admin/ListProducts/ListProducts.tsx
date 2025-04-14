import React, { useEffect, useState } from 'react'
import { useEditProduct, useFetchProducts } from '../../../apiList/productApi'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store/store'
import { useDispatch } from 'react-redux'
import { setProducts } from '../../../slices/products'
import AdminProducts from '../../../components/Adminsubcomponents/AdminProducts/AdminProducts'
import Loading from '../../../components/LoadingState/Loading'
import style from './ListProducts.module.css'
import { ProductType } from '../../../Types/types'
import AddProduct from '../AddProduct/AddProduct'

const ListProducts = () => {

    let { data: products, isPending: fetchprodpending, isError: fetchProdIsError, error: fetchProdError } = useFetchProducts()

    const dispatch = useDispatch<AppDispatch>();
    const reduxProducts = useSelector((state: RootState) => state.products.products);

    const [formData, setFormData] = useState<Partial<ProductType>>({
        productName: "",
        price: 0,
        sizeVariants: [],
        category: "",
        description: "",
    });

    const [editProductId, setEditProductId] = useState<string | null>(null)


    // Sync React Query data to Redux
    useEffect(() => {
        if (products) {
            dispatch(setProducts(products));
        }
    }, [products, dispatch]);

    return (
        <main className={`${style.maincontainer} !mt-[70px]`}>

            {editProductId ? <AddProduct editProductId={editProductId} editFormData={formData} /> : (
                <>
                    {!fetchProdIsError && fetchprodpending && <div className="h-[80vh] sm:h-[90vh] w-[100vw] flex justify-center items-center">
                        <Loading />
                    </div>}

                    {!fetchprodpending && fetchProdIsError && <div className="h-[80vh] sm:h-[80vh] w-[100vw] flex justify-center items-center">
                        <p className="text-lg sm:text-2xl lg:text-4xl">{fetchProdError ? (fetchProdError as unknown as Error).message : "Something went wrong"}</p>
                    </div>}

                    {!fetchProdIsError && !fetchprodpending && <section className={`${style.listproducts}`}>
                        <h1 className={style.heading}>Products Available</h1>
                        {reduxProducts && reduxProducts.map(product => {
                            return (
                                <AdminProducts key={product._id} product={product} setFormData={setFormData} setEditProductId={setEditProductId} />
                            )
                        })}
                    </section>}
                </>
            )}


        </main>
    )
}

export default ListProducts