import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "EcoPoints" },
    { name: "description", content: "Welcome to EcoPoints!" },
  ];
};

export default function Index() {
  return (
    <div className=" bg-custom-green min-h-screen">
      <nav className="h-20 w-full px-5 py-10 bg-custom-green flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="public/logoText.png" alt="EcoPoints Logo" className="h-20 w-auto"></img>
          <a href="/" className="text-black text-xl hover:bg-green-700 rounded px-3 py-2 transition duration-300">Home</a> 
          <a href="/about" className="text-black text-xl hover:bg-green-700 rounded px-3 py-2 transition duration-300">About Us</a> 
          <a href="/contact" className="text-black text-xl hover:bg-green-700 rounded px-3 py-2 transition duration-300">Contact Us</a> 
        </div>
        <Link to="/login" className="bg-custom-darkgreen hover:bg-lime-700 text-white font-bold py-2 px-4 rounded">Log in</Link>
      </nav>
      <div className="mainContainer flex items-center justify-between px-10 py-10">
        <div className="leftSide w-1/2">
          <h1 className="text-9xl font-bold text-green-800 mb-4">Turn Trash Into Treasure</h1>
          <p className=" pl-10 text-3xl">Help us make the world a cleaner place by recycling your waste.</p>
          <Link to="/learn-more" className="mt-4 inline-block bg-custom-darkgreen text-black py-2 px-5 rounded hover:bg-lime-700 transition duration-300">Learn more</Link>
        </div>
        <div className="rightSide w-1/2">
          <img src="build/server/assets/landingPagePic.png" className="max-w-full h-auto" alt="Recycling"></img>
        </div>
      </div>
      <footer className="bg-white text-center p-4">
        <p>Contact us at ecopoints@gmail.com</p> 
      </footer>
    </div>
  );
}
