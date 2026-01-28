import { Lock, Mail, User2Icon } from "lucide-react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";


const Login = () => {
  const dispatch = useDispatch();
  const [query] = useSearchParams()
  const urlState = query.get("state");
  const [state, setState] = React.useState(urlState || "login");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const {data} = await api.post(`/api/users/${state}`, formData)
      dispatch(login(data))
      localStorage.setItem('token' , data.token)
      toast.success(data.message)
    }
    catch(error){
      toast(error ?.response?.data?.message || error.message)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-700 rounded-2xl px-8 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl"
      >
        <h1 className="text-white text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          {state == "login"
            ? "Please sign in to continue"
            : "Please sign up to continue"}
        </p>
        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-gray-900 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={16} color="#6B7280" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0 bg-transparent text-white placeholder-gray-400"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="flex items-center w-full mt-4 bg-gray-900 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={13} color="#6B7280" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0 bg-transparent text-white placeholder-gray-400"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center mt-4 w-full bg-gray-900 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={13} color="#6B7280" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0 bg-transparent text-white placeholder-gray-400"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4 text-left text-blue-400">
          <button
            className="text-sm hover:text-blue-300 transition"
            type="reset"
          >
            Forget password?
          </button>
        </div>
        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-gray-800 hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>
        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <a
            href="#"
            className="text-blue-400 hover:text-blue-300 hover:underline transition"
          >
            click here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
