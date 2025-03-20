export type ReviewType = {
    ownerName: string;
    profileImg: string;
    description: string;
    stars: number;
  };
  
  export type ProductType = {
    id:number;
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
  };
  