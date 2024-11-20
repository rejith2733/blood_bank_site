import React, { useState, useEffect } from "react";
import Main from "./Images/Main.jpg"; // Importing blood donation image
import { FaEdit, FaTrash } from "react-icons/fa";

const BloodRequest = () => {
  const [Name, setName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [location, setLocation] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        let res = await fetch("http://localhost:5001/api/requests");
        let data = await res.json();
        setRequests(data);
      } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred while fetching requests.");
      }
    };

    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRequest = { Name, bloodType, location, contactInfo };

    try {
      let res = await fetch("http://localhost:5001/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRequest),
      });

      if (res.status === 201) {
        const savedRequest = await res.json();
        setRequests([...requests, savedRequest]);
        setName("");
        setBloodType("");
        setLocation("");
        setContactInfo("");
      } else {
        const error = await res.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while submitting the form.");
    }
  };

  const handleRemove = async (index) => {
    const requestToRemove = requests[index];

    try {
      let res = await fetch(`http://localhost:5001/api/requests`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        const newRequests = [...requests];
        newRequests.splice(index, 1);
        setRequests(newRequests);
      } else {
        const error = await res.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while deleting the request.");
    }
  };

  const handleEdit = (index) => {
    const requestToUpdate = requests[index];
    setName(requestToUpdate.Name);
    setBloodType(requestToUpdate.bloodType);
    setLocation(requestToUpdate.location);
    setContactInfo(requestToUpdate.contactInfo);
    handleRemove(index);
  };

  return (
    <div className="container mx-auto px-4 flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-4">
        <img
          src={Main}
          alt="Blood donation"
          className="w-full h-88 mix-blend-darken max-w-full lg:max-w-none overflow-hidden mt-[-20px] mr-3"
        />
      </div>
      <div className="flex-grow p-4 my-2">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Request Blood</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 my-4 rounded-lg bg-opaque-50">
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Your Name"
              className="w-full px-3 py-2 border rounded-md"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bloodType" className="block font-bold mb-2">Blood Type</label>
            <select
              id="bloodType"
              className="w-full px-3 py-2 border rounded-md"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
            >
              <option value="" disabled>Select Blood Type</option>
              {bloodTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block font-bold mb-2">Location</label>
            <input
              type="text"
              id="location"
              placeholder="Enter Location"
              className="w-full px-3 py-2 border rounded-md"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactInfo" className="block font-bold mb-2">Contact Information</label>
            <input
              type="text"
              id="contactInfo"
              placeholder="Enter Contact Information"
              className="w-full px-3 py-2 border rounded-md"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Submit Request
          </button>
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </form>
        <h2 className="text-2xl font-bold mb-4 text-red-500">Requests</h2>
        <ul className="max-w-lg mx-auto">
          {requests.map((request, index) => (
            <li key={index} className="bg-gray-100 p-4 my-2 rounded-md flex justify-between items-center">
              <div>
                <p><strong>Name:</strong> {request.Name}</p>
                <p><strong>Blood Type:</strong> {request.bloodType}</p>
                <p><strong>Location:</strong> {request.location}</p>
                <p><strong>Contact Info:</strong> {request.contactInfo}</p>
              </div>
              <div className="flex">
                <button
                  onClick={() => handleEdit(index)}
                  className="mr-2 text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BloodRequest;
