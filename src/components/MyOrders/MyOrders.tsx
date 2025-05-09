import React from "react";
import styles from "./MyOrders.module.css";
import { useFetchMyOrders } from "../../apiList/userprofileApi";
import { OrderType } from "../../Types/types";
import SingleOrder from "./SingleOrder";

const MyOrders: React.FC = () => {
  const { data: orders } = useFetchMyOrders()

return(
    <div className={styles.container}>
      <h2 className={styles.title}>My Orders</h2>
       <div className={styles.orderContainer}>
       {orders?.map((order: OrderType) => (
         <SingleOrder key={(order as any)._id} order={order} />
        )
      )}
       </div>
      </div>
        )
};



export default MyOrders;
