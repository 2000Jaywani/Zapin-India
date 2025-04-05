import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Categories.css";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "axios";


import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";

function Categories() {

  const [categoryName,setcategoryName]=useState("");
  const [categoryImage,setcategoryImage]=useState(null);
  const [useMessage,setUseMessage]=useState("");
  const [categories,setCategories]=useState([]);

   const [copied, setCopied] = useState(false);
  // const textToCopy = "Hello, this is the copied text!";

  const fetchCategories=async ()=>{
    const response=await axios.get("http://localhost:8080/api/category/allcategory");
      if(response.status===200){
      console.log(response.data);
      setCategories(response.data);
    }
  };  

    useEffect(()=>{
      fetchCategories();
    },[])
 //------------------------------------------------------------------------------------------------------------ 
  const handleCategory=async (e) =>{
    e.preventDefault();
  

    if(!categoryName){
      alert("⚠️ Enter Category Name");
      return;
    }

    if (!categoryImage) {
      alert("⚠️ Enter Category Image Files");
      return;
    }


   const formdata = new FormData(); 
   formdata.append('categoryName',categoryName);
   formdata.append('categoryImage',categoryImage);
    
    try{
      const response=await axios.post(
          "http://localhost:8080/api/category/addcategory",formdata
     );

   if(response.status===201)
    {
      setUseMessage(response.data);
      alert("Category Data Added Successfully .....");
      fetchCategories();
      console.log(response.data);

      setcategoryName(""); 
      setcategoryImage(null);

      document.getElementById("categoryImage").value = ""; 


      if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
      }
    }   
  
  } catch (error) {
      setUseMessage(error.response.data)
      console.log(error);
  }

};

const exportCSV = () => {
  const csvData = categories.map((category) => ({
    "Category Image": category.categoryImage,
    "Category Name": category.categoryName,
  }));

  const csv = Papa.unparse(csvData);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "categories.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


const exportPDF = () => {
  const doc = new jsPDF();
  doc.text("Category List", 20, 10);

  const tableColumn = ["Category Image", "Category Name"];
  const tableRows = categories.map((category) => [
    category.categoryImage,
    category.categoryName,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
  });

  doc.save("categories.pdf");
};


//===
const handleCopy = async () => {
  try {

    const table = document.querySelector(".styled-table");

    const headers = Array.from(table.querySelectorAll("thead th"))
      .map(th => th.innerText)
      .join("\t"); 

    
    const rows = Array.from(table.querySelectorAll("tbody tr")).map(tr =>
      Array.from(tr.querySelectorAll("td"))
        .map(td => td.innerText) 
        .join("\t")
    );
    const tableText = [headers, ...rows].join("\n");

    // Copy to clipboard
    await navigator.clipboard.writeText(tableText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

//======
  return (
    <>
        <div className='container_categories'>
            <div className='add_form_Cate'>
                <h4>Add Product Category</h4>
                <hr />
                    <form onSubmit={handleCategory}>
                     <input type="text" class="form-control" placeholder="Enter product categories name" value={categoryName} onChange={(e) =>setcategoryName(e.target.value)}   />
                     <br />   
                   
                    <input type="file" class="form-control" placeholder="categories image" id="categoryImage" onChange={(e) =>setcategoryImage(e.target.files[0])}  />
                    <br />    
                    <button  className="btn btn-success w-100">Submit</button>
                    </form>
            </div>


           <div className='list_product_cate'>
              <h4 className='list_cate'>List Of Product Categories</h4>   
              <hr />
              <div className="btn_nav">
              <button className="copy-btn"  onClick={handleCopy} > {copied ? "Copied!" : "COPY"}</button>{"  "}
              <button className="export-btn" onClick={exportCSV}>CSV</button>{"  "}
              <button className="pdf-btn" onClick={exportPDF}> PDF</button>
              </div>
              <table class="styled-table">
                   <thead>
                     <tr>
                        <th>Image</th>
                         <th>Product Categories Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                     </tr>
                  </thead>
                  
                   <tbody>
                    {
                      categories.map((category)=>(
                        <tr key={category.categoryId}>
                        <td><img src={`http://localhost:8080/image/${category.categoryImage}`} height="100px" width="100px" style={{borderRadius:'20px' }}/></td>  
                        <td><b>{category.categoryName}</b></td>
                        <td><button class="update_btn"><FaPencilAlt />  Edit</button></td>
                        <td><button class="delete_tbn"><RiDeleteBin6Fill /> Delete</button></td>
                   </tr>
                    ))
                  }
                </tbody>
            </table>
          </div>
        </div>
   </>
  )

};

export default Categories;
