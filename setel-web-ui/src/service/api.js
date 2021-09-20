import axios from "axios";

const apiPath = "http://localhost:3000/api/v1";

export async function createOrder(order) {
  const res = await axios.post(`${apiPath}/orders`, order);

  return res.data;
}

export async function getOrders() {
  const res = await axios.get(`${apiPath}/orders`);

  return res.data;
}

export async function getOrder(id) {
  const res = await axios.get(`${apiPath}/orders/${id}`);

  return res.data;
}

export async function cancelOrder(id) {
  const res = await axios.delete(`${apiPath}/orders/${id}`);

  return res.data;
}
