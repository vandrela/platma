import React, { useState } from "react";
import { getOrders } from "./apiServices/apiServices";
import OrderTable from "./molecules/OrderTable";
import UpdateOrderForm from "./molecules/UpdateOrderForm";

const App = () => {
  const [showOrders, setShowOrders] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [orders, setOrders] = useState([]);

  const handleShowOrders = () => {
    getOrders().then((response) => {
      console.log(response.data);
      setOrders(response.data);
      setShowOrders(true);
    });
  };

  const handleShowUpdateForm = () => {
    setShowUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const handleUpdateOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    handleCloseUpdateForm();
  };

  return (
    <div>
      <h1>React App with Orders</h1>
      <button onClick={handleShowOrders}>Show Orders</button>
      <button onClick={handleShowUpdateForm}>Update Order</button>
      {showOrders && <OrderTable orders={orders} />}{" "}
      {showUpdateForm && (
        <UpdateOrderForm
          onClose={handleCloseUpdateForm}
          onUpdateOrder={handleUpdateOrder}
        />
      )}
    </div>
  );
};

export default App;
