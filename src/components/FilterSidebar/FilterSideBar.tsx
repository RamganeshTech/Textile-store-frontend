import React, { ChangeEvent, forwardRef, useState } from 'react'
import style from '../../pages/AllProducts/AllProducts.module.css'
import { Button, IconButton, Radio, TextField } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { Close } from '@mui/icons-material'
import { FilterOptionsType } from '../../pages/AllProducts/AllProducts';
import { useFilterProuducts, useSearchProducts } from '../../apiList/productApi';
import { arrival, availabilities, categories, sizes } from '../../constants/filterConstants';
import Slider from 'rc-slider';
import "rc-slider/assets/index.css";


type FilterSideBarProp = {
  ref: (React.RefObject<HTMLDivElement> | null),
  sidebarVisible: boolean,
  setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>,
  selectedCategory: string,
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptionsType>>,
  filterOptions: FilterOptionsType,
  searchTerm: string,
  handleSearch: () => void
  handleRangeChange: (value: number | number[]) => void;
  maxPrice: number;
  minPrice: number
}


const FilterCategory: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={`${style.filterscategory} ${style.productcategory}`}>
      <p onClick={() => setOpen(!open)} className={style.filterTitle}>
        {title}
      </p>
      <div className={`${style.filterOptions} ${open ? style.open : ''}`}>
        {children}
      </div>
    </div>
  );
};

const FilterSideBar = forwardRef<HTMLDivElement, FilterSideBarProp>(({ handleSearch, minPrice, maxPrice, handleRangeChange, searchTerm, setFilterOptions, filterOptions, sidebarVisible, setSidebarVisible, setSelectedCategory, selectedCategory }, ref) => {

  const [value, setValue] = useState<number>(50); // Initial value

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };


  //  let { mutate: searchMutate, data: searchData, isError: searchIsError, error: searchError, isPending: searchPending } = useSearchProducts()
  //   let { mutate: applyFiltersMutate, data: filterData, isError: filterIsError, error: filterError, isPending: filterPending } = useFilterProuducts()

  const percentage = value;



  return (
    <section id='sidebar' ref={ref} className={`${style.sidebar} ${sidebarVisible ? style.visible : ''}`}>
      <div className={`${style.sidebarHeader}`}>
        <h3 className='text-lg'>Filters</h3>
        <IconButton
          onClick={() => {
            console.log("Closing sidebar"); // Debug line
            setSidebarVisible(false);
          }}
          // variant="contained"
          className={style.closeBtn}
        >
          <Close />
        </IconButton>
      </div>
      <div className={style.sidebarinnerDiv}>
        <FilterCategory title="Product Category">
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
        </FilterCategory>

        <FilterCategory title="Product Availability">
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
        </FilterCategory>

        <FilterCategory title="Product Size">
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
        </FilterCategory>

        <FilterCategory title="Arrival">
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
        </FilterCategory>

        <FilterCategory title="Price">
          <section className="flex-col w-[80%]">
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
              style={{ width: "100%" }}
            />
            <div className="flex flex-col !gap-2 w-[100%]">
              <TextField
                placeholder="Min"
                value={filterOptions.Min}
                className="custom-input"
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
        </FilterCategory>
      </div>
      <div className={`${style.applybtncontainer}`}>
        {/* <Button variant='contained' className={`${style.applyBtn}`} onClick={()=> applyFiltersMutate(filterOptions)}>Apply</Button> */}

        <Button variant='contained' className={`${style.applyBtn}`} onClick={() => {
          // console.log(filterOptions)
          // searchMutate({ search: searchTerm, filter: filterOptions })
          handleSearch()
        }
        }>Apply</Button>

      </div>
    </section>
  )
}
);

export default FilterSideBar