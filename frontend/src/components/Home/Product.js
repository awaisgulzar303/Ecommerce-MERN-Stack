import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "Gold",
  value: 3.5,
  isHalf: true,
  size: window.innerWidth < 600 ? 20 : 25,
};
const Product = ({ product }) => {
  return (
    <Link className="productCard" to={product._id}>
      <img src={product.image[0].url} alt={product.name} />
      <p> {product.name}</p>
      <div>
        <ReactStars {...options} />

        <span>(256 Rating)</span>
      </div>

      <span>Rs {product.price}</span>
    </Link>
  );
};

export default Product;
