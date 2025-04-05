import React, { useState } from 'react';
import "./Navbar.css";
import Categories from "./Categories";


function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
  
return (
    <>

    <div className="navbar">
            <div className="left-nav-zap">
            <nav> <i class="bi bi-egg-fill fs-4"></i> Zaapin</nav>
            </div>
            <div className="right-nav-ad">
             <nav><i class="bi bi-person-fill fs-4"  onClick={toggleDropdown}></i> Administrator</nav>
            </div>
    </div> 
    </>

  )
}

export default Navbar;