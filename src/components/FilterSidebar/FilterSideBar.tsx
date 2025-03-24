import React, { forwardRef, useState } from 'react'
import style from '../../pages/AllProducts/AllProducts.module.css'
import { IconButton, TextField } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { Close } from '@mui/icons-material'


type FilterSideBarProp = {
    ref: (React.RefObject<HTMLDivElement> | null),
    sidebarVisible: boolean,
    setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>,
    selectedCategory: string,
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

const FilterSideBar = forwardRef<HTMLDivElement, FilterSideBarProp>(({ sidebarVisible, setSidebarVisible, setSelectedCategory, selectedCategory }, ref) => {

    const [value, setValue] = useState<number>(50); // Initial value

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
    };


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
                    <section onClick={() => setSelectedCategory('Laptop')}>
                        <Checkbox color="primary" checked={selectedCategory.toLowerCase() === 'laptop'} />
                        <div>
                            <label>Laptop</label>
                            {/* <span>(76)</span> */}
                        </div>
                    </section>
                    <section onClick={() => setSelectedCategory('Shirt')}>
                        <Checkbox color="primary" checked={selectedCategory.toLowerCase() === 'shirt'} />
                        <div>
                            <label>Shirt</label>
                            {/* <span>(30)</span> */}
                        </div>
                    </section>

                </FilterCategory>

                <FilterCategory title="Product Availability">
                    <section>
                        <Checkbox color="primary" />
                        <div>
                            <label>Out of Stock</label>
                            {/* <span>(10)</span> */}
                        </div>
                    </section>
                    <section>
                        <Checkbox color="primary" />
                        <div>
                            <label>Available</label>
                            {/* <span>(66)</span> */}
                        </div>
                    </section>
                </FilterCategory>

                <FilterCategory title="Product Size">
                    <section>
                        <Checkbox color="primary" />
                        <div>
                            <label>XS</label>
                        </div>
                    </section>
                    <section>
                        <Checkbox color="primary" />
                        <div>
                            <label>S</label>
                        </div>
                    </section>
                    <section>
                        <Checkbox color="primary" />
                        <div>
                            <label>M</label>
                        </div>
                    </section>
                    <section>
                        <Checkbox color="primary" />
                        <div>
                            <label>L</label>
                        </div>
                    </section>
                </FilterCategory>

                <FilterCategory title="Arrival">
                    <section>
                        <Checkbox color="primary" />
                        <div>
                            <label>Newest</label>
                            <span>(76)</span>
                        </div>
                    </section>
                    <section>
                        <Checkbox color="primary" />
                        <div>
                            <label>Oldest</label>
                            <span>(76)</span>
                        </div>
                    </section>
                </FilterCategory>

                <FilterCategory title="Price">
                    <section className="flex-col w-[100%]">
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={value}
                            onChange={handleChange}
                            // style={{
                            //     width: '100%',
                            //     background: `linear-gradient(to right, #3182ce 0%, #3182ce ${percentage}%, #ccc ${percentage}%, #ccc 100%)`,
                            //     appearance: 'none',
                            //     height: '4px',
                            //     borderRadius: '5px',
                            //     outline: 'none',
                            // }}

                            className='blue-slider'
                        />
                        <div className="flex flex-col !gap-2 w-[100%]">
                            <TextField size="small" className='w-[80%]' placeholder='Min' />
                            <TextField size="small" className='w-[80%]' placeholder='Max'/>
                        </div>
                    </section>
                </FilterCategory>
            </div>
        </section>
    )
}
);

export default FilterSideBar