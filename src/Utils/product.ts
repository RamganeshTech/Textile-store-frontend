import { FavouriteItem, ProductType } from "../Types/types";

const products: ProductType[] = [
    {
      __id:"1",
      productName: "Nadhiya - flared cotton anarkali suit set in white",
      price: 1299,
      size: "M",
      availableSizes: ["S", "M", "L", "XL"],
      color: "Pink",
      availableColors: ["Pink", "Blue", "White"],
      availableStocks: 15,
      reviewStar:5,
      images: [
        "https://picsum.photos/200/300?random=1",
        "https://picsum.photos/200/301?random=2",
        "https://picsum.photos/200/302?random=3",
        "https://picsum.photos/200/302?random=3",
        "https://picsum.photos/200/302?random=3",
        "https://picsum.photos/200/302?random=3",
        "https://picsum.photos/200/302?random=3",
        "https://picsum.photos/200/302?random=3",
        "https://picsum.photos/200/302?random=3",
        "https://picsum.photos/200/302?random=3",
        "https://picsum.photos/200/302?random=3",
        "https://picsum.photos/200/302?random=3",
        "https://picsum.photos/200/302?random=3",
        "https://picsum.photos/200/302?random=3",
        "https://picsum.photos/200/302?random=3",
      ],
      description: `A lightweight and stylish floral summer dress, perfect for casual outings. 
      PLENTY OF STORAGE: There are two chest pockets on this women's hooded flannel, making it easy to bring all your favorite things with you. VERSATILE: The Lumber Jane Hooded Flannel is a heavyweight shirt that you can wear open or snapped, depending on your mood. With it's jersey lined hood, it's as warm and comfortable as your favorite hoodie! RELAXED FIT: The women's hooded flannel was made with a relaxed fit for the days you want some room for layering or just want that extra bit of comfort. 100% SATISFACTION GUARANTEE: Designed in the USA, Legendary Whitetails is an American small business. We take pr_ide in all our products. Love it or send it back!
      `,
      reviews: [
        {
          user_Id:"1",
          userName: "Sophia Carter",
          profileImg: "https://picsum.photos/50/50?random=4",
          description: "Absolutely love this dress! The fabric is soft and comfortable.",
          stars: 5,
        },
        {
          user_Id:"2",
          userName: "Emily Brown",
          profileImg: "https://picsum.photos/51/51?random=5",
          description: "The fit is perfect, but the color was slightly different from the picture.",
          stars: 4,
        },
      ],
    },
    {
      _id:"2",
      productName: "High-Waist Jeans",
      price: 1599,
      size: "L",
      availableSizes: ["S", "M", "L", "XL"],
      color: "Blue",
      availableColors: ["Blue", "Black", "Grey"],
      availableStocks: 25,
      reviewStar:5,
      images: [
        "https://picsum.photos/200/303?random=6",
        "https://picsum.photos/200/304?random=7"
      ],
      description: "Classic high-waist skinny jeans that enhance your silhouette.",
      reviews: [
        {
          user_Id:"1",
          userName: "Olivia White",
          profileImg: "https://picsum.photos/52/52?random=8",
          description: "Great quality jeans, very comfortable for daily wear!",
          stars: 5,
        },
        {
          user_Id:"2",
          userName: "Ava Green",
          profileImg: "https://picsum.photos/53/53?random=9",
          description: "Good fit, but the fabric is a little stiff at first.",
          stars: 4,
        },
      ],
    },
    {
      _id:3,
      productName: "Casual Crop Top",
      price: 799,
      size: "S",
      availableSizes: ["XS", "S", "M", "L"],
      color: "White",
      availableColors: ["White", "Black", "Red"],
      availableStocks: 30,
      reviewStar:5,
      images: [
        "https://picsum.photos/200/305?random=10",
        "https://picsum.photos/200/306?random=11"
      ],
      description: "Trendy and comfortable cotton crop top for everyday wear.",
      reviews: [
        {
          user_Id:"1",
          userName: "Mia Johnson",
          profileImg: "https://picsum.photos/54/54?random=12",
          description: "Super cute and stylish! Goes well with jeans and skirts.",
          stars: 5,
        },
      ],
    },
    {
      _id:4,
      productName: "Elegant Evening Gown",
      price: 2999,
      size: "M",
      availableSizes: ["S", "M", "L", "XL"],
      color: "Red",
      availableColors: ["Red", "Black", "Navy Blue"],
      availableStocks: 10,
      reviewStar:5,
      images: [
        "https://picsum.photos/200/307?random=13",
        "https://picsum.photos/200/308?random=14"
      ],
      description: "An elegant evening gown with a flowing silhouette for special occasions.",
      reviews: [
        {
          user_Id:"1",
          userName: "Isabella Martin",
          profileImg: "https://picsum.photos/55/55?random=15",
          description: "Absolutely stunning! Got so many compliments.",
          stars: 5,
        },
      ],
    }
  ];


  export const favouriteItems: FavouriteItem[] = [
    {
      _id: 1,
      productImg: "https://picsum.photos/200/300?random=4",
      productTitle: "Stylish Jacket",
      price: 49.99,
      availableStocks: 10,
      rating: 4.5,
    },
    {
      _id: 2,
      productImg: "https://picsum.photos/200/300?random=1",
      productTitle: "Casual Sneakers",
      price: 59.99,
      availableStocks: 5,
      rating: 4.2,
    },
    {
      _id: 3,
      productImg: "https://picsum.photos/200/300?random=2",
      productTitle: "Leather Handbag",
      price: 89.99,
      availableStocks: 7,
      rating: 4.8,
    },
    {
      _id: 4,
      productImg: "https://picsum.photos/200/300?random=3",
      productTitle: "Smart Watch",
      price: 129.99,
      availableStocks: 3,
      rating: 4.7,
    },
  ];
  
  
  export default products;
  