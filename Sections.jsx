import React, { useState, useEffect } from "react";
import "./Sections.css";
import axios from "axios";

function Sections() {
  const [divName, setDivName] = useState("");
  const [useMessage, setUseMessage] = useState("");
  const [Sections, setSections] = useState([]); // Ensuring initial state is an array

  const fetchSections = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/div/alldiv");
      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setSections(response.data);
      } else {
        console.error("Unexpected API response format:", response.data);
        setSections([]); 
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
      setSections([]); 
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  //==
  const handleDiv = async (e) => {
    e.preventDefault();

    if (!divName.trim()) {
      alert("⚠️ Section Name is required!");
      return;
    }

    console.log("Sections Name:", divName);

    const formData = new FormData();
    formData.append("divName", divName);

    console.log("FormData content:", [...formData.entries()]);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/div/adddiv",
        formData
      );

      if (response.status === 200) {
        alert("Section Added Successfully!");
        setUseMessage(response.data);
        fetchSections();
        setDivName("");
        console.log("Updated Sections:", response.data);
      }


    } catch (error) {
      setUseMessage(error.message || "Error occurred");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="main_section">
        <div className="section_form">
          <h4>Add Sections</h4>
          <hr />
          <form onSubmit={handleDiv}>
            <input   type="text" className="form-control"  value={divName} placeholder="Enter Section Name" onChange={(e) => setDivName(e.target.value)} />
            <hr />
            <button className="btn btn-success w-100">Submit</button>
          </form>
        </div>

        <div className="section_table">
          <h4>List of Sections</h4>
          <hr />
          <table className="st_table">
            <thead>
              <tr>
                <th>Section ID</th>
                <th>Section Name</th>
              </tr>
            </thead>
            <tbody>
              {Sections.length > 0 ? (
                Sections.map((div) => (
                  <tr key={div.divId}>
                    <td><b>{div.divId}</b></td>
                    <td><b>{div.divName}</b></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No Sections Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Sections;
