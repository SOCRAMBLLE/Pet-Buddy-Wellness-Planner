import React, { useState } from "react";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Pet Info:", { ...petInfo, species: petType });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="button"
        onClick={() => handleTypeChange("dog")}
        className={petType === "dog" ? "active" : ""}
      >
        Dog
      </button>
      <button
        type="button"
        onClick={() => handleTypeChange("cat")}
        className={petType === "cat" ? "active" : ""}
      >
        Cat
      </button>
      <br />
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={petInfo.name}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Birth Date:
        <input
          type="date"
          name="birthDate"
          value={petInfo.birthDate}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={petInfo.username}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Password:
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
  );
};

export default PetRegister;
