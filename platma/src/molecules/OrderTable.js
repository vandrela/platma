import React, { useEffect, useState } from "react";
import { getOrders } from "../apiServices/apiServices";
import { PropagateLoader } from "react-spinners";
import "./OrderTable.css";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then((response) => {
        setOrders(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading orders:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Order Table</h2>
      {isLoading ? (
        <PropagateLoader color={"green"} size={15} />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.order_id}>
                <tr>
                  <td>{order.order_id}</td>
                  <td>{order.user_id}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>

                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td></td>
                    <td></td>
                    <td>{item.product_id}</td>
                    <td>{item.quantity}</td>
                    <td>{order.total_price}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderTable;
