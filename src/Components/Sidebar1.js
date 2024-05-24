import React, { useState, useEffect } from 'react';
import Logo from "../Assets/Logo.png";
import Logo4 from "../Assets/Logo12.png";
import Declaration from "../Assets/Declaration.png";
import { Route, Link } from "react-router-dom";
import axios from 'axios';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <div className="bg-[#494949] w-[23vw] h-[100vh] text-white ">
    <div className="flex flex-col justify-between h-[80vh]">
      <img src={Logo4} alt="Logo" className="w-[17vw] h-[30vh] py-3 mx-auto" />
      <div className="flex flex-col justify-center items-center">
          {/* <button className="bg-[#333333] rounded-2xl p-2 w-32 my-3 text-lg">
            Threads
          </button>

          <button className="bg-[#333333] rounded-2xl p-2 w-32 m-3 text-lg">
            About Us
          </button> */}
        </div>
        {/* <img src={Declaration} alt="Declaration" className="w-[15vw] mx-auto" /> */}
      </div>
    </div>
  );
}

export default Sidebar;