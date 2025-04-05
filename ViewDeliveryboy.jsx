import React,{useState,useEffect} from 'react';
import "./ViewDeliveryboy.css";
import axios from "axios";

import { FaClipboardUser } from "react-icons/fa6";
import { MdAutoDelete } from "react-icons/md";
import { FcCustomerSupport } from "react-icons/fc";

import { FaFileExcel } from "react-icons/fa";
import { PiFilePdfFill } from "react-icons/pi";
import { FaFileCsv } from "react-icons/fa";
import { IoIosCopy } from "react-icons/io";

function ViewDeliveryboy() {
  
  
  const [fullName,setFullName]=useState("");
  const [mobileNumber,setMobileNumber]=useState("");
  const [email,setEmail]=useState("");

  const [deliveryboys,setDeliveryboys]=useState([]);  
  
  const fetchAllDeliveryBoys = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/enduser/allDeliveryBoy");
      if (response.status === 200) {
        console.log("@@@@@@@@@@@@@", response.data);
        setDeliveryboys(response.data);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
    useEffect(()=>{
      fetchAllDeliveryBoys();
    },[]);



  return (
    <>
        <div className="container_viewdeliveryboy">
        <h4><FcCustomerSupport size={52} /> List oF Delivery Boy</h4>  

        <button style={{backgroundColor:"#357BD9"}}>PDF<PiFilePdfFill /></button>{" "}
        <button style={{backgroundColor:"#01B05A"}}>CSV<FaFileCsv /></button>{" "}
        <button style={{backgroundColor:"#557F58"}}>EXCEL<FaFileExcel /> </button>{" "}
        <button style={{backgroundColor:"#489BC5"}}>COPY <IoIosCopy /></button>
        
        <hr />
        <table className="style_view_deliveryboy">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>View </th>
            <th>Delete</th>
          </tr>

        </thead>
        <tbody>

        {deliveryboys.map((deliboy)=>(

        <tr key={deliboy.enduserId}>
        <td>{deliboy.fullName}</td>
        <td>{deliboy.mobileNumber}</td>
        <td>{deliboy.email}</td>
        <td><center> <FaClipboardUser color="#F2791F" size={25} /> </center></td>
        <td><center> <MdAutoDelete color="red"  size={25} /> </center></td>
        </tr>
        ))
        }

        </tbody>
        </table>
        </div>
    
    </>
  )
}

export default ViewDeliveryboy