import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login"; 
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Component/Home";

import "./App.css";

function App() {
  return (
    <>
      <Router> 
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/home/*" element={<Home />} /> 
          </Routes>
      </Router>
    </>
  );
}

export default App;






















































// import { useState } from 'react';
// //import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./Component/Login"; 

// function App() {
//   return (
//     <>
//     <h1>App File </h1>
//        <Router> 
//         <Routes>
//           <Route path="/Login" element={<Login />} />  
//         </Routes>
//       </Router>
//     </>
//   )
// }

// export default App;
