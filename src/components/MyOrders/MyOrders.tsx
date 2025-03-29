import React from "react";
import styles from "./MyOrders.module.css";

const MyOrders: React.FC = () => {
  // Dummy orders (replace with API call)
  const orders = [
    { id: 1, product: "T-Shirt", price: "$20" },
    { id: 2, product: "Shoes", price: "$50" },
  ];

  return (
    <div className={styles[`container`]}>
      <h2 className={styles[`title`]}>My Orders</h2>
      <ul className={styles[`orderList`]}>
        {orders.map((order) => (
          <li key={order.id} className={styles[`orderItem`]}>
            {order.product} - {order.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;
