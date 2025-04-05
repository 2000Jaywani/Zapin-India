import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Product.css";
import { toast } from "react-toastify";

function Product() {
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const [subCategory, setSubCategory] = useState(null);
  const [subcategories, setSubCategories] = useState([]);
  
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const [outlets ,setoutlets]=useState([]);
  const [outlet, setOutlet] = useState(null)

  const [OfferCupons,setOfferCupons]=useState([]);
  const [offer,setOffer]=useState(null);

  const [useMessage,setUseMessage]=useState("");

  const [productType,setProductType]=useState("");
  const [productName,setProductName]=useState("");
  const [productCode,setProductCode]=useState("");
  const [strikePrice,setStrikePrice]=useState("");
  const [displayPrice,setDisplayPrice]=useState("");
  const [productSequence,setProductSequence]=useState("");
  const [productDescription,setProductDescription]=useState("");
  const [recommended,setRecommended]=useState("");
  const [link,setLink]=useState("");


  // Fetch Categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/category/allcategory");
        if (response.status === 200) {
          setCategories(response.data); 
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch Subcategories from API
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/subcategory/allSubcategory");
        if (response.status === 200) {
          setSubCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
  }, []);

  // Filter Subcategories based on Selected Category
  useEffect(() => {
    if (category) {
      const filtered = subcategories.filter(sub => sub.category.categoryId === category);
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
  }, [category, subcategories]);
  //======


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


//=====

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

  //=====
 
  

  //add products---------------------------------------------------------------- 
  const handleProduct=async (e) =>{
    e.preventDefault();

    if(!category){
      alert(" ⚠️ Select Category .....");
      return;
    }

    if(!subCategory){
      alert(" ⚠️ Select SubCategory .....");
      return;
    }
    
    if(!productType){
      alert(" ⚠️ Select Product Type .....");
      return;
    }

    if(!productName){
      alert(" ⚠️ Select Product Name .....");
      return;
    }

    if(!productCode){
      alert(" ⚠️ Select Product Code .....");
      return;
    }
    
    if(!strikePrice){
      alert(" ⚠️ Select Strike Price .....");
      return;
    }
    
    if(!displayPrice){
      alert(" ⚠️ Select Display Code .....");
      return;
    }

    if(!outlet){
      alert(" ⚠️ Select Outlet .....");
      return;
    }

    if(!offer){
      alert(" ⚠️ Select Offer's .....");
      return;
    }


   const formdata = new FormData(); 
   formdata.append('category',category);
   formdata.append('subCategory',subCategory);
   formdata.append('productType',productType);
   formdata.append('productName',productName);

   formdata.append('productCode',productCode);

   formdata.append('strikePrice',strikePrice);
   formdata.append('displayPrice',displayPrice);
   formdata.append('outlet',outlet);
   formdata.append('productSequence',productSequence);
   formdata.append('productDescription',productDescription);
  formdata.append('availableOffer', offer);
  formdata.append('recommended',recommended);
   formdata.append('link',link);


   console.log("Category:", category);
  console.log("subCategory:", subCategory);
  console.log("Product Type:", productType);
  console.log("Product Name:", productName);
  console.log("productCode :",productCode);
    
  console.log("Strike Price:", strikePrice);
  console.log("Display Price:", displayPrice);
  console.log("Outlets:", outlet);
  console.log("Product Sequence:", productSequence);
  console.log("Product Description:", productDescription);
  console.log("OfferCupons:",offer); // Logging Offer value
  console.log("recommended:", recommended);
  console.log("Link:", link);
    try{
      const response=await axios.post(
          "http://localhost:8080/api/products/addproduct",formdata
     );

   if(response.status===201)
    {
      setUseMessage(response.data);
        //toast.success("Product Added Successfully!", { position: "top-right"});
      alert("Product Added Successfully .....");
      // toast.success("Product Added Successfully!", {
      //   position: "top-right",
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
      console.log("Product Added Successfully!",response.data);

       // ✅ Reset form fields after success
       setCategory(null);
       setSubCategory(null);
       setProductType("");
       setProductName("");
       setProductCode("");
       setStrikePrice("");
       setDisplayPrice("");
       setOutlet(null);
       setProductSequence("");
       setProductDescription("");
       setOffer(null);
       setRecommended("");
       setLink("");
    }   
  
  } catch (error) {
      setUseMessage(error.response.data)
      console.log(error);
  }

};
//===

  return (
    
    <>
    <div className="main_product_page">
      <div className="product_form">
        <h4>Add Product Page</h4>
        <hr />
        <form onSubmit={handleProduct}>
          <b>Category</b>
          <select className="form-control" onChange={(e) => setCategory(e.target.value ? parseInt(e.target.value) : null)}>
            <option value="">-- Select an Option --</option>
            {categories.map(cat => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>
          <br />

          <b>Sub Category</b>
           <select className="form-control" onChange={(e) => setSubCategory(e.target.value ? parseInt(e.target.value) : null)}>
            <option>-- Select an Option --</option>
            {filteredSubCategories.map(subCat => (
              <option key={subCat.subcategoryId} value={subCat.subcategoryId}>
                {subCat.subcategoryName}
              </option>
            ))}
          </select>
          <br />

          <b>Product Type</b>
          <select className="form-control" onChange={(e) =>setProductType(e.target.value)}>
            <option>-- Select an Option --</option>
            <option value="VEG">VEG</option>
            <option value="NON-VEG">NON-VEG</option>
          </select>
          <br />

          <b>Product Name</b>
          <input type="text" className="form-control" placeholder="Enter Product name" onChange={(e) =>setProductName(e.target.value)} />
          <br />

          <b>Product Code</b>
          <input type="text" className="form-control" placeholder="Enter Product Code" onChange={(e) =>setProductCode(e.target.value)} />
          <br />

          <b>Striked Price (Rs.)</b>
          <input type="text" className="form-control" placeholder="Enter Striked Price" onChange={(e) =>setStrikePrice(e.target.value)} />
          <br />

          <b>Display Price (Rs.)</b>
          <input type="text" className="form-control" placeholder="Enter Display Price" onChange={(e) =>setDisplayPrice(e.target.value)} />
          <br />

          <b>Available in Outlet</b>
          <select className="form-control" onChange={(e) =>setOutlet(e.target.value)}>
            <option>-- Select an Option --</option>
            {outlets.map(out => (
              <option key={out.outletId} value={out.outletId}>
                {out.location}
              </option>
            ))}
          </select>

          <br />
          <b>Product Sequence</b>
          <input type="text" className="form-control" placeholder="Enter Product Sequence" onChange={(e) =>setProductSequence(e.target.value)} />
          <br />

          <b>Product Description</b>
          <input type="text" className="form-control" placeholder="Enter Product Description" onChange={(e) =>setProductDescription(e.target.value)} />
          <br />

          <b>Offer Available</b>
          <select className="form-control" onChange={(e) =>setOffer(e.target.value)}>
          <option value="">-- No Offer --</option>
          {OfferCupons.map((offer) => (
          <option key={offer.offeruponId} value={offer.offeruponId}>
          {offer.cuponCode} | {offer.percentage}% | {offer.description} | {offer.status === 1 ? "Active" : "In-Active"}
          </option>
          ))}
          </select>

          <b>Recommended?</b>
          <select className="form-control" onChange={(e) =>setRecommended(e.target.value)} >
            <option>-- Select an Option --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <br />

          <b>Add Link</b>
          <input type="text" className="form-control" placeholder="Enter Add Link" onChange={(e) =>setLink(e.target.value)} />
          <br />
         
          <button className="btn btn-success w-100" type="submit">Submit</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Product;
