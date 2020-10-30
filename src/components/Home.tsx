import React, {Component, MouseEvent} from "react";
import {Button, Container} from "react-bootstrap";
import {Login} from "./Home/Login";
import {Register} from "./Home/Register";
import {Trans} from '@lingui/macro';
import {Redirect} from "react-router-dom";
import {CONFIG} from "../config";
import axios from "axios";

interface StateProps {
    register: boolean
    alreadyLoggedIn: boolean
}

export class Home extends Component<{}, StateProps> {

    state: StateProps = {
        register: false,
        alreadyLoggedIn: false
    }

    toggleLoginRegister(event: MouseEvent) {
        this.setState((prevState) => ({
            ...prevState,
            register: !prevState.register
        }));
    }

    async fetchMe() {
        const token = localStorage.getItem(CONFIG.localSessionKey)
        const response = await axios.get(CONFIG.apiURL + CONFIG.meUrl, {
            headers: {Authorization: 'Bearer ' + token}
        });
        if (response.status === 200) {
            this.setState((prevState) => ({
                    ...prevState,
                    alreadyLoggedIn: true
                }
            ));
        }
    }

    componentDidMount() {
        this.fetchMe()
    }

    render() {
        if (this.state.alreadyLoggedIn) {
            return (<Redirect to="/dashboard"/>);
        }
        let form = <Login/>
        let switchButton = <Trans id={"home.login.noAccount"}/>
        if (this.state.register) form = <Register/>
        if (this.state.register) switchButton = <Trans id={"home.register.haveAccount"}/>
        return (
            <Container>
                {form}
                <Button variant="primary" onClick={(e) => this.toggleLoginRegister(e)}>
                    {switchButton}
                </Button>
            </Container>
        );
    }
}