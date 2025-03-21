import React, { useState } from "react";
import styles from "./Favourite.module.css";
import { FavouriteItem } from "../../Types/types";
import { favouriteItems } from "../../Utils/product";
import { Button, IconButton } from '@mui/material';
import { DeleteOutline } from "@mui/icons-material";
import StarRating from "../../components/StarRating/StarRating";
import FavouriteSingle from "../../subcomponents/FavouriteSingle/FavouriteSingle";


const FavouriteItems: React.FC = () => {
  const [favourites, setFavourites] = useState<FavouriteItem[]>(favouriteItems);


  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Favourite Items</h1>
      {favourites.length === 0 ? (
        <p className={styles.empty}>No favourite items added.</p>
      ) : (
        favourites.map((item) => (
          // <div key={item.id} className={styles.favouriteItem}>
          //   <img src={item.productImg} alt={item.productTitle} className={styles.image} />

          //   <div className={styles.itemDetails}>
          //     <h2>{item.productTitle} watcheswatches watches  watcheswatches watches  watcheswatches watches  watches watches</h2>
          //     <p>Price: <span>${item.price.toFixed(2)}</span></p>
          //     {/* <p>Rating: ⭐{item.rating}</p> */}
          //     <p><StarRating rating={item.rating ?? 0} /></p>

          //    <div className={`${styles.btncontainer}`}>
          //     <Button variant="contained" className={styles.addtoCartBtn} >
          //       Add To Cart
          //     </Button>

          //     <IconButton  className={styles.deleteBtn} onClick={() => handleRemove(item.id)}>
          //           <DeleteOutline />
          //       </IconButton>
          //    </div>
          //   </div>
          // </div>

          <FavouriteSingle item={item} setFavourites={setFavourites}/>
        ))
      )}
    </main>
  );
};

export default FavouriteItems;
