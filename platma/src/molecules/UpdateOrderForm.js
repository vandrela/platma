import React, { useState } from "react";
import { updateOrder } from "../apiServices/apiServices";
import "./UpdateOrderForm.css";

const UpdateOrderForm = ({ onClose, onUpdateOrder }) => {
  const [formData, setFormData] = useState({
    items: [
      { product_id: 1, quantity: 2, price: "", status: "" },
      { product_id: 2, quantity: 1, price: "", status: "" },
      { product_id: 3, quantity: 1, price: "", status: "" },
      { product_id: 4, quantity: 1, price: "", status: "" },
      { product_id: 5, quantity: 1, price: "", status: "" },
    ],
    total_price: "",
  });

  const handleItemChange = (index, fieldName, fieldValue) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [fieldName]: fieldValue,
    };

    setFormData((prevData) => ({
      ...prevData,
      items: updatedItems,
    }));
  };

  const calculateTotalPrice = () => {
    const totalPrice = formData.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    setFormData((prevData) => ({
      ...prevData,
      total_price: totalPrice.toFixed(2),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { items, total_price } = formData;
    const user_id = 1;

    updateOrder(user_id, items, total_price)
      .then((response) => {
        console.log("Data updated:", response.data);
        onUpdateOrder(response.data);
        onClose();
        console.log(formData.items, "<--- FormData!");
        console.log(formData.total_price, "<--- TotalPrice!");
        alert("Orders were successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating orders:", error);
        alert("Error updating orders. Please try again.");
      });
  };

  return (
    <div className="update-order-form">
      <h2>Update Order</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="user_id" value={1} />

        <div className="order-items">
          {formData.items.map((item, index) => (
            <div key={index} className="order-item">
              <label>
                Product ID:
                <input type="number" value={item.product_id} disabled />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                  onBlur={calculateTotalPrice}
                />
              </label>
              <label>
                Status:
                <select
                  value={item.status}
                  onChange={(e) =>
                    handleItemChange(index, "status", e.target.value)
                  }
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </label>
            </div>
          ))}
        </div>

        <div className="order-submit">
          <label>
            Total Price:
            <input
              type="number"
              name="total_price"
              value={formData.total_price}
              readOnly
            />
          </label>

          <button type="submit">Update Order</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOrderForm;
