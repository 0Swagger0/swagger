import { Box } from "@mui/system";
import React from "react";
import "./App.css";
import Login from "./vendorComponents/Login";
import Dashboard from "./vendorComponents/Dashboard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vendor-login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
