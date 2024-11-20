import React, { useState } from "react";
import Login from "./Images/Login.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Logint({ setIsAuthenticated }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allInputvalue = {
      email: formValue.email,
      password: formValue.password,
    };

    let res = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(allInputvalue),
    });
    let resjson = await res.json();
    if (res.status === 200) {
      setMessage(resjson.success);
      localStorage.setItem("authToken", resjson.token);
      setIsAuthenticated(true); // Update authentication state
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      setMessage("Some Error Occurred");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="modal-content bg-white p-7 rounded-lg max-w-sm w-full">
        <div className="logo flex justify-center mb-8">
          <img src={Login} alt="Blood Bank Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-lable">Email</label>
                <input
                  type="text"
                  name="email"
                  value={formValue.email}
                  onChange={handleInput}
                  className="border rounded-md py-3 px-4 mb-4 w-full outline-none caret-red-700"
                />
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formValue.password}
                onChange={handleInput}
                className="border rounded-md py-3 px-4 mb-4 w-full outline-none caret-red-700"
              />
            </div>
            <div className="col-md-12">
              <button
                className="bg-red-600 py-3 px-6 rounded-md text-center text-white hover:bg-red-700 block mx-auto w-full"
                type="submit"
              >
                Login
              </button>
              <p>Already have an account? <Link to="/register" className="font-bold">Register</Link></p>
            </div>
          </div>
        </form>
        {message && <p className="text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
}

export default Logint;
