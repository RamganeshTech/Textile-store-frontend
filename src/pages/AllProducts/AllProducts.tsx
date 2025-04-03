import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import style from './AllProducts.module.css'
import { CheckBox, Close, SearchOffOutlined, SearchOutlined } from '@mui/icons-material'
import ProductsList from '../../components/ProductsList/ProductsList'
import { IconButton, Radio, TextField } from '@mui/material'
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

import Slider from "rc-slider";
import "rc-slider/assets/index.css";


// import { IconButton } from '@mui/material';


// A reusable component for each filter category with dropdown

export interface FilterOptionsType {
  category: String[],
  Min: number,
  Max: number,
  sizes: String[],
  colors: String[],
  availability: String[],
  arrival: (string | null)
}

const AllProducts = () => {

  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');


  const [filterOptions, setFilterOptions] = useState<FilterOptionsType>({
    category: [],
    Min: 0,
    Max: 100000,
    sizes: [],
    colors: [],
    availability: [],
    arrival: null
  })

  let dispatch = useDispatch<AppDispatch>()

  // const products = useSelector((state:RootState)=> state.products.products)
  let { data: products, isLoading, isError, error } = useFetchProducts()

  let { mutate: searchMutate, data: searchData, isError: searchIsError, error: searchError, isPending: searchPending } = useSearchProducts()
  // let { mutate: applyFiltersMutate, data: filterData, isError: filterIsError, error: filterError, isPending: filterPending } = useFilterProuducts()


  // console.log(products)

  // console.log("searcherror", searchError)
  const handleSearch = () => {
    searchMutate({ search: searchTerm, filter: filterOptions })
  }


  console.log("searchTerm", searchTerm)

  function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || "Something went wrong!";
    }
    return "An unexpected error occurred.";
  }

  const handleRangeChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setFilterOptions((prev) => ({
        ...prev,
        Min: value[0],
        Max: value[1],
      }));
    }
  };


  const maxPrice = useMemo(() => {
    return products?.length > 0
      ? Math.max(...products.map((p: ProductType) => p.price))
      : 10000;  // Default max if no products are there
  }, [products]);

  const minPrice = useMemo(() => 0, [])


  console.log("searchData", searchData)

  useEffect(() => {
    if (searchData?.products?.length > 0) {
      const prices = searchData.products.map((p: any) => p.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      setFilterOptions(prev => ({
        ...prev,
        Min: prev.Min === 0 ? minPrice : prev.Min, // Update only if default
        Max: prev.Max === 10000 ? maxPrice : prev.Max, // Update only if default
      }));
    }
  }, [products, searchMutate]);

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
                  searchMutate({ search: searchTerm, filter: filterOptions })
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
        <FilterSideBar ref={sidebarRef} maxPrice={maxPrice} minPrice={minPrice} handleSearch={handleSearch} handleRangeChange={handleRangeChange} searchTerm={searchTerm} filterOptions={filterOptions} setFilterOptions={setFilterOptions} sidebarVisible={sidebarVisible} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setSidebarVisible={setSidebarVisible} />

        {/* THE BELOW FILTER IS FOR LARGE DEIVCES */}
        <section className={`${style.filters}`}>
          <div className={`${style.filterinnerDiv}`}>

            <div className={` ${style.filterscategory} ${style.productcategory}`}>
              <p>Product Category</p>


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
            </div>


            <div className={` ${style.filterscategory} ${style.productcategory}`}>
              <p>Arrival</p>

              {arrival && arrival.map(item =>
                <section key={item}>
                  <Radio name='arrival' id={item} color='success'
                    checked={filterOptions.arrival === item}
                    value={item}
                    // sx={{color:"blue"}}
                    onClick={() => setFilterOptions(p => {
                      return {
                        ...p,
                        arrival: p.arrival === item ? null : item
                      }
                    })} />
                  <div>
                    <label htmlFor={item}>{item}</label>
                  </div>
                </section>
              )}
            </div>



            <div className={` ${style.filterscategory} ${style.productcategory}`}>
              <p>Price</p>
              <section className='flex-col w-[100%]'>
                <div className={style.slidercontainer}>
                  <Slider
                    range
                    min={minPrice}
                    max={maxPrice}
                    step={100}
                    value={[filterOptions.Min, filterOptions.Max]}
                    onChange={handleRangeChange}
                    trackStyle={[{ backgroundColor: "teal", height: 5 }]}
                    handleStyle={[
                      { backgroundColor: "white", borderColor: "teal" },
                      { backgroundColor: "white", borderColor: "teal" },
                    ]}
                    // style={{ width: "80%" }}
                  />
                </div>


                <div className={`${style.priceinputfield} flex-col col-end-6 w-[100%] `}>
                  <TextField
                    placeholder="Min"
                    className="custom-input"
                    value={filterOptions.Min}
                    onChange={(e) => setFilterOptions(p => {
                      return {
                        ...p,
                        Min: Number(e.target.value)
                      }
                    })}
                    sx={{
                      width: {
                        xs: "80%",
                        sm: "80%",
                        md: "80%",
                        lg: "100%",
                      },
                      "& .MuiInputBase-input": {
                        height: {
                          xs: "10px",
                          sm: "10px",
                          md: "10px",
                          lg: "15px",
                          xl: "15px",
                        },
                      }
                    }}
                  />

                  <TextField
                    placeholder="Max"
                    className="custom-input"
                    value={filterOptions.Max}
                    onChange={(e) => setFilterOptions(p => {
                      return {
                        ...p,
                        Max: Number(e.target.value)
                      }
                    })}
                    sx={{
                      width: {
                        xs: "80%",
                        sm: "80%",
                        md: "80%",
                        lg: "100%",
                      },
                      "& .MuiInputBase-input": {
                        height: {
                          xs: "10px",
                          sm: "10px",
                          md: "10px",
                          lg: "15px",
                          xl: "15px",
                        },
                      }
                    }}
                  />
                </div>
              </section>
            </div>


          </div>

          {/* <div className='hidden'>
            <TextField />
          </div> */}

          <div className={`${style.applybtncontainer}`}>
            <Button variant='contained' className={`${style.applyBtn}`} onClick={() => searchMutate({ search: searchTerm, filter: filterOptions })}>Apply</Button>
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
                  searchMutate({ search: searchTerm, filter: filterOptions })
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
              <p className="text-2xl lg:text-4xl sm:text-2xl">{getErrorMessage(searchError)}</p>
            </section>)
            :
            <section className="h-[100vh] w-[100%] flex items-center justify-center">
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