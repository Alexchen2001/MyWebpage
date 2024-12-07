import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-dark navbar-dark shadow-lg rounded-0 p-3 w-100">
      <Container className="justify-content-center">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home" className="px-3 text-light">
              Home
            </Nav.Link>
            <Nav.Link href="#link1" className="px-3 text-light">
              Link 1
            </Nav.Link>
            <Nav.Link href="#link2" className="px-3 text-light">
              Link 2
            </Nav.Link>
            <Nav.Link href="#link3" className="px-3 text-light">
              Link 3
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;