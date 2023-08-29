import React, { useState } from "react";
import axios from "axios";
import "./PetRegister.css";
import { FaDog, FaCat } from "react-icons/fa6";

const PetRegister = () => {
  const [petInfo, setPetInfo] = useState({
    name: "",
    species: "",
    birthDate: "",
    username: "",
    password: "",
  });

  const [petType, setPetType] = useState("dog");

  const handleTypeChange = (newType) => {
    setPetType(newType);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPetInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (
    //   petInfo.name === "" ||
    //   petInfo.species === "" ||
    //   petInfo.birthDate === "" ||
    //   petInfo.username === "" ||
    //   petInfo.password === ""
    // ) {
    //   console.error("Please fill out all fields.");
    //   return;
    // }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/pets/create",
        petInfo
      );
      console.log(response.data.message);
      // Limpar os campos do formulário após o envio bem-sucedido
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
    </div>
  );
};

export default PetRegister;
