import React, { useState, useEffect } from "react";
import "./Outlet.css";
import axios from "axios";

function Outlet() {


  const [location,setLocation] =useState("");
  const [pinCode ,setPinCode]=useState("");
  const [useMessage,setUseMessage]=useState("");
  const [outlets ,setoutlets]=useState([]);
 
  
  const handleOutlet = async (e) => {
    e.preventDefault();

    if(!location){
      alert("Enter Outlet location.");
      return;
    }
    
    if(!pinCode){
      alert("Enter Outlet Pincode.");
      return;
    }
    
   

    const formData = new FormData();
    formData.append("location", location);
    formData.append("pinCode", pinCode);
  
    try {
      const response = await axios.post(
        "http://localhost:8080/api/outlet/addOutlet",
        formData
      );
  
      if (response.status === 200) {
        setUseMessage(response.data);
        alert("Outlet Added Successfully!");
        setLocation("");  // Reset location input
        setPinCode("");
        fetchOutlets(); 
      }
    } catch (error) {
      setUseMessage(error.response?.data || "Error occurred");
      console.log(error);
    }
  };

//============================================================

const fetchOutlets = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/outlet/allOutlet");
    if (response.status === 200) {
      setoutlets(response.data); 
      console.log(response.data);
    }
  } catch (error) {
    console.error("Error fetching outlets:", error);
  }
};

useEffect(() => {
  fetchOutlets();
}, []);

  return (
   <>
   <div className="container_outlet">
        <div className="outlet_form">
          <h4>Assign Pincode to Outlet</h4>
                <hr />
                    <form onClick={handleOutlet}>
                    <input type="text" class="form-control" placeholder="Assign Outlet location." value={location} onChange={(e) =>setLocation(e.target.value)}  />
                    <br />   
                    <input type="text" class="form-control" placeholder="Assign delivery pincode." value={pinCode} onChange={(e) =>setPinCode(e.target.value)}  />
                    <br />    
                    <button  className="btn btn-success w-100">Submit</button>
                    </form>
        </div>
         <div className="outlet_full_table">
            <h4>List of Pincodes</h4>
                <hr />
                <table class="fetchtables">
                   <thead>
                     <tr >
                        <th>Outlet Location </th>
                         <th>Assigned Pincode</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  
                   <tbody>
                  {
                   outlets.map((outlet)=>(
                    <tr key={outlet.OutletId}>
                     <td><b>{outlet.location}</b></td>
                     <td><b>{outlet.pinCode}</b></td>
                     <td><button> Delete</button></td>
                    </tr>
                   ))
                  }
              </tbody>
            </table>
        </div>
   </div>

   </>
  )
}

export default Outlet