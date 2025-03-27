import React, { useEffect, useRef, useState } from 'react'
import style from './AllProducts.module.css'
import { CheckBox, Close } from '@mui/icons-material'
import ProductsList from '../../components/ProductsList/ProductsList'
import { IconButton, TextField } from '@mui/material'
// import products from '../../Utils/product'
import ProductsFullList from '../../components/ProductsFullList/ProductsFullList'
import Checkbox from '@mui/material/Checkbox';
import TuneIcon from '@mui/icons-material/Tune';
import { Button } from '@mui/material';
import FilterSideBar from '../../components/FilterSidebar/FilterSideBar'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { useDispatch } from 'react-redux'
import { useFetchProducts } from '../../apiList/productApi'
import { ProductType } from '../../Types/types'
// import { IconButton } from '@mui/material';


// A reusable component for each filter category with dropdown


const AllProducts = () => {

  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');


  let dispatch = useDispatch<AppDispatch>()

  // const products = useSelector((state:RootState)=> state.products.products)
  let {data:products, isLoading, isError, error} = useFetchProducts()



  console.log(products)

  // Example filtering – adjust as needed
  // const filteredProducts = products.filter((product:ProductType) =>
  //   product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //   (selectedCategory ? (product.category?.toLowerCase() || '') === selectedCategory.toLowerCase() : true)
  // );

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarVisible(false);
      }
    }

    if (sidebarVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarVisible]);

  return (
    <main className={`${style.maincontainer} mt-[70px]`}>
      <section className={`${style.innerDiv} `}>
        <div className={`${style.mobileViewFilter} ${style.filterdivmobile}`}>
          <IconButton
            onClick={() => setSidebarVisible(true)}
            className={style.sidebarToggle}
          >
            <TuneIcon />
          </IconButton>
          <div className="w-[80%]">
            <TextField
              placeholder="Search Products"
              className="w-[100%]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>


        {/* SIDEBAR FILTER */}
        <FilterSideBar ref={sidebarRef} sidebarVisible={sidebarVisible} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setSidebarVisible={setSidebarVisible} />



        {/* THE BELOW FILTER IS FOR LARGE DEIVCES */}
        <section className={`${style.filters}`}>
          <div className={`${style.filterinnerDiv}`}>

            <div className={` ${style.filterscategory} ${style.productcategory}`}>
              <p>Product Category</p>
              <section>
                <CheckBox color='primary' />
                <div>
                  <label htmlFor="">kurtha</label>
                  {/* <span>{`(76)`}</span> */}
                </div>

              </section>

              <section>
                <CheckBox color='primary' />
                <div>
                  <label htmlFor="">kurtha</label>
                  {/* <span>{`(76)`}</span> */}
                </div>

              </section>

            </div>


            <div className={` ${style.filterscategory} ${style.productcategory}`}>
              <p>Product Avaibality</p>
              <section>
                <CheckBox color='primary' />
                <div>
                  <label htmlFor="">Out of Stock</label>
                  {/* <span>{`(76)`}</span> */}
                </div>

              </section>

              <section>
                <CheckBox color='primary' />
                <div>
                  <label htmlFor="">Available</label>
                  {/* <span>{`(76)`}</span> */}
                </div>

              </section>

            </div>



            <div className={` ${style.filterscategory} ${style.productcategory}`}>
              <p>Product Size</p>
              <section>
                <CheckBox color='primary' />
                <div>
                  <label htmlFor="">XS</label>
                </div>

              </section>

              <section>
                <CheckBox color='primary' />
                <div>
                  <label htmlFor="">S</label>
                </div>

              </section>

              <section>
                <CheckBox color='primary' />
                <div>
                  <label htmlFor="">M</label>
                </div>

              </section>

              <section>
                <CheckBox color='primary' />
                <div>
                  <label htmlFor="">L</label>
                </div>

              </section>


              <section>
                <CheckBox color='primary' />
                <div>
                  <label htmlFor="">XL</label>
                </div>

              </section>

              <section>
                <CheckBox color='primary' />
                <div>
                  <label htmlFor="">XXl</label>
                </div>

              </section>

            </div>


            <div className={` ${style.filterscategory} ${style.productcategory}`}>
              <p>Arraival</p>
              <section>
                <CheckBox color='primary' />
                <div>
                  <label htmlFor="">Newest</label>
                  {/* <span>{`(76)`}</span> */}
                </div>

              </section>

              <section>
                <CheckBox color='primary' />
                <div>
                  <label htmlFor="">Oldest</label>
                  {/* <span>{`(76)`}</span> */}
                </div>

              </section>

            </div>



            <div className={` ${style.filterscategory} ${style.productcategory}`}>
              <p>Price</p>
              <section className='flex-col '>
                <input type="range" />
                <div className='flex-col col-end-6 w-[100%] '>
<TextField
    placeholder="Min"
    className="custom-input"
  />

<TextField
    placeholder="Min"
    className="custom-input"
  />
                </div>

              </section>

            </div>


          </div>

          <div className='hidden'>
            <TextField />
          </div>
        </section>

        <div className={`${style.productsList} items-start justify-center  `}>
          <div className={` ${style.searchBarMain} w-[100%]`}>
            <TextField placeholder='Search Products' className='w-[100%]' />
          </div>

          <div className={`${style.displayProducts}`}>
            <ProductsFullList productsList={products} />
          </div>
        </div>
      </section>

      {sidebarVisible && <div className={`${style.overlay} ${sidebarVisible ? style.showoverLay : ""}`}></div>}
    </main>
  )
}

export default AllProducts