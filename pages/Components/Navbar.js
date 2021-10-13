import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" bg-blue-400 border-b-4 pt-1 pb-1 rounded-lg mb-3 border-black  ">
      <div className=" flex flex-col md:flex-row  ">
        <div href="/" className="  flex justify-between md:flex-row md:mx-auto text-pink-300  text-2xl  items-center px-3 py-6 md:py-0 md:border-b-0  ">
      
        <a href="/" className="hover:bg-blue-300 rounded-full transition duration-500 ease-in-out "><img src=""  width="75" alt="" /></a>
          <div>


            <button
              onClick={() => setIsOpen(!isOpen)}
              className="outline:none focus:outline-none block md:hidden hover:bg-blue-300 rounded-lg transition ease-in-out duration-700"
            >
              <svg
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="black"
              >
                <path
                  className={isOpen ? "block" : "hidden"}
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
                <path
                  className={!isOpen ? "block" : "hidden"}
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          }   md:flex px-48 flex-col md:flex-row w-screen justify-between self-center py-4 md:py-0 items-center `}
        >
          <div className=" font-gluten flex pr-12 flex-col font-semibold text-black font-lg md:flex-row md:mx-auto transition ease-in-out duration-700">
            <a href="/" className="text-xl block px-3 hover:text-blue-300 py-2 md:py-6 ">
              Home
            </a>

            <a href="#about" className="text-xl block px-3 hover:text-blue-300  py-2 md:py-6 transition ease-in-out duration-700">
              About
            </a>

            <a href="https://twitter.com/UrbanMartians_" className="text-xl block px-3 hover:text-blue-300 py-2 md:py-6 ">
              Twitter
            </a>
            
            <a href="https://discord.gg/nej5p8DbT4" className="text-xl block px-3 hover:text-blue-300 py-2 md:py-6 ">
              Discord
            </a>
            <a href="https://geekylabs.art/" className="text-xl block px-3 hover:text-blue-300 py-2 md:py-6 ">
              GeekyLabs.
            </a>
          </div>
          <div className="flex flex-col md:flex-row">
            <a href="/mint" className="block px-4 py-2 md:py-6">
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
