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
        <Route path="https://from-fronted-k8aq-git-main-bipins-projects-0c3e442c.vercel.app/login" element={<LoginForm />} />
        <Route path="https://from-fronted-k8aq-git-main-bipins-projects-0c3e442c.vercel.app/register" element={<Register />} />
        <Route path="https://from-fronted-k8aq-git-main-bipins-projects-0c3e442c.vercel.app/change-password"  element={ <ChangePassword /> }/>
        <Route path="https://from-fronted-k8aq-git-main-bipins-projects-0c3e442c.vercel.app/profile/:id" element={<Profile />} />
        <Route path="https://from-fronted-k8aq-git-main-bipins-projects-0c3e442c.vercel.app/forget-password" element={<ForgotPassword />} />
        <Route path="https://from-fronted-k8aq-git-main-bipins-projects-0c3e442c.vercel.app/reset-password/:token" element={<ResetPassword />} />
        <Route path="https://from-fronted-k8aq-git-main-bipins-projects-0c3e442c.vercel.app/all-submissions" element={<Card />} />
        <Route path="https://from-fronted-k8aq-git-main-bipins-projects-0c3e442c.vercel.app/submit" element={<SubmissionForm />} />
        <Route path="https://from-fronted-k8aq-git-main-bipins-projects-0c3e442c.vercel.app/my-submissions" element={<SubmissionList />} />
      </Routes>
    </>
  );
}
