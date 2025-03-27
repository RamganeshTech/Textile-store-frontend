export type ReviewType = {
    ownerName: string;
    profileImg: string;
    description: string;
    stars: number;
  };
  
  export type ProductType = {
    _id:string;
    productName: string;
    price: number;
    size: string;
    availableSizes: string[];
    color: string;
    availableColors: string[];
    availableStocks: number;
    images: string[];
    description: string;
    reviews: ReviewType[];
    reviewStar: number;
    category?:string;
  };


  export interface CartItem {
    _id: string;
    quantity: number;
    productId: ProductType
    price:number
  }
  

  export interface FavouriteItem {
    _id: string;
    // productImg: string;
    // productTitle: string;
    // price: number;
    // availableStocks: number;
    // rating?:number;
    productId:ProductType,
    size:string,
    color:string,
  }
  