import Card from "../components/Card";
import "./HomePage.css";
import ButtonLink from "../components/ButtonLink";

const HomePage = () => {
  

  return (
    <Card className="homepageCard">
      <h1>Welcome to your Buddy Planner!</h1>
      <div>
        <h4>Dont have an account?</h4>
        <ButtonLink to="/register">Register</ButtonLink>
      </div>
      <div>
        <h4>You allready have an account?</h4>
        <ButtonLink to="/login">Login</ButtonLink>
      </div>
    </Card>
  );
};

export default HomePage;
