import React, {ChangeEvent, Component, FormEvent} from "react";
import {Form, Button, Alert} from "react-bootstrap";
import {Trans} from '@lingui/macro';
import {CONFIG} from '../../config';
import axios from 'axios';


interface StateProps {
    validated: boolean,
    error: boolean,
    email: string
    password: string
}

export class Login extends Component<{}, StateProps> {

    state = {
        validated: false,
        error: false,
        email: "",
        password: ""
    }

    async login(event: FormEvent<HTMLFormElement>) {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        try {
            const response = await axios.post(CONFIG.apiURL + CONFIG.loginUrl, {
                email: this.state.email,
                password: this.state.password
            });
            if (response.status === 200) {
                console.log("Weiiiiter")
                this.setState((prevState) => ({
                        ...prevState,
                        validated: true,
                        error: false
                    }
                ));
            } else {
                throw new Error()
            }
        } catch (error) {
            this.setState((prevState) => ({
                ...prevState,
                validated: true,
                error: true,
            }));
        }
    }

    handleEmailChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        this.setState((prevState) => ({
            ...prevState,
            email: event.target.value.trim()
        }));
    }

    handlePasswordChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        this.setState((prevState) => ({
            ...prevState,
            password: event.target.value.trim()
        }));
    }

    render() {
        let errorAlert = <Form.Group/>
        if (this.state.error) {
            errorAlert = <Form.Group><Alert variant="danger"><Trans
                id="home.login.wrongCredentials"/></Alert></Form.Group>
        }
        return (
            <Form noValidate validated={this.state.validated} onSubmit={async (e) => {
                await this.login(e)
            }}>
                <Form.Group controlId="emailAddress">
                    <Form.Label><Trans id="home.login.email"/></Form.Label>
                    <Form.Control value={this.state.email}
                                  onChange={(e) => this.handleEmailChange(e)}
                                  type="email" required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide an email adress
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label><Trans id="home.login.password"/></Form.Label>
                    <Form.Control value={this.state.password}
                                  onChange={(e) => this.handlePasswordChange(e)}
                                  type="password" required/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a password
                    </Form.Control.Feedback>
                </Form.Group>
                {errorAlert}
                <Button variant="success" type="submit">
                    <Trans id="home.login.submit"/>
                </Button>
            </Form>
        );
    }
}