import type { MetaFunction } from "@remix-run/node";
import { LinksFunction } from "@remix-run/node";
import { Link } from '@remix-run/react';


export const meta: MetaFunction = () => {
  return [
    { title: "EcoPoints" }
  ];
};

export const links: LinksFunction = () => {
  return [
    { rel: "icon", href: "/logo.png", type: "image/png" }, 
    { rel: "stylesheet", href: "/styles/global.css" }
  ];
};


export default function Index() {
  return (
    <div className="landingPageDiv">
      <nav className="navBar">
        <a href="/" className="siteTitle">EcoPoints</a>
      </nav>
      <div className="mainContainer">
        <div className="leftSide">
          <div className="leftContainer">
          <p className="firstPar"> Turn Trash</p>
          <p className="secPar"> Into Trearure</p>
          <Link to="/auth/" className="loginBtn">Log In</Link>
          {/* <button className="loginBtn"> Log In</button> */}
          </div>
    
        </div>
        <div className="rightSide">
          <img src="build/server/assets/landingPagePic.png" className="landingPagePic" alt="landingPagePic"></img>
        </div>
      </div>
      <footer>
          <div className="footerDetails">
            <p> contact us @ ecopoints@gmail.com </p> 
          </div>
        </footer>
    </div>
  );
}
