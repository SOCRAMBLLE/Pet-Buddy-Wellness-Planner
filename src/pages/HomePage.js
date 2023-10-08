import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Card from "../components/Card";
import "./HomePage.css";
import ButtonLink from "../components/UI/ButtonLink";
import Cert from "../components/Cert";
import { LoginContext } from "../components/functions/LoginContext";

const HomePage = () => {
  const { user } = useContext(LoginContext);

  // If user is logged in go directly to dashboard page
  if (user.auth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Card className="homepageCard">
        <h1>Welcome to your Buddy Planner!</h1>
        <div>
          <h4>Don't have an account?</h4>
          <ButtonLink to="/register">Register</ButtonLink>
        </div>
        <div>
          <h4>Already have an account?</h4>
          <ButtonLink to="/login">Login</ButtonLink>
        </div>
      </Card>

      <Cert />
    </>
  );
};

export default HomePage;
