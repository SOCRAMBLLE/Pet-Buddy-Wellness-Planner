import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../components/functions/LoginContext"
import Card from "../components/Card";
import Cert from "../components/Cert";
import TodoList from "../components/ToDoList";
import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(LoginContext);
  const [petID, setPetID] = useState(""); // Estado para armazenar o PetID

  useEffect(() => {
    const fetchPetID = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/pets/getPetID?username=${user.username}`
        );
        setPetID(response.data.petID);
        console.log(response.data.petID);
      } catch (error) {
        console.error("Erro ao buscar o PetID:", error);
      }
    };
    fetchPetID();
  }, [user.username]);

  if (!petID) {
    return <p>Carregando...</p>;
  }
  
  return (
    <>
      <Card>
        <TodoList petID={petID} />
      </Card>
      <Cert />
    </>
  );
};

export default Dashboard;
