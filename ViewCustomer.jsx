import React,{useState,useEffect} from 'react';
import "./ViewCustomer.css";

import axios from "axios";
import { FaClipboardUser } from "react-icons/fa6";
import { MdAutoDelete } from "react-icons/md";
import { FcCustomerSupport } from "react-icons/fc";

import { FaFileExcel } from "react-icons/fa";
import { PiFilePdfFill } from "react-icons/pi";
import { FaFileCsv } from "react-icons/fa";
import { IoIosCopy } from "react-icons/io";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
function ViewCustomer() {


  const [fullName,setFullName]=useState("");
  const [mobileNumber,setMobileNumber]=useState("");
  const [email,setEmail]=useState("");

  const [customers,setCustomers]=useState([]);  

  const [copied, setCopied] = useState(false);
  

  const fetchAllCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/enduser/allCustomers");
      if (response.status === 200) {
        console.log("@@@@@@@@@@@@@", response.data);
        setCustomers(response.data);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
    useEffect(()=>{
      fetchAllCustomers();
    },[]);
//========

const exportpdf_customer = () => {
  const doc = new jsPDF();
  doc.text("CUSTOMER LIST", 20, 10);

  const tableColumn = ["FULL NAME" ,"MOBILE NUMBER" , "EMAIL ADDRESS"];
  const tableRows = customers.map((cust) => [
     cust.fullName,
    "+91"+cust.mobileNumber,
    cust.email,
    
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
  });

  doc.save("ALLCUSTOMERS.pdf");
};

//========

 // Export to CSV
 const exportCSV = () => {
  const csvData = customers.map((cust) => ({
    "CUSTOMER FULL NAME": cust.fullName,
    "MOBILE NUMBER": "+91 " + cust.mobileNumber, // Apostrophe prevents Excel auto-format
    "EMAIL ADDRESS": cust.email,
  }));

  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "CUSTOMERLIST.csv");
};
//======
 // Export to Excel
 const exportToExcel = () => {
  if (!customers || customers.length === 0) {
    alert("No data to export!");
    return;
  }

  const ws = XLSX.utils.json_to_sheet(customers);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const file = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });

  saveAs(file, "CUSTOMERLIST.xlsx");
};

//=====

 // Copy Table Data to Clipboard
 const handleCopy = async () => {
  try {
    const table = document.querySelector(".style_view_customer");
    if (!table) {
      console.error("Table not found!");
      return;
    }

    const headers = Array.from(table.querySelectorAll("thead th")).map((th) => th.innerText).join("\t");
    const rows = Array.from(table.querySelectorAll("tbody tr")).map((tr) =>
      Array.from(tr.querySelectorAll("td")).map((td) => td.innerText).join("\t")
    );

    const tableText = [headers, ...rows].join("\n");
    await navigator.clipboard.writeText(tableText);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

  return (
    <>
        <div className="container_viewcustomer">
        <h4><FcCustomerSupport size={52} /> List oF Customers</h4>  
        <button style={{backgroundColor:"#357BD9"}} onClick={exportpdf_customer}>PDF<PiFilePdfFill /></button>{" "}
        <button style={{backgroundColor:"#01B05A"}} onClick={exportCSV}>CSV<FaFileCsv /></button>{" "}
        <button style={{backgroundColor:"#557F58"}} onClick={exportToExcel}>EXCEL<FaFileExcel /> </button>{" "}
        {/* <button style={{backgroundColor:"#489BC5"}}>COPY <IoIosCopy /></button> */}
        <button onClick={handleCopy} style={{ backgroundColor: "#34B6E8" }}>{copied ? "Copied!" : "COPY"} <IoIosCopy /> </button>
        <hr />
        <table className="style_view_customer">
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
        {customers.map((cust)=>(

           <tr key={cust.enduserId}>
            <td>{cust.fullName}</td>
            <td>{cust.mobileNumber}</td>
            <td>{cust.email}</td>
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

export default ViewCustomer