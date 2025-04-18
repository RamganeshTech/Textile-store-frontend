export type ReviewType = {
    _id?: string
    userName: string,
    stars: number,
    description: string,
    userId:string
    profileImg:string,
  };
  
  export type ProductType = {
    _id:string;
    productName: string;
    price: number;
    description: string;
    reviews: ReviewType[];
    category?:string;
    colorVariants: {
      color: string;
      images: string[];
    }[];
    sizeVariants: {
      size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
      colors: {
        color: string;
        availableStock: number;
      }[];
    }[];
    reviewStar: number;
  };


  export interface CartItem {
    _id: string;
    quantity: number;
    productId: ProductType
    price:number,
    image:string,
    size:string,
    color:string,
  }
  

  export interface FavouriteItem {
    _id: string;
    productId:ProductType,
    // size:string,
    // color:string,
    image:string
  }