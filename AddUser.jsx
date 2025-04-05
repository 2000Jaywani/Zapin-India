import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddUser.css";

function AddUser() {

    const [useMessage,setUseMessage]=useState("");

    const[role,setRole]=useState("");
    const[fullName,setFullName]=useState("");
    const[mobileNumber,setMobileNumber]=useState("");
    const[email,setEmail]=useState("");
    const[flatNumber,setFlatNumber]=useState("");
    const[buildingName,setBuildingName]=useState("");
    const[laneNumber,setLaneNumber]=useState("");
    const[landmark,setLandmark]=useState("");
    const[pinCode,setPinCode]=useState("");
    const[adharNumber,setAdharNumber]=useState("");
    const[adharImage,setAdharImage]=useState(null);
    const[passportPhoto,setPassPortPhoto]=useState(null);
    const[status,setStatus]=useState("");

    const validateInputs = () => {
      if (!role) return alert("⚠️ Please select a role!");
      if (!fullName.trim()) return alert("⚠️ Full Name is required!");
      if (!mobileNumber.match(/^\d{10}$/)) return alert("⚠️ Enter a valid 10-digit Mobile Number!");
      if (!email.match(/^\S+@\S+\.\S+$/)) return alert("⚠️ Enter a valid Email Address!");
      if (!flatNumber.trim()) return alert("⚠️ Flat/Bunglow No. is required!");
      if (!buildingName.trim()) return alert("⚠️ Building Name is required!");
      if (!laneNumber.trim()) return alert("⚠️ Street/Lane No. is required!");
      if (!landmark.trim()) return alert("⚠️ Landmark is required!");
      if (!pinCode.match(/^\d{6}$/)) return alert("⚠️ Enter a valid 6-digit Pincode!");
      if (!adharNumber.match(/^\d{12}$/)) return alert("⚠️ Enter a valid 12-digit Adhar Number!");
      if (!adharImage) return alert("⚠️ Please upload Adhar Card copy!");
      if (!passportPhoto) return alert("⚠️ Please upload a Passport Size Photo!");
      if (!status) return alert("⚠️ Please select a status!");
      return true;
  };
    const handleNewUser=async (e) =>{
        e.preventDefault();
    
        if (!validateInputs()) return; // Stop if validation fails

       const formdata = new FormData(); 
        formdata.append('role',role);
        formdata.append('fullName',fullName);
        formdata.append('mobileNumber',mobileNumber);
        formdata.append('email',email);
        formdata.append('flatNumber',flatNumber);
        formdata.append('buildingName',buildingName);
        formdata.append('laneNumber',laneNumber);
        formdata.append('landmark',landmark);
        formdata.append('pinCode',pinCode);
        formdata.append('adharNumber',adharNumber);
        formdata.append("adharImage",adharImage); 
        formdata.append("passportPhoto",passportPhoto); 
        formdata.append('status',status);

       try{
          const response=await axios.post(
              "http://localhost:8080/api/enduser/adduser",formdata
         );
       if(response.status===200)
        {
          setUseMessage(response.data);
          alert("✅ User Data Added Successfully .....");
          console.log(response.data);

          setAdharImage(null);
          setPassPortPhoto(null);
          setStatus("");

            document.getElementById("adharImageInput").value = "";
            document.getElementById("passportPhotoInput").value = "";
        }   
      } catch (error) { setUseMessage(error.response.data);  console.log(error); }
    };

  return (
    <>

    <div className="main_container">
        <div className="adduser_main">
           <b> <h3>Add New User Page</h3></b>
            <hr />
          <form onSubmit={handleNewUser}>
          <b>Select role</b>
          <select className="form-control" onChange={(e) =>setRole(e.target.value)} >
            <option>-- select an role --</option>
            <option value="Customer">Customer</option>
            <option value="Delivery-boy">Delivery boy</option>
          </select>
          <br />
          <b>Full Name</b>
          <input type="text" className="form-control" placeholder="Enter Full Name" onChange={(e) =>setFullName(e.target.value)} />
          <br />
          <b>Mobile Number</b>  <mark><small><b>*</b> Note : mobile number must be unique. </small></mark>
          <input type="text" className="form-control" placeholder="Enter Mobile Number" onChange={(e) =>setMobileNumber(e.target.value)} />
          <br />
          <b>Email</b>
          <input type="text" className="form-control" placeholder="Enter email" onChange={(e) =>setEmail(e.target.value)} />
          <br />
          <b>Flat.No/Bunglow.No</b>
          <input type="text" className="form-control" placeholder="Enter Flat.No/Bunglow.No" onChange={(e) =>setFlatNumber(e.target.value)} />
          <br />
          <b>Building Name</b>
          <input type="text"  className="form-control" placeholder="Enter Building Name"  onChange={(e) =>setBuildingName(e.target.value)}/>
          <br />
          <b>Street Name/Lane.No</b>
          <input type="text" className="form-control" placeholder="Enter Street Name/Lane.No" onChange={(e) =>setLaneNumber(e.target.value)} />
          <br />
          <b>Landmark</b>
          <input type="text" className="form-control" placeholder="Enter Landmark" onChange={(e) =>setLandmark(e.target.value)} />
          <br />
          <b>Pincode</b>
          <input type="text" className="form-control" placeholder="Enter Pincode" onChange={(e) =>setPinCode(e.target.value)} />
          <br />
          <b>Adhar Number</b><mark><small><b>*</b> Note : adhar number must be unique. </small></mark>
          <input type="text" className="form-control" placeholder="Enter Adhar Number" onChange={(e) =>setAdharNumber(e.target.value)} />
          <br />
          <b>Adhar Card copy</b>
          <input type="file" id="adharImageInput" className="form-control" placeholder="select Adhar Card copy" onChange={(e) =>setAdharImage(e.target.files[0])} />
          <br />
          <b>Passport Size Photo</b>
          <input type="file" id="passportPhotoInput" className="form-control" placeholder="select Passport Size Photo" onChange={(e) =>setPassPortPhoto(e.target.files[0])} />
          <br />
          <b>Active Status</b>
          <select className="form-control" id="status" onChange={(e) =>setStatus(e.target.value)}>
            <option>-- select an status --</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <br />  
          <button className="btn btn-success w-100" type="submit">Submit</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default AddUser