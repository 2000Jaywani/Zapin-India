import React,{useState,useEffect} from 'react';
import "./SubCategories.css";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

function SubCategories() {

  const [category,setCategory]=useState(null);
  const [subCategory,setSubCategory]=useState(null);

  const [subcategoryName,setSubcategoryName]=useState("");
  const [subcategoryImage,setsubcategoryImage]=useState(null);
  const [subcategories,setSubCategories]=useState([]);
  const [categories,setCategories]=useState([]);
  const [useMessage,setUseMessage]=useState("");

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
    //==========

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/category/allcategory");
        if (response.status === 200) {
          console.log("@@@@@@@@@@@@@", response.data);
          setCategories(response.data);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
      useEffect(()=>{
        fetchCategories();
      },[]);



  
    //--------------------------------------------------------------------------------------------------------------------------------
  const handleSubCategory = async (e) => {
    e.preventDefault();
  // console.log("@@@@@@@@@@");
  if (!category) {
    alert(" ⚠️ Please Select Optional Categories...");
    return; 
}

if (!subcategoryName) {
  alert("⚠️ Enter Sub-Categories Name...");
  return; 
}


if (!subcategoryImage) {
  alert("⚠️ Please Enter file Image...");
  return; 
}



  console.log("Category:", category, "Type:", typeof category);
  console.log("Sub Category Name:", subcategoryName);
  console.log("Sub Category Image:", subcategoryImage);


  const formData = new FormData();  
  formData.append("category", category);  
  formData.append("subcategoryName", subcategoryName);
  formData.append("subcategoryImage", subcategoryImage);
  
  console.log("FormData content:", [...formData.entries()]);
    try{
      const response=await axios.post(
          "http://localhost:8080/api/subcategory/addsubcategory",
          formData
      );

   if(response.status===201)
    {
      setUseMessage(response.data);   
      alert("Sub Categories Added Succesfully......");

      setCategory(null);
      setSubcategoryName("");
      setsubcategoryImage(null);

      document.getElementById("subcategoryImage").value = ""; 

      fetchCategories(); 
      fetchSubCategories();
      
      console.log(response.data);
    }   
  
  } catch (error) {
      setUseMessage(error);
      console.log(error);
  }
  };

  return (
     <>
     <div className='main_container_subcategory'>
            <div className='sub_category_select'>
                <h4>Add Sub Categories</h4>
                <hr />
                  <form onSubmit={handleSubCategory}>
                  <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value ? parseInt(e.target.value) : null)}>
                  <option value="">-- Select an Option --</option>
                  {categories.map((category, index) => (
                  <option key={category.categoryId ?? index} value={category.categoryId}>
                  {category.categoryName}
                  </option>
                  ))}
                  </select>
                    <br />    
                     <input type="text" class="form-control" placeholder="Enter product Sub categories name" value={subcategoryName} onChange={(e) =>setSubcategoryName(e.target.value)}  />
                     <br />   
                     Sub-Categories Image
                    <input type="file" class="form-control" placeholder="Sub categories image"  id="subcategoryImage"  onChange={(e) =>setsubcategoryImage(e.target.files[0])}  />
                    <br />    
                    <button  className="btn btn-success w-100">Submit</button>
                    </form>
            </div>
    
    
     {/* table formtable  */}
           <div className='list_subcat'>
              <h4 className=''>List Of Sub Categories</h4>
              <hr />
                <table class="styled-table">
                   <thead>
                     <tr>
                        <th>Image</th>
                        <th> Categories Name</th>
                         <th>Sub Categories Name</th>
                         <th>Action</th>
                     </tr>
                  </thead>
                  

                  <tbody>
                    {subcategories.map((sub) => (
                     <tr key={sub.subcategoryId ?? sub.subcategoryName}>
                     <td>
                    <img  src={`http://localhost:8080/image/${sub.subcategoryImage}`}  height="100px"  width="100px"  style={{ borderRadius: "20px" }} alt="subcategory"  />
                    </td>
                    <td><b>{sub.category?.categoryName || "N/A"}</b></td>
                    <td><b>{sub.subcategoryName}</b></td>
                    <td>
                     <button className="update_btn"><FaPencilAlt /> Edit</button>{" "}
                      <button className="delete_tbn"><RiDeleteBin6Fill /> Delete</button>
                    </td>
                    </tr>
                      ))}
                    </tbody>
                    

            </table>
          </div>

        </div>
     </>   
  )
}
export default SubCategories;





















