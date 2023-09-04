import { useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import "./LoginPage.css";
import ButtonLink from "../components/ButtonLink";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/pets/check",
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        setLoggedIn(true);
        console.log("Login successful")
      } else {
        console.log("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Card className="loginForm">
      <h1>Good to see you again!</h1>
      <h4>Login to enter</h4>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Username:</span>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          <span>Password:</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <Card className={`loginSuccessDiv ${loggedIn ? "show" : ""}`}>
        <h2>Login successful</h2>
        <ButtonLink to="/dashboard">Continue to Dashboard</ButtonLink>
      </Card>
    </Card>
  );
};

export default LoginPage;
