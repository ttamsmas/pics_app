import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap'

const authenticatedOptions = (
  <Fragment>
    <Form.Control className="navbarSeach" type="text" placeholder="Search" />
    <Button type="Button" className="btn btn-light">
      <Nav.Link className="text-dark" href="#create-pic"> +Pic </Nav.Link>
    </Button>

    <DropdownButton title="drop_button" variant="light" id="down-button-drop-down" drop="left">
      <Dropdown.Item eventKey="1" href="#change-password">Change Password</Dropdown.Item>
      <Dropdown.Item eventKey="2" href="#sign-out">Sign Out</Dropdown.Item>
    </DropdownButton>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Button type="Button" className="btn btn-light">
      <Nav.Link className="text-dark" href="#sign-up">Sign Up</Nav.Link>
    </Button>
    <Button type="Button" className="btn btn-light">
      <Nav.Link className="text-dark" href="#sign-in">Sign In</Nav.Link>
    </Button>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar expand="sm">
    <Button className="navbarLogo" variant="danger" href="#">
      M
    </Button>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="text-dark ml-auto">
        { user && <Button variant="light" className="navbar-text text-dark mr-2">{user.email}</Button>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
