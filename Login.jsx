import React,{useState} from 'react';
import "./Login.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [useMessage,setUseMessage]=useState("");
    const nevigate=useNavigate();
    

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if(!userName)
        {
         alert("⚠️ Enter Valid UserName....");
         return;
        }
        if(!password){
          alert("⚠️ Enter Valid Password....")
        }
        try {
        const response=await axios.post(
        "http://localhost:8080/api/useradmin/login",
        {
        userName,
        password
        }
        );
    
          if (response.status === 200) {
            setUseMessage(response.data);
            console.log(response.data);
            //toast.success('Login Successful!', { position: 'top-right' });
            //nevigate("/home");



            toast.success('Login Successful!', {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setTimeout(() => {
                nevigate("/home");
            }, 1000);
          }
        } catch (error) {
          if (error.response) {
            setUseMessage(error.response.data);
            toast.error(error.response.data, { position: "top-right", theme: "colored" });
          } else {
            setUseMessage("An unexpected error occurred");
            toast.error("An unexpected error occurred", { position: "top-right" ,  theme: "colored" });
            console.error("Error:", error.message);
          }
        }
      };

    const gotoNavbar=()=>{
        //nevigate("/home");
    }

    return (
    <>
    <div className="cls-container" >
        <h1>Zaapin</h1> 
    </div>
      <div className="div1-container"> 
           <form onSubmit={handleLogin}>
             <h2> <i class="bi bi-person-fill"></i>  SIGN IN</h2> 
             <hr />
             <i class="bi bi-person-vcard-fill"></i> Username
             <input type="text" class="form-control" placeholder=" Username" onChange={(e) =>setUserName(e.target.value)} />
             <i class="bi bi-key-fill"></i> Password 
             <input type="password" class="form-control" placeholder=" Password" onChange={(e) =>setPassword(e.target.value)} /> 
             <br />
             <button type="submit" id="btn_log"  className="btn btn-success w-100" onClick={gotoNavbar}> 
             <i className="bi bi-box-arrow-in-right"></i> Sign in</button>
             <ToastContainer />                
            </form>
        </div>
     </>
  );
}

export default Login;