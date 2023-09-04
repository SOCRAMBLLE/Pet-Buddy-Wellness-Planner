import MFLogo from "./images/MARCOS B.png";
import "./Cert.css";
import { FaGithub } from "react-icons/fa";

const Cert = () => {
  return (
    <div className="certContainer">
      <p>Made by</p>
      <a className="MFLogo" href="https://marcosfraga.ch" target="_blank" rel="noreferrer">
        <img src={MFLogo} alt="Marcos Fraga Logo"></img>
      </a>
      <p>© 2023 All rights reserved</p>
      <a
        className="gitHubL"
        href="https://github.com/SOCRAMBLLE/Pet-Buddy-Wellness-Planner"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub />
      </a>
    </div>
  );
};

export default Cert;
