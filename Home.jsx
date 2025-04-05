import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Categories from './Categories'; 
import SubCategories from './SubCategories'; 
import Sidebar from "./Sidebar";
import Outlet from "./Outlet";
import OfferCupons from "./OfferCupons";
import Sections from "./Sections";
import Settings from "./Settings";
import Product from "./Product";
import ViewProduct from "./ViewProduct";
import AddUser from "./AddUser";
import Cursor from "./Cursor";
import ViewCustomer from "./ViewCustomer";
import ViewDeliveryboy from "./ViewDeliveryboy";
import "./Home.css";
function Home() {
  return (
        <>
        
        <Navbar />
        <Cursor />
        <div style={{display:"flex"}}>
            <div>
            <Sidebar/>
            </div>
            <div>
            <Routes>
            <Route path="/Categories" element={<Categories />} />
            <Route path="/SubCategories" element={<SubCategories />} />
            <Route path="/outlets" element={<Outlet />}/>
            <Route path="/offercupons" element={<OfferCupons />} />
            <Route path="/sections" element={<Sections />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/addproduct" element={<Product />} />
            <Route path="/ViewProducts" element={<ViewProduct />} />
            <Route path="/addnewuser" element={<AddUser />} />

            <Route path="/viewcustomer" element={<ViewCustomer />} />

            <Route path="/viewdeliveryboy" element={<ViewDeliveryboy />} />            
            </Routes>
            </div>
        </div>
        </>
  )
}

export default Home