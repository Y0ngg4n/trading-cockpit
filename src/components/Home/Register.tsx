import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
import {Trans} from '@lingui/macro';

export class Register extends Component {
    render() {
        return (<Form>
                <Form.Group controlId="emailAddress">
                    <Form.Label><Trans id="home.login.email"/></Form.Label>
                    <Form.Control type="email"/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label><Trans id="home.login.password"/></Form.Label>
                    <Form.Control type="password"/>
                </Form.Group>
                <Form.Group controlId="passwordRepeat">
                    <Form.Label><Trans id="home.register.passwordRepeat"/></Form.Label>
                    <Form.Control type="password"/>
                </Form.Group>
                <Button variant="success" type="submit">
                    <Trans id="home.register.submit"/>
                </Button>
            </Form>
        );
    }
}