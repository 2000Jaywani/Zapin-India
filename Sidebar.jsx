  import React, { useState } from 'react';
  import "./Sidebar.css";
  import { GiHamburgerMenu } from "react-icons/gi";
  import { AiFillDashboard } from "react-icons/ai";
  import { TbCategoryPlus } from "react-icons/tb";
  import { BiSolidCategory } from "react-icons/bi";
  import { FaProductHunt } from "react-icons/fa6";
  import { RiOutletLine } from "react-icons/ri";
  import { BiSolidOffer } from "react-icons/bi";
  import { FaCartPlus } from "react-icons/fa";
  import { FaUsers } from "react-icons/fa";
  import { FaSection } from "react-icons/fa6";
  import { BiSolidBookContent } from "react-icons/bi";
  import { HiCurrencyRupee } from "react-icons/hi";
  import { IoSettings } from "react-icons/io5";
  import { IoAddSharp } from "react-icons/io5";
  import { IoAddCircleOutline } from "react-icons/io5";
  import { MdViewCompactAlt } from "react-icons/md";

  import {useNavigate} from "react-router-dom";
  function Sidebar() {

      const nevigate=useNavigate();
      const [show, setshow]=useState(false);

      //==add Product drop down
      const [isProductsOpen, setIsProductsOpen] = useState(false); // New state for managing product dropdown
      const toggleProductsDropdown = () => {
      setIsProductsOpen(!isProductsOpen);
      };

      //==add user drop down
      const [userDropdown, setUserDropdown] = useState(false);
      const  toggleUserdropdown=()=>{
        setUserDropdown(!userDropdown);
      }; 

    return (
      <>
      <div>  
          <div className={show?'sidebar1':'sidebar'}>
              <ul>
                  <div className='main' onClick={()=>setshow(!show)}>
                  <GiHamburgerMenu  className='icons'/>
                  </div>
                  <li>
                  <AiFillDashboard className='icons'/>        
                  {show?"":<h2 className='para_name'>Dashboard</h2>}
                  </li>    

                  <li onClick={()=>nevigate("/home/Categories")}>
                  <TbCategoryPlus  className='icons' /> 
                  {show?"":<h2 className='para_name' >Categories</h2>}
                  </li>  
                  
                  <li onClick={()=>nevigate("/home/SubCategories")}>
                  <BiSolidCategory  className='icons' />        
                  {show?"":<h2 className='para_name' >Sub Categories</h2>}
                  </li>  

                  <li>
                  <div onClick={toggleProductsDropdown}>
                  <FaProductHunt className='icons' />
                  {show ? "" : <h2 className='para_name_products'>Products </h2>}
                  {isProductsOpen && !show && (
                  <ul className="dropdown">
                  <li onClick={() => nevigate("/home/addproduct")} className='color'> <IoAddCircleOutline  className='icons'/> Add Product</li>
                  <li onClick={() => nevigate("/home/ViewProducts")} className='color'><MdViewCompactAlt   className='icons'/> View Product</li>
                  </ul>
                  )}
                  </div>
                  </li>  

                  <li onClick={()=>nevigate("/home/outlets")}>
                  <RiOutletLine  className='icons'/>        
                  {show?"":<h2 className='para_name'>Outlets</h2>}
                  </li>  


                  <li onClick={()=>nevigate("/home/offercupons")}> 
                  <BiSolidOffer className='icons'/>        
                  {show?"":<h2 className='para_name'>Offer and Cupons</h2>}
                  </li>  

                  <li>
                  <FaCartPlus  className='icons'/>        
                  {show?"":<h2 className='para_name'>Orders</h2>}
                  </li>  


                  <li>
                  <div onClick={toggleUserdropdown}>
                  <FaProductHunt className='icons' />
                  {show ? "" : <h2 className='para_name_products'>User</h2>}
                  {userDropdown && !show && (
                  <ul className="dropdown">
                  <li onClick={() => nevigate("/home/addnewuser")} className='color'> <IoAddCircleOutline  className='icons'/> Add New User</li>
                  <li onClick={() => nevigate("/home/viewcustomer")} className='color'><MdViewCompactAlt   className='icons'/> View Customer</li>
                  <li onClick={() => nevigate("/home/viewdeliveryboy")} className='color'><MdViewCompactAlt   className='icons'/> View Delivery</li>
                  </ul>
                  )}
                  </div>
                  </li>    

                  <li onClick={()=>nevigate("/home/sections")}>
                  <FaSection  className='icons'/>        
                  {show?"":<h2 className='para_name'>Sections</h2>}
                  </li>  

                  <li>
                  <BiSolidBookContent  className='icons'/>        
                  {show?"":<h2 className='para_name'>Contents</h2>}
                  </li>  

                  <li>
                  <HiCurrencyRupee  className='icons'/>        
                  {show?"":<h2 className='para_name'>Expences</h2>}
                  </li>  

                  <li onClick={()=>nevigate("/home/settings")}>
                  <IoSettings  className='icons'/>        
                  {show?"":<h2 className='para_name'>Settings</h2>}
                  </li>  
              </ul>
          </div>
      </div>
      </>  

    )
  }

  export default Sidebar