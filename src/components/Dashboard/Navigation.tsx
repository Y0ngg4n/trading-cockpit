import React from "react";
import {Component} from "react";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'


interface StateProps {

}

export class Navigation extends Component<{}, StateProps> {
    render() {
        return (
            <Navbar variant="dark" expand="lg">
                <Navbar.Brand href="#home">Brand</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="#desktops">Desktops</Nav.Link>
                        <Nav.Link href="#charts">Charts</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }

}