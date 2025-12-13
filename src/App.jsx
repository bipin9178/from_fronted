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
const frontendUrl = 'https://from-fronted-k8aq-6mzdph7s7-bipins-projects-0c3e442c.vercel.app';
  return (
    <>
      <UserNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`${frontendUrl}/login`} element={<LoginForm />} />
        <Route path={`${frontendUrl}/register`} element={<Register />} />
        <Route path={`${frontendUrl}/change-password`} element={<ChangePassword />} />
        <Route path={`${frontendUrl}/profile/:id`} element={<Profile />} />
        <Route path={`${frontendUrl}/forget-password`} element={<ForgotPassword />} />
        <Route path={`${frontendUrl}/reset-password/:token`} element={<ResetPassword />} />
        <Route path={`${frontendUrl}/all-submissions`} element={<Card />} />
        <Route path={`${frontendUrl}/submit`} element={<SubmissionForm />} />
        <Route path={`${frontendUrl}/my-submissions`} element={<SubmissionList />} />
      </Routes>
    </>
  );
}
