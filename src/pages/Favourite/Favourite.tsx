import React, { useEffect, useState } from "react";
import styles from "./Favourite.module.css";
import { FavouriteItem } from "../../Types/types";
// import { favouriteItems } from "../../Utils/product";
import FavouriteSingle from "../../subcomponents/FavouriteSingle/FavouriteSingle";

import { useFetchFavourite } from "../../apiList/favouriteApi";
import Loading from "../../components/LoadingState/Loading";


const FavouriteItems: React.FC = () => {
  // const [favourites, setFavourites] = useState<FavouriteItem[]>(favouriteItems);


  // let favouritesStore = useSelector((state:RootState)=> state.favourite.favourites)

  let {data:favourites, isLoading, isError, error} = useFetchFavourite()

  // console.log(favourites)


  // if(isLoading){
  //   return ( <div className="mt-[70px] h-[100vh] w-[100vw] flex justify-center items-center border border-amber-600">
  //     <Loading />
  //   </div>)
  // }

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Favourite Items</h1>

      {!isLoading && isError &&  <div className="h-[45vh] sm:h-[80vh] xs:w-[100vw] flex justify-center items-center">
          <p className="text-xl sm:text-2xl lg:text-4xl">{error ? (error as unknown as Error).message : "Something went wrong"}</p>
          </div>}


{ isLoading && !isError && ( <div className="mt-[70px] h-[50vh] w-[100vw] flex justify-center items-center">
      <Loading />
    </div>) }

      {Array.isArray(favourites) ? 
      <section className="h-[50vh] w-[100vw] flex items-center justify-center">
      <p className="text-4xl">No Favourite Items added yet...</p>
    </section>
      :favourites?.items && favourites?.items?.length === 0 ? (
         <section className="h-[50vh] w-[100vw] flex items-center justify-center">
         <p className="text-4xl">No Favourite Items added yet...</p>
       </section>

      ) : (
        favourites?.items && favourites?.items?.length > 0 && favourites?.items?.map((item:FavouriteItem) => (
          <FavouriteSingle 
          key={item._id}
          item={item} 
          // setFavourites={setFavourites}
          />
        ))
      )}
    </main>
  );
};

export default FavouriteItems;
