import Card from "../components/Card";
import "./HomePage.css";
import ButtonLink from "../components/UI/ButtonLink";
import Cert from "../components/Cert";

const HomePage = () => {
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
