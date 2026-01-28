import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Pages/Layout";
import Dashboard from "./Pages/Dashboard";
import ElevateCv from "./Pages/ElevateCv";
import Preview from "./Pages/Preview";
import Login from "./Pages/Login";
import ResumeBuilder from "./Pages/ResumeBuilder";
import { useDispatch } from "react-redux";
import api from "./configs/api.js";
import { login, setLoading } from "./app/features/authSlice.js";
import {Toaster} from "react-hot-toast"

function App() {
  const dispach = useDispatch();
  const getUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await api.get("/api/users/data", {
          headers: {
            Authorization: token,
          },
        });
        if (data.user) {
          dispach(login({ token, user: data.user }));
        }
        dispach(setLoading(false));
      } else {
        dispach(setLoading(false));
      }
    } catch (error) {
      dispach(setLoading);
      console.log(error.message);
    }
  };

  useEffect(()=>{
    getUserData()
  },[])
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>
        <Route path="view/:resumeId" element={<Preview />} />
      </Routes>
    </>
  );
}

export default App;
