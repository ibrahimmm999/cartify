import axios from "axios";

export const getProducts = (callback) => {
  axios
    .get("https://fakestoreapi.com/products")
    .then((res) => callback(res.data))
    .catch((err) => callback(err));
};

export const getDetailProduct = ({ id, callback }) => {
  axios
    .get("https://fakestoreapi.com/product/" + id)
    .then((res) => callback(res))
    .catch((err) => callback(err));
};
