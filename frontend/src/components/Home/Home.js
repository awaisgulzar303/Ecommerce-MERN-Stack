import React from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product";

const product = {
  name: "Mobile",
  price: 25000,
  image: [
    {
      url: "https://images.pexels.com/photos/4065906/pexels-photo-4065906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ],
  _id: "awaisGulzar",
};

const Home = () => {
  return (
    <>
      <div className="banner">
        <h3>WELCOME TO THE JOT STORE</h3>
        <h2>LOOKING FOR AMAZING PRODUCTS?</h2>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Feactured Products</h2>

      <div className="container" id="container">
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;
