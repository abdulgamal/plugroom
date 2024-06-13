import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.baseURL = "https://mern-booking-87wi.onrender.com/api";

export const loginFn = async (values) => {
  const response = await axios.post("/auth/login", values, {
    withCredentials: true,
  });
  return response;
};

export const registerFn = async (values) => {
  const response = await axios.post("/auth/register", values, {
    withCredentials: true,
  });
  return response;
};

export const getVenues = async () => {
  return await axios.get("/venue");
};

export const getUserVenues = async (id) => {
  return await axios.get("/venue/user/" + id, { withCredentials: true });
};

export const addVenue = async (values) => {
  return await axios.post("/venue", values, { withCredentials: true });
};

export const updateVenue = async (id, values) => {
  return await axios.put("/venue/" + id, values, { withCredentials: true });
};

export const signOutUser = async () => {
  return await axios.get("/auth/logout", { withCredentials: true });
};

export const getAllUsers = async () => {
  return await axios.get("/auth/users");
};

export const updateUser = async (values) => {
  return await axios.put("/auth/user", values, { withCredentials: true });
};

export const getBookings = async () => {
  return await axios.get("/orders", { withCredentials: true });
};

export const getOrders = async () => {
  return await axios.get("/orders/host", { withCredentials: true });
};

export const getOrderDates = async (id) => {
  return await axios.get("/orders/" + id);
};

export const deleteOrder = async (id) => {
  return await axios.delete("/orders/" + id, { withCredentials: true });
};

export const updateOrder = async (id, values) => {
  return await axios.put("/orders/" + id, values, { withCredentials: true });
};

export const orderFn = async (values) => {
  return await axios.post("/orders", values, { withCredentials: true });
};

export const updateStatus = async (id, values) => {
  return await axios.put("/auth/user/" + id, values, { withCredentials: true });
};

export const deleteUser = async (id) => {
  return await axios.delete("/auth/user/" + id, { withCredentials: true });
};
