import React from 'react'
import styles from '../../pages/Favourite/Favourite.module.css'
import { FavouriteItem } from '../../Types/types'
import { Button, IconButton } from '@mui/material'
import StarRating from '../../components/StarRating/StarRating'
import { DeleteOutline } from '@mui/icons-material'

type FavouriteSingleProps = {
    item: FavouriteItem,
    setFavourites: React.Dispatch<React.SetStateAction<FavouriteItem[]>>,
}

const FavouriteSingle = ({ item, setFavourites }: FavouriteSingleProps) => {


    const handleRemove = (id: number) => {
        setFavourites(prev => prev.filter(item => item.id !== id));
    };


    return (
        <div key={item.id} className={styles.favouriteItem}>
            <img src={item.productImg} alt={item.productTitle} className={styles.image} />

            <div className={styles.itemDetails}>
                <h2>{item.productTitle} watcheswatches watches  watcheswatches watches  watcheswatches watches  watches watches Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat nostrum dolore vitae ipsa, totam voluptatem sit mollitia ad earum dicta.</h2>
                <p>Price: <span>${item.price.toFixed(2)}</span></p>
                {/* <p>Rating: ⭐{item.rating}</p> */}
                <p><StarRating rating={item.rating ?? 0} /></p>

                <div className={`${styles.btncontainer}`}>
                    <Button variant="contained" className={styles.addtoCartBtn} >
                        Add To Cart
                    </Button>

                    <IconButton className={styles.deleteBtn} onClick={() => handleRemove(item.id)}>
                        <DeleteOutline />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default FavouriteSingle