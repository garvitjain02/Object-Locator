import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Add from "./Add";
import Voice from "./voice";

// bg="primary" data-bs-theme="dark"

const Header = (props) => { 
  let st = {
    background : '#0e8388',
    color: 'white'
  };

  const logout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.replace("");
  }

  return (
  <>
    <Navbar expand="lg" style={st} className="">
      <Container fluid>
      <Nav className="me-auto">
        <Navbar.Brand><h3 className="logoHeading">Object Locator</h3></Navbar.Brand>
        </Nav>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px', marginRight: '4%'}}
            navbarScroll
          >
            <Link to="/" className="navButton">Home</Link>
            {/* <Link to="/Add" className="navButton">Add</Link> */}

          <Add />  

          </Nav>
          <Form className="d-flex me-3">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
            <Voice/>
          </Form>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                     
              <NavDropdown.Item as={Link} to="/MyProfile">My Profile</NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/" onClick={logout}>Logout</NavDropdown.Item>

            </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default Header;
