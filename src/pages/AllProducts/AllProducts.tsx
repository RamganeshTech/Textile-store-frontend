import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import style from './AllProducts.module.css'
import { CheckBox, Close, SearchOffOutlined, SearchOutlined } from '@mui/icons-material'
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
import { useFetchProducts, useFilterProuducts, useSearchProducts } from '../../apiList/productApi'
import { ProductType } from '../../Types/types'
import axios, { AxiosError } from 'axios'
import Loading from '../../components/LoadingState/Loading'
import { arrival, availabilities, categories, sizes } from '../../constants/filterConstants'
// import { IconButton } from '@mui/material';


// A reusable component for each filter category with dropdown

export interface FilterOptionsType {
  category: String[],
  Min: (number | null),
  Max: (number | null),
  sizes: String[],
  colors: String[],
  availability: String[],
  arrival: string[]
}

const AllProducts = () => {

  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const [filterOptions, setFilterOptions] = useState<FilterOptionsType>({
    category: [],
    Min: null,
    Max: null,
    sizes: [],
    colors: [],
    availability: [],
    arrival: []
  })

  let dispatch = useDispatch<AppDispatch>()

  // const products = useSelector((state:RootState)=> state.products.products)
  let { data: products, isLoading, isError, error } = useFetchProducts()

  let { mutate: searchMutate, data: searchData, isError: searchIsError, error: searchError, isPending: searchPending } = useSearchProducts()
  // let { mutate: applyFiltersMutate, data: filterData, isError: filterIsError, error: filterError, isPending: filterPending } = useFilterProuducts()


  // console.log(products)

  // console.log("searcherror", searchError)
  const handleSearch = () => {
    searchMutate({search:searchTerm, filter:filterOptions})
  }


  console.log("searchTerm", searchTerm)

  function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || "Something went wrong!";
    }
    return "An unexpected error occurred.";
  }


  const sidebarRef = useRef<HTMLDivElement>(null);

  console.log("searchData", searchData)
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
    <main className={`${style.maincontainer} mt-[70px] sm:mt-[70px]`}>
      <section className={`${style.innerDiv} `}>
        <div className={`${style.mobileViewFilter} ${style.filterdivmobile}`}>
          <IconButton
            onClick={() => setSidebarVisible(true)}
            className={style.sidebarToggle}
          >
            <TuneIcon />
          </IconButton>
          <div className={`${style.mobilesearch} w-[80%] flex items-center justify-center`}>
            <TextField
              placeholder="Search Products"
              // className="w-[90%]"
              value={searchTerm}
              sx={{
                "& .MuiOutlinedInput-root": {
                  border: "none", // Removes the default border
                  "& fieldset": {
                    border: "none", // Removes the fieldset border
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent", // Remove hover border
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent", // Remove focus border
                  },
                },
                width: "90%"
              }}

              onChange={(e) => {
                // console.log(e.target.value)
                setSearchTerm(e.target.value)
              }}

              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  searchMutate({search:searchTerm, filter:filterOptions})
                }
              }}
            />
            <IconButton sx={{
              width: "10%",
              height: "100%",
              fill: "#0a0a0a",
              // border:"2px solid red"
            }}
              onClick={handleSearch}
            >
              <SearchOutlined />
            </IconButton>
          </div>
        </div>


        {/* SIDEBAR FILTER */}
        <FilterSideBar ref={sidebarRef} filterOptions={filterOptions} setFilterOptions={setFilterOptions} sidebarVisible={sidebarVisible} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setSidebarVisible={setSidebarVisible} />

        {/* THE BELOW FILTER IS FOR LARGE DEIVCES */}
        <section className={`${style.filters}`}>
          <div className={`${style.filterinnerDiv}`}>

            <div className={` ${style.filterscategory} ${style.productcategory}`}>
              <p>Product Category</p>
              {/* <section>
                <CheckBox color='primary' />
                <div>
                  <label htmlFor="">kurtha</label>
                </div>
              </section> */}

              {categories && categories.map(item =>
                <section>
                  <Checkbox id={item} color='primary' onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFilterOptions((prev) => ({
                      ...prev,
                      category: e.target.checked
                        ? [...prev.category, item] // Add "kurtha" when checked
                        : prev.category.filter((categoryitem) => categoryitem !== item), // Remove "kurtha" when unchecked
                    }))
                  } />
                  <div>
                    <label htmlFor={item}>{item}</label>
                  </div>

                </section>
              )}

              {/* <section>
                <Checkbox color='primary' onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFilterOptions((prev) => ({
                    ...prev,
                    category: e.target.checked
                      ? [...prev.category, "Chudithar"] // Add "kurtha" when checked
                      : prev.category.filter((item) => item !== "Chudithar"), // Remove "kurtha" when unchecked
                  }))
                } />
                <div>
                  <label htmlFor="">Chudithar</label>
                </div>
              </section> */}

            </div>


            <div className={` ${style.filterscategory} ${style.productcategory}`}>
              <p>Product Avaibality</p>

              {availabilities && availabilities.map(item =>
                <section>
                  <Checkbox id={item} color='primary' onChange={(e) => setFilterOptions(p => {
                    return {
                      ...p,
                      availability: e.target.checked ?
                        ([...p.availability, item])
                        :
                        p.availability.filter(availabilityItem => item !== availabilityItem)
                    }
                  })} />
                  <div>
                    <label htmlFor={item}>{item}</label>
                  </div>

                </section>
              )}

              {/* <section>
                <Checkbox color='primary' onChange={(e) => setFilterOptions(p => {
                  return {
                    ...p,
                    availability: e.target.checked ?
                      ([...p.availability, "out of stock"])
                      :
                      p.availability.filter(item => item !== "out of stock")
                  }
                })} />
                <div>
                  <label htmlFor="">Out of Stock</label>
                </div>
              </section> */}

              {/* <section>
                <CheckBox color='primary' />
                <div>
                  <label htmlFor="">Available</label>
                </div>

              </section> */}

            </div>



            <div className={` ${style.filterscategory} ${style.productcategory}`}>
              <p>Product Size</p>

              {sizes && sizes.map(item =>
                  <section>
                  <Checkbox id={item} color='primary' onChange={(e) => setFilterOptions(p => {
                    return {
                      ...p,
                      sizes: e.target.checked ?
                        ([...p.sizes, item])
                        : p.sizes.filter(size => size !== item)
                    }
  
                  }
                  )} />
                  <div>
                    <label htmlFor={item}>{item}</label>
                  </div>
                </section>
              )}

              {/* <section>
                <Checkbox color='primary' onChange={(e) => setFilterOptions(p => {
                  return {
                    ...p,
                    sizes: e.target.checked ?
                      ([...p.sizes, 'XS'])
                      : p.sizes.filter(size => size !== 'XS')
                  }

                }
                )} />
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

              </section> */}

            </div>


            <div className={` ${style.filterscategory} ${style.productcategory}`}>
              <p>Arraival</p>

              {arrival && arrival.map(item=>
                <section>
                <Checkbox id={item} color='primary' onChange={(e)=> setFilterOptions(p=>{
                  return {
                    ...p,
                    arrival: e.target.checked ?
                    ([...p.arrival, item])
                    :
                    p.arrival.filter(arrivalItem => item !== arrivalItem)
                  }
                })} />
                <div>
                  <label htmlFor={item}>{item}</label>
                </div>
              </section>
              )}
              {/* <section>
                <CheckBox color='primary' />
                <div>
                  <label htmlFor="">Newest</label>
                </div>

              </section> 

              <section>
                <CheckBox color='primary' />
                <div>
                  <label htmlFor="">Oldest</label>
                  {/* <span>{`(76)`}</span>
                </div>

              </section> */}

            </div>



            <div className={` ${style.filterscategory} ${style.productcategory}`}>
              <p>Price</p>
              <section className='flex-col '>
                <input type="range" />
                <div className='flex-col col-end-6 w-[100%] '>
                  <TextField
                    placeholder="Min"
                    className="custom-input"
                    onChange={(e)=> setFilterOptions(p=>{
                      return {
                        ...p,
                        Min: Number(e.target.value)
                      }
                    })}
                  />

                  <TextField
                    placeholder="Max"
                    className="custom-input"
                    onChange={(e)=> setFilterOptions(p=>{
                      return {
                        ...p,
                        Max: Number(e.target.value)
                      }
                    })}
                  />
                </div>
              </section>
            </div>


          </div>

          {/* <div className='hidden'>
            <TextField />
          </div> */}

          <div className={`${style.applybtncontainer}`}>
            <Button variant='contained' className={`${style.applyBtn}`} onClick={()=>     searchMutate({search:searchTerm, filter:filterOptions})}>Apply</Button>
          </div>
        </section>

        <div className={`${style.productsList} items-start justify-center  `}>
          <div className={` ${style.searchBarMain} w-[100%]`}>
            <TextField placeholder='Search Products' className='w-[100%]' sx={{
              "& .MuiOutlinedInput-root": {
                border: "none", // Removes the default border
                "& fieldset": {
                  border: "none", // Removes the fieldset border
                },
                "&:hover fieldset": {
                  borderColor: "transparent", // Remove hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent", // Remove focus border
                },
              },
            }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  searchMutate({search:searchTerm, filter:filterOptions})
                }
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton sx={{
              width: "4%",
              height: "5%",
              fill: "#0a0a0a"
            }}
              onClick={handleSearch}
            >
              <SearchOutlined />
            </IconButton>
          </div>

          {!isLoading ? (!searchError ? <div className={`${style.displayProducts}`}>
            <ProductsFullList productsList={searchData || products} />
          </div>
            :
            <section className="h-[100vh] w-[100%] flex items-center justify-center">
              <p className="text-xl lg:text-4xl sm:text-2xl">{getErrorMessage(searchError)}</p>
            </section>)
            :
            <section className="w-[100%] flex items-center justify-center">
              <Loading />
            </section>
          }
        </div>
      </section>

      {sidebarVisible && <div className={`${style.overlay} ${sidebarVisible ? style.showoverLay : ""}`}></div>}
    </main>
  )
}

export default AllProducts