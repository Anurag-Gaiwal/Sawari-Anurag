import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Homepage from "./pages/Homepage";
import PublishRide from "./pages/PublishRideLayout";
import ChatBox from "./pages/ChatBox";

import Login from "./pages/Login";
import PublishRideLayout from "./pages/PublishRideLayout";
import RegisterFormPage1 from "./pages/RegisterFormPage1";
import RegisterForm from "./pages/RegisterForm";
import RegisterFormPage2 from "./pages/RegisterFormPage2";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SearchRide from "./components/SearchRide";
import MyRequestedRides from "./pages/MyRequestedRides";
import MyPublishedRides from "./pages/MyPublishedRides";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="publish-a-ride" element={<PublishRideLayout />} />
        <Route path="search-a-ride" element={<SearchRide />} />
        <Route path="chatbox" element={<ChatBox />} />
        <Route path="login" element={<Login />} />
        <Route path="MyRequestedRides" element={<MyRequestedRides />} />
        <Route path="MyPublishedRides" element={<MyPublishedRides />} />
        <Route path="register" element={<Register />} />
        <Route path="form" element={<RegisterForm />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Navigate replace to="registerformpage1" />} />
          <Route path="registerformpage1" element={<RegisterFormPage1 />} />
          <Route path="registerformpage2" element={<RegisterFormPage2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
