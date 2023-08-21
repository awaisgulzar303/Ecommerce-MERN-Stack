import React from "react";
import "../Footer/Footer.css";
import logo from "../../../images/logo.png";
import Appstore from "../../../images/Appstore.png";
import playstore from "../../../images/playstore.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android ansd IOS </p>
        <img src={playstore} alt="playstore"></img>
        <img src={Appstore} alt="Appstore"></img>
      </div>

      <div className="midFooter">
        <img src={logo} className="rotate" alt="logo"></img>
        <h2>The JOT Store</h2>
        <p>Copyrights 2023 &copy; TheJOTStore </p>
      </div>

      <div className="rightFooter">
        <h3>Follow Us!</h3>
        <a href="https://instagram.com/thejotstore?igshid=MzRlODBiNWFlZA==">
          Instagram
        </a>
        <a href="https://instagram.com/thejotstore?igshid=MzRlODBiNWFlZA==">
          Youtube
        </a>
        <a href="https://instagram.com/thejotstore?igshid=MzRlODBiNWFlZA==">
          FaceBook
        </a>
      </div>
    </footer>
  );
};

export default Footer;
