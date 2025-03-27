import React from 'react'
import styles from '../../pages/Favourite/Favourite.module.css'
import { FavouriteItem } from '../../Types/types'
import { Button, IconButton } from '@mui/material'
import StarRating from '../../components/StarRating/StarRating'
import { DeleteOutline } from '@mui/icons-material'
import { useRemoveFavourite } from '../../apiList/favouriteApi'
import { useAddToCart } from '../../apiList/cartApi'

type FavouriteSingleProps = {
    item: FavouriteItem,
    // setFavourites: React.Dispatch<React.SetStateAction<FavouriteItem[]>>,
}

const FavouriteSingle = ({ item, }: FavouriteSingleProps) => {

    let {mutate:removeFavourite, isPending ,isError, error, } = useRemoveFavourite()

    const handleRemove = (id: string) => {
        // setFavourites(prev => prev.filter(item => item._id !== id));
        console.log("favourite items id", id)
        removeFavourite({productId:id, size:item.size, color:item.color })

    };

          let {mutate:addCartmutate} = useAddToCart()

          
    


    return (
        <div key={item?._id} className={styles.favouriteItem}>
            <img src={item?.productId.images[0]} alt={item?.productId.productName} className={styles.image} />

            <div className={styles.itemDetails}>
                <h2>{item.productId.productName} watcheswatches watches  watcheswatches watches  watcheswatches watches  watches watches Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat nostrum dolore vitae ipsa, totam voluptatem sit mollitia ad earum dicta.</h2>
                <p>Price: <span>${item?.productId.price?.toFixed(2)}</span></p>
                {/* <p>Rating: ⭐{item.rating}</p> */}
                <p><StarRating rating={item?.productId.reviewStar ?? 0} /></p>

                <div className={`${styles.btncontainer}`}>
                    <Button variant="contained" className={styles.addtoCartBtn} onClick={()=> addCartmutate({productId:item.productId._id, quantity:1, price:item.productId.price})}>
                        Add To Cart
                    </Button>

                    <IconButton className={styles.deleteBtn} onClick={() => handleRemove(item.productId._id)}>
                        <DeleteOutline />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default FavouriteSingle