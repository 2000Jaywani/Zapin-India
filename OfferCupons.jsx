// import React from 'react';
import "./OfferCupons.css";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaFilePdf } from "react-icons/fa6";



import { TiDelete } from "react-icons/ti";
import { MdEditSquare } from "react-icons/md";

import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";

function OfferCupons() {

  const [cuponCode,setCuponCode]=useState("");
  const [percentage,setPercentage ]=useState("");
  const [description,setDescription ]=useState("");
  const [createDate,setCreateDate ]=useState("");
  const [status,setStatus ]=useState("");
  const [OfferImage,setOfferImage]=useState(null);

  const [OfferCupons,setOfferCupons]=useState([]);
 
  const [useMessage,setUseMessage]=useState("");

  const handleOfferCupon=async (e) =>{
    e.preventDefault();

if(!cuponCode){
  alert("Enter cupon code .....");
  return;
}
  

if(!percentage){
  alert("Enter Percentage ....");
  return;
}


if(!description){
  alert("Enter description ....");
  return;
}


if(!createDate){
  alert("Enter Date & Time .....");
  return;
}

if(!status){
  alert("Select Status .....");
  return;
}

if(!OfferImage){
  alert("Select Image .....");
  return;
}


   const formdata = new FormData(); 
   formdata.append('cuponCode',cuponCode);
   formdata.append('percentage',percentage);
   formdata.append('description',description);
   formdata.append('createDate',createDate);
   formdata.append('status',status);
   formdata.append('OfferImage',OfferImage); 
   
   try{
      const response=await axios.post(
          "http://localhost:8080/api/offerCupon/addoffercupon",formdata
     );

   if(response.status===201)
    {
      setUseMessage(response.data);
      alert("Offer % Cupons Added Succesfully......");
      fetchOfferCupon();
      console.log(response.data);

       // ✅ Reset all form fields after successful submission
       setCuponCode("");
       setPercentage("");
       setDescription("");
       setCreateDate("");
       setStatus(""); 
       setOfferImage(null);
 
       // ✅ Reset file input (optional)
       document.getElementById("fileInput").value = "";
    }   
  
  } catch (error) {
      setUseMessage(error.response.data)
      console.log(error);
  }
};
//=========

const fetchOfferCupon=async ()=>{
  const response=await axios.get("http://localhost:8080/api/offerCupon/allOffercupon");
    if(response.status===200){
    console.log(response.data);
    setOfferCupons(response.data);
    
  }
};  

  useEffect(()=>{
    fetchOfferCupon();
  },[]);

//===========


const exportpdf_offer = () => {
  const doc = new jsPDF();
  doc.text("Offer List", 20, 10);

  const tableColumn = ["COUPON CODE" ,"PERCENTAGE" , "DESCRIPTION" , "DATE TIME" , "STATUS" ];
  const tableRows = OfferCupons.map((Offer) => [
    
    Offer.cuponCode,
    Offer.percentage+"%",
    Offer.description,
    Offer.createDate,
    Offer.status,
 
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
  });

  doc.save("Offer_Coupons.pdf");
};

//===
return (
    <>
        <div className="main_offer_cupon">
            <div className="main_form_offer">
                <h4>Add New Offer</h4>
                    <form onSubmit={handleOfferCupon}>
                    <input type="text" class="form-control" placeholder="Enter Cupons Code"  value={cuponCode}  onChange={(e) =>setCuponCode(e.target.value)} />
                    <br />
                    <input type="text" class="form-control" placeholder="Enter Percentage" value={percentage}  onChange={(e) =>setPercentage(e.target.value)} />
                    <br />
                    <input type="text" class="form-control" placeholder="Enter Description" value={description}  onChange={(e) =>setDescription(e.target.value)} />
                    <br />
                    <input type="datetime-local" class="form-control" value={createDate}  onChange={(e) =>setCreateDate(e.target.value)} />
                    <br />  
                    <select className="form-control"  value={status} onChange={(e) =>setStatus(e.target.value)} >
                    <option >-- Select an Option --</option>
                    <option value="Active">Active</option>
                    <option value="inActive">In-Active</option>
                    </select>
                     <br />   
                    <input type="file" class="form-control"  id="fileInput" onChange={(e) =>setOfferImage(e.target.files[0])} />
                    <br />    
                    <button  className="btn btn-success w-100">Submit</button>
                    </form>
            </div>


            <div className="main_table_offer">
               <h4>List of Offers</h4>
                <button id="btn_pdf_offer" onClick={exportpdf_offer}>PDF<FaFilePdf /></button>

                <hr />

                <table class="styled-table">
                   <thead>
                     <tr>
                        <th>Image</th>
                         <th>Coupon code</th>
                        <th>Percentage</th>
                        <th>Description</th>
                        <th>Date Time</th>
                        <th>Status</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                   <tbody>
                   {
                    OfferCupons.map((Offer)=>(
                      <tr key={Offer.offeruponId}>
                        <th><img src={`http://localhost:8080/image/${Offer.offerImage}`}  style={{  objectFit: "cover" , height:"100px" , width:"200vh"  }}  /> </th>
                        <th>{Offer.cuponCode}</th>
                        <th><mark>{Offer.percentage} %</mark></th>
                        <th>{Offer.description}</th>
                        <th>{Offer.createDate}</th>
                        <th>{Offer.status === 1 ? "Active" : "In-Active"}</th>
                        <th >
                         <td style={{border:"none"}}><MdEditSquare color="green" size={30} /></td>
                         <td style={{border:"none"}}><TiDelete color="red" size={30} /></td>
                        </th>
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

export default OfferCupons