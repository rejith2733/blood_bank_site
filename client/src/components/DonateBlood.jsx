import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Images/Login.png";

const DonateBlood = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [lastDonationDate, setLastDonationDate] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleBloodTypeChange = (e) => {
    setBloodType(e.target.value);
  };

  const handleLastDonationDateChange = (e) => {
    setLastDonationDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donationData = {
      name,
      age,
      bloodType,
      lastDonationDate,
    };

    try {
      let res = await fetch("http://localhost:5001/api/donations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(donationData),
      });

      let resjson = await res.json();
      if (res.status === 201) {
        setMessage("Donation recorded successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage(`Error: ${resjson.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white p-8 rounded-lg max-w-sm w-full">
          <div className="flex justify-center">
            <img src={Login} alt="Blood logo" className="h-auto w-auto" />
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-md text-black font-mono font-extrabold"
              >
                Name
              </label>
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-600 text-gray-700 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="age"
                className="block text-md text-black font-mono font-extrabold"
              >
                Age
              </label>
              <div>
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 caret-red-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  value={age}
                  onChange={handleAgeChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="bloodType"
                className="block text-md text-black font-mono font-extrabold"
              >
                Blood Type
              </label>
              <div>
                <select
                  id="bloodType"
                  name="bloodType"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 caret-red-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  value={bloodType}
                  onChange={handleBloodTypeChange}
                >
                  <option value="">Select a blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="lastDonationDate"
                className="block text-md text-black font-mono font-extrabold"
              >
                Date of Last Donation
              </label>
              <div className="mt-1">
                <input
                  id="lastDonationDate"
                  name="lastDonationDate"
                  type="date"
                  className="appearance-none rounded-md relative block font-bold w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  value={lastDonationDate}
                  onChange={handleLastDonationDateChange}
                />
              </div>
            </div>

            <div>
              <button
                className="bg-red-500 py-3 px-6 rounded-md text-center text-white hover:bg-red-600 block mx-auto w-full"
                type="submit"
              >
                <span className="absolute right-3 inset-y-0 flex items-center pl-3 ">
                  <svg
                    className="h-5 w-5 text-white font-monoton"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.293 5.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L12.586 10H5a1 1 0 110-2h7.586l-1.293-1.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign Up
              </button>
              {message && (
                <div className="text-center mt-4">
                  <p>{message}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonateBlood;
