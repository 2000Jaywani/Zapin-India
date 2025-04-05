import React, { useState, useEffect } from 'react';
import "./Settings.css";
import axios from "axios";
import { BsDatabaseFillGear } from "react-icons/bs";

function Settings() {
    const [settingData, setSettingData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [useMessage, setUseMessage] = useState("");

    // Fetch existing setting data from backend on component mount
    useEffect(() => {
        fetchSettingData();
    }, []);

    // Update form fields when settingData is fetched
    // useEffect(() => {
    //     if (settingData) {
    //         setFirstName(settingData.firstName || "");
    //         setMobileNumber(settingData.mobileNumber || "");
    //         setEmail(settingData.email || "");
    //         setAddress(settingData.address || "");
    //     }
    // }, [settingData]); // Runs when settingData changes

    const fetchSettingData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/setting/allSettingData");
            if (response.status === 200) {
                console.log("Fetched Data:", response.data);
                setSettingData(response.data); // Update state with fetched data

                setFirstName(response.data.firstName || "");
                setMobileNumber(response.data.mobileNumber || "");
                setEmail(response.data.email || "");
                setAddress(response.data.address || "");

                setLoading(false);

            }
        } catch (error) {
            console.error("Error fetching settings:", error);
            setLoading(false);
        }
    };

    const handleSettingPage = async (e) => {
        e.preventDefault();

        console.log("firstName :", firstName);
        console.log("mobileNumber :", mobileNumber);
        console.log("email :", email);
        console.log("address :", address);

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("mobileNumber", mobileNumber);
        formData.append("email", email);
        formData.append("address", address);

        console.log("FormData content:", [...formData.entries()]);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/setting/saveUpdate",
                formData
            );

            if (response.status === 200) {
                setUseMessage(response.data);
                alert("Data Updated Successfully!");
                console.log(response.data);
            }
        } catch (error) {
            setUseMessage(error);
            console.log(error);
        }
    };

    return (
        <>
            <div className="main_setting_page">
                <div className="settings_form">
                    <h4>Settings Page</h4>
                    <hr />
                    <form onSubmit={handleSettingPage}>
                        <label>FIRM NAME</label>
                        <input type="text" className="form-control" placeholder="Enter real Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <br />
                        <label>FIRM MOBILE</label>
                        <input type="text" className="form-control" placeholder="Enter Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                        <br />
                        <label>FIRM EMAIL</label>
                        <input type="text" className="form-control" placeholder="Enter Valid Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <label>FIRM ADDRESS</label>
                        <input type="text" className="form-control" placeholder="Enter Residential Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <br />
                        <button className="btn btn-success w-100" id="btn_Setting"> <BsDatabaseFillGear /> Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Settings;
