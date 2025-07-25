import React from "react";
import {Routes, Route} from "react-router-dom";
import Layout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Settings from "./pages/Settings";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login";
import CarbonCreditTokenization from "./pages/CarbonCreditTokenization";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route
          path="carbon-credit-tokenization"
          element={<CarbonCreditTokenization />}
        />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
