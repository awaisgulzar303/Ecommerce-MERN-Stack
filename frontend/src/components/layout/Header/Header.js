import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { FaUserAlt, FaCartPlus, FaSearchPlus } from "react-icons/fa";

const Header = () => {
  return (
    <ReactNavbar
      burgerColor="black"
      burgerColorHover="white"
      logo={logo}
      logoWidth="13vmax"
      navColor1="#FFF5EE"
      logoHoverSize="50px"
      logoHoverColor="#eb4034"
      link1Text="Home"
      link2Text="Product"
      link3Text="Contact"
      link4Text="About"
      link1Url="/Home"
      link2Url="/Product"
      link3Url="/Contact"
      link4Url="/About"
      link1Size="1.7vmax"
      link1Color="rgba(35, 35, 35,0.8)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#240B36"
      link1Margin="1vmax"
      profileIconColor="rgba(35, 35, 35, 0.8)"
      searchIconColor="rgba(35, 35, 35, 0.8)"
      cartIconColor="rgba(35, 35, 35, 0.8)"
      profileIcon={true}
      ProfileIconElement={FaUserAlt}
      profileIconSize="1.7vmax"
      profileIconMargin="1vmax"
      searchIconMargin="1vmax"
      cartIconMargin="1vmax"
      searchIcon={true}
      SearchIconElement={FaSearchPlus}
      cartIcon={true}
      CartIconElement={FaCartPlus}
      searchIconColorHover="#240B36"
      profileIconColorHover="#240B36"
      cartIconColorHover="#240B36"
    />
  );
};

export default Header;
