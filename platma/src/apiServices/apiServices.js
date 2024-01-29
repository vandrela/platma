import axios from "axios";
const BASE_URL = "https://fake-store-api.mock.beeceptor.com";
// unfortunatelly haven't found any valid fake api with orders to do get/post/put requests

export const getOrders = () => axios.get(`${BASE_URL}/api/orders`);
export const updateOrder = (userId, items) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    user_id: userId,
    items: items,
  };

  return axios.put(`${BASE_URL}/api/orders`, data, { headers });
};

// export const addOrder = (id, data) =>
//   axios.put(`${BASE_URL}/orders/${id}`, data);
