import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewProduct.css";
import { FaFolder } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { FaFilePdf, FaFileCsv, FaFileExcel, FaCopy } from "react-icons/fa6";
import { IoImages } from "react-icons/io5";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ViewProduct() {
  const [productView, setProductView] = useState([]);
  const [copied, setCopied] = useState(false);
  const [subcategories,setSubCategories]=useState([]);  
  
  const [subcategoryImage,setsubcategoryImage]=useState(null);
  
  const [subCategory,setSubCategory]=useState(null);

  useEffect(() => {
    const fetchProductView = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products/allProductsView");
        if (response.status === 200) {
          setProductView(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProductView();
  }, []);


  //=========


  const fetchSubCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/subcategory/allSubcategory");
      if (response.status === 200) {
        console.log("@@@@@@@@@@@@@", response.data);
        setSubCategories(response.data);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
    useEffect(()=>{
      fetchSubCategories();
    },[]);



  // Export to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Product View List", 20, 10);

    const tableColumn = ["PRODUCT ID", "CATEGORY", "PRODUCT NAME", "OFFER", "PRICE", "RECOMMENDED"];
    const tableRows = productView.map((view) => [
      view.productId,
      view.category.categoryName,
      view.productName,
      `${view.availableOffer.percentage}%`,
      `${view.displayPrice}/-`,
      view.recommended,
    ]);

    autoTable(doc, { head: [tableColumn], body: tableRows });
    doc.save("ProductList.pdf");
  };

  // Export to CSV
  const exportCSV = () => {
    const csvData = productView.map((view) => ({
      "PRODUCT ID": view.productId,
      "CATEGORY NAME": view.category.categoryName,
      "PRODUCT NAME": view.productName,
      "AVAILABLE OFFER PERCENTAGE": `${view.availableOffer.percentage}%`,
      "DISPLAY PRICE": `${view.displayPrice}/-`,
      "RECOMMENDED": view.recommended,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "ProductList.csv");
  };

  // Copy Table Data to Clipboard
  const handleCopy = async () => {
    try {
      const table = document.querySelector(".style_view_product");
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

  // Export to Excel
  const exportToExcel = () => {
    if (!productView || productView.length === 0) {
      alert("No data to export!");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(productView);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });

    saveAs(file, "ProductList.xlsx");
  };

  return (
    <div className="table_view_products">
      <h4>List of Products</h4>
      <button onClick={exportPDF} style={{ backgroundColor: "#1E90FF" }}>PDF <FaFilePdf /> </button>{" "}
      <button onClick={exportCSV} style={{ backgroundColor: "#01B05A" }}>CSV <FaFileCsv /> </button>{" "}
      <button onClick={handleCopy} style={{ backgroundColor: "#34B6E8" }}>{copied ? "Copied!" : "COPY"} <FaCopy /> </button>{" "}
      <button onClick={exportToExcel} style={{ backgroundColor: "#439567" }}>EXCEL <FaFileExcel />  </button>
      <hr />
      <table className="style_view_product">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Category</th>
            <th>Product Name</th>
            <th>Offer</th>
            <th>Price</th>
            <th>Recommended</th>
            <th>View</th>
            <th>Edit</th>
            <th>Add Photos</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {productView.map((view) => (
            <tr key={view.productId}>
              <td>{view.productId}</td>
              <td> 
                   <img src={`http://localhost:8080/image/${view.category.categoryImage}`}  height="100px"   width="100px"   style={{ objectFit: "cover" }}  alt="Category" />  
               </td>

{/* <td>
{subcategories.map((sub)=>(
  <tr  key={sub.subcategoryId}>
<img  src={`http://localhost:8080/image/${sub.subcategoryImage}`}  height="100px"  width="100px"  style={{ borderRadius: "20px" }} alt="subcategory"  />
</tr>
))
}
</td> */}


{/* <td>
{subcategories.map((sub) => (
 <tr  key={sub.subcategoryId}>
 <td>
<img  src={`http://localhost:8080/image/${sub.subcategoryImage}`}  height="100px"  width="100px"  style={{ borderRadius: "20px" }} alt="subcategory"  />
</td>

</tr>
  ))}
</td> */}

     
              <td>{view.category?.categoryName || "N/A"}</td>
              <td>
                <b>{view.productName}</b>
              </td>
              <td>
                <mark>
                  <b>{view.availableOffer.percentage} %</b> Off
                </mark>
              </td>
              <td>
                <b>{view.displayPrice}/-</b>
              </td>
              <td>
                <center>{view.recommended}</center>
              </td>
              <td>
                <center>
                  <FaFolder color="#F2791F" size={30} />
                </center>
              </td>
              <td>
                <center>
                  <MdEditSquare color="green" size={30} />
                </center>
              </td>
              <td>
                <center>
                  <IoImages color="blue" size={30} />
                </center>
              </td>
              <td>
                <center>
                  <TiDelete color="Red" size={30} />
                </center>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProduct;
