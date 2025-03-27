import React, { useEffect, useState } from "react";
import styles from "./Favourite.module.css";
import { FavouriteItem } from "../../Types/types";
// import { favouriteItems } from "../../Utils/product";
import FavouriteSingle from "../../subcomponents/FavouriteSingle/FavouriteSingle";

import { useFetchFavourite } from "../../apiList/favouriteApi";


const FavouriteItems: React.FC = () => {
  // const [favourites, setFavourites] = useState<FavouriteItem[]>(favouriteItems);


  // let favouritesStore = useSelector((state:RootState)=> state.favourite.favourites)

  let {data:favourites, isLoading, isError} = useFetchFavourite()

  console.log(favourites?.items)

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Favourite Items</h1>
      {favourites?.items && favourites?.items?.length === 0 ? (
        <p className={styles.empty}>No favourite items added.</p>
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
