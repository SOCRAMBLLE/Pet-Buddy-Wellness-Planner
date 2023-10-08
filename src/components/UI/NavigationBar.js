import { Nav, Navbar, Container } from "react-bootstrap";
import { LoginContext } from "../functions/LoginContext";
import { useContext } from "react";
import "./NavigationBar.css";

const NavigationBar = () => {
  const { user, logout } = useContext(LoginContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar expand="lg" className="bg-bodz-tertiarz">
      <Container>
        <Navbar.Brand href="/">BuddyPlanner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user.auth ? (
              <>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
