import axios from "axios";

export const login = (data, callback) => {
  axios
    .post("https://fakestoreapi.com/auth/login", data)
    .then((res) => callback(true, res.data))
    .catch((err) => callback(false, err));
};

export const getUser = (id, callback) => {
  axios
    .get(`https://fakestoreapi.com/users/${id}`)
    .then((res) => callback(true, res.data))
    .catch((err) => callback(false, err));
};
