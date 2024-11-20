import React, { useEffect, useState } from "react";

const DonationList = () => {
  const [bloodTypeCounts, setBloodTypeCounts] = useState({});

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/donations");
        const data = await response.json();
        countBloodTypes(data.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, []);

  const countBloodTypes = (donations) => {
    const counts = donations.reduce((acc, donation) => {
      acc[donation.bloodType] = (acc[donation.bloodType] || 0) + 1;
      return acc;
    }, {});
    setBloodTypeCounts(counts);
    storeBloodTypeCounts(counts);
  };

  const storeBloodTypeCounts = async (counts) => {
    try {
      await fetch("http://localhost:5001/api/bloodTypeCounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ counts }),
      });
    } catch (error) {
      console.error("Error storing blood type counts:", error);
    }
  };

  return (
    <div style={{
      textAlign: "center",
      backgroundImage: "url('https://media.istockphoto.com/id/1417687157/photo/the-nurse-carries-blood-ready-for-storage.jpg?s=1024x1024&w=is&k=20&c=ReAymXiivVR-S7cu0U8SBp0XmYvA0WB_eKgqhYfdpZU=')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h1 style={{ listStyle: "none", padding: 0 ,fontWeight:"bold",fontSize: "30px"}}>Blood Bank Inventory</h1>
      <ul style={{ listStyle: "none", padding: 0 ,fontWeight:"bold",fontSize: "30px"}}>
        {Object.entries(bloodTypeCounts).map(([bloodType, count]) => (
          <li key={bloodType} style={{ marginBottom: "10px" }}>
            {bloodType}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonationList;
