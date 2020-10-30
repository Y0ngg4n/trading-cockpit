import React, {ChangeEvent, Component, FormEvent} from "react";
import {Form, Button, Alert} from "react-bootstrap";
import {Trans} from '@lingui/macro';
import {CONFIG} from '../../config';
import axios from 'axios';
import {Redirect} from "react-router-dom";


interface StateProps {
    validated: boolean,
    error: boolean,
    email: string
    password: string
    passwordRepeat: string
    passwordNotMatch: boolean
    registered: boolean
}

export class Register extends Component<{}, StateProps> {

    state = {
        validated: false,
        error: false,
        email: "",
        password: "",
        passwordRepeat: "",
        passwordNotMatch: false,
        passwordNotSafe: false,
        registered: false
    }

    async register(event: FormEvent<HTMLFormElement>) {
        const form = event.currentTarget;
        event.preventDefault();

        if(this.state.password.match("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")){
            this.setState((prevState) => ({
                ...prevState,
                passwordNotSafe: false,
            }));
        }else{
            this.setState((prevState) => ({
                ...prevState,
                passwordNotSafe: true,
            }));
            return;
        }

        if(this.state.password !== this.state.passwordRepeat){
            this.setState((prevState) => ({
                ...prevState,
                passwordNotMatch: true,
            }));
            return;
        }else{
            this.setState((prevState) => ({
                ...prevState,
                passwordNotMatch: false,
            }));
        }

        if (!form.checkValidity()) {
            event.stopPropagation();
        }
        try {
            const response = await axios.post(CONFIG.apiURL + CONFIG.registerUrl, {
                email: this.state.email,
                password: this.state.password
            });
            if (response.status === 201) {
                localStorage.setItem(CONFIG.localSessionKey, response.data.token)
                this.setState((prevState) => ({
                        ...prevState,
                        validated: true,
                        error: false,
                        registered: true
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

    handlePasswordRepeatChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        this.setState((prevState) => ({
            ...prevState,
            passwordRepeat: event.target.value.trim()
        }));
    }


    render() {
        if(this.state.registered){
            return (<Redirect to="/dashboard"/>)
        }
        let errorAlert = <Form.Group/>
        if (this.state.error) {
            errorAlert = <Form.Group><Alert variant="danger"><Trans
                id="home.register.accountAlreadyExists"/></Alert></Form.Group>
        }
        if (this.state.passwordNotMatch) {
            errorAlert = <Form.Group><Alert variant="danger"><Trans
                id="home.register.passwordNotMatch"/></Alert></Form.Group>
        }
        if (this.state.passwordNotSafe) {
            errorAlert = <Form.Group><Alert variant="danger"><Trans
                id="home.register.passwordNotSafe"/></Alert></Form.Group>
        }
        return (
            <Form validated={this.state.validated} onSubmit={async (e) => {
                await this.register(e)
            }}>
                <Form.Group controlId="emailAddress">
                    <Form.Label><Trans id="home.login.email"/></Form.Label>
                    <Form.Control value={this.state.email}
                                  onChange={(e) => this.handleEmailChange(e)}
                                  type="email" required/>
                    <Form.Control.Feedback type="invalid">
                        <Trans id="home.register.provide.email"/>
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label><Trans id="home.login.password"/></Form.Label>
                    <Form.Control value={this.state.password}
                                  onChange={(e) => this.handlePasswordChange(e)}
                                  type="password" required/>
                    <Form.Control.Feedback type="invalid">
                        <Trans id="home.register.provide.password"/>
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="passwordRepeat">
                    <Form.Label><Trans id="home.login.password"/></Form.Label>
                    <Form.Control value={this.state.passwordRepeat}
                                  onChange={(e) => this.handlePasswordRepeatChange(e)}
                                  type="password" required/>
                    <Form.Control.Feedback type="invalid">
                        <Trans id="home.register.provide.password"/>
                    </Form.Control.Feedback>
                </Form.Group>
                {errorAlert}
                <Button variant="success" type="submit">
                    <Trans id="home.register.submit"/>
                </Button>
            </Form>
        );
    }
}