import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./redux/userSlice";

import UserNavbar from "./user/UserNavbar.jsx";
import LoginForm from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./user/Home.jsx";
import SubmissionForm from "./Form/SubmissionForm.jsx";
import SubmissionList from "./Form/SubmissionList.jsx";
import Card from "./Form/Card.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import ForgotPassword from "./features/forget.jsx";
import ResetPassword from "./features/resetPassword.jsx";
export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <>
      <UserNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password"  element={ <ChangePassword /> }/>
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/all-submissions" element={<Card />} />
        <Route path="/submit" element={<SubmissionForm />} />
        <Route path="/my-submissions" element={<SubmissionList />} />
      </Routes>
    </>
  );
}