import React, { useState } from "react";
import axios from "axios";
import "./PetRegister.css";
import { FaDog, FaCat } from "react-icons/fa6";

const PetRegister = () => {
  const [petType, setPetType] = useState("");

  const [petInfo, setPetInfo] = useState({
    name: "",
    species: "",
    birthDate: "",
    username: "",
    password: "",
  });

  const [successPage, setSuccessPage] = useState(false);

  const handleTypeChange = (newType) => {
    setPetType(newType);
    setPetInfo((prevInfo) => ({ ...prevInfo, species: newType }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPetInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // see if there is any empty inputs
    const emptyFields = [];
    for (const fieldName in petInfo) {
      if (petInfo[fieldName] === "") {
        emptyFields.push(fieldName);
      }
    }

    if (emptyFields.length > 0) {
      const inputs = document.querySelectorAll(".createUserForm input");
      console.log(emptyFields);
      inputs.forEach((input) => {
        if (emptyFields.includes(input.name)) {
          input.classList.add("emptyInput");
        } else {
          input.classList.remove("emptyInput");
        }
      });
      return;
    } else if (emptyFields.length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/pets/create",
          petInfo
        );
        setSuccessPage(true);
        setPetInfo({
          name: "",
          species: "",
          birthDate: "",
          username: "",
          password: "",
        });
      } catch (error) {
        console.error("Error trying to register animal:", error);
      }
    }
  };

  return (
    <div className="createUserForm">
      <h1>Register Your Buddy</h1>
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={() => handleTypeChange("dog")}
          className={`speciesBtn ${petType === "dog" ? "active" : ""}`}
        >
          <FaDog />
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange("cat")}
          className={`speciesBtn ${petType === "cat" ? "active" : ""}`}
        >
          <FaCat />
        </button>
        <br />
        <label>
          <span>Name:</span>
          <input
            type="text"
            name="name"
            value={petInfo.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          <span>Birth Date:</span>
          <input
            type="date"
            name="birthDate"
            value={petInfo.birthDate}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          <span>Username:</span>
          <input
            type="text"
            name="username"
            value={petInfo.username}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          <span>Password:</span>
          <input
            type="password"
            name="password"
            value={petInfo.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Register Buddy</button>
      </form>

      <div className={`successModal ${successPage ? "show" : ""}`}>
        <h2>Your buddy was successfully registered!</h2>
        <button type="button" onClick={() => setSuccessPage(false)}>Go Back</button>
      </div>
    </div>
  );
};

export default PetRegister;
