import axios from 'axios';
import React from 'react'
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap';

function UserMenu(){

  const logout = function(){
    localStorage.removeItem("Role");
    localStorage.removeItem("Account");
    axios.get("http://localhost:8080/shop/logout")
      .then(res=>{
        const {data} = res;
        console.log(data);
      })
      .catch(error=>console.log(error))
  }

    return(
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Welcome</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>

                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/login" hidden={localStorage.getItem("Role")!=null?true:false}>
                    Login 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/login" onClick={logout} hidden={localStorage.getItem("Role")==null?true:false}>
                    Logout 
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}
export default UserMenu;