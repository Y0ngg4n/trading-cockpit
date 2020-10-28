import React, {Component, MouseEvent} from "react";
import {Button, Container} from "react-bootstrap";
import {Login} from "./Home/Login";
import {Register} from "./Home/Register";
import {Trans} from '@lingui/macro';

interface StateProps {
    register: boolean
}

export class Home extends Component<{},StateProps> {

    state: StateProps = {
        register: false
    }

    toggleLoginRegister(event: MouseEvent){
        this.setState ((prevState) => ({
            ...prevState,
            register: !prevState.register
        }));
    }

    render() {
        let form = <Login/>
        let switchButton = <Trans id={"home.login.noAccount"}/>
        if (this.state.register) form = <Register/>
        if (this.state.register) switchButton = <Trans id={"home.register.haveAccount"}/>
        return (
            <Container>
                {form}
                <Button variant="primary" onClick={(e)=>this.toggleLoginRegister(e)}>
                    {switchButton}
                </Button>
            </Container>
        );
    }
}