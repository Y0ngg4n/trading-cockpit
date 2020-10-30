import React, {Component, FormEvent} from "react";
import {Form, FormGroup, Container} from 'react-bootstrap';
import {Trans} from "@lingui/macro";
import {Button} from "react-bootstrap";
import {ALPHAVANTAGE, CONFIG} from '../../config';
import axios from 'axios';
import {Redirect} from "react-router-dom";


interface StateProps {
    apiKey: string;
    validated: boolean
}

export class ApiKeyForm extends Component<{}, StateProps> {

    state = {
        apiKey: "",
        validated: false
    }

    handleApiKeyChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        this.setState((prevState) => ({
            ...prevState,
            apiKey: event.target.value.trim()
        }));
    }

    async saveApiKey(event: FormEvent<HTMLFormElement>) {
        const form = event.currentTarget;
        event.preventDefault();
        if (!form.checkValidity()) {
            event.stopPropagation();
        }
        const token = localStorage.getItem(CONFIG.localSessionKey)
        const response = await axios.post(CONFIG.apiURL + CONFIG.updateApiKey, {
            apikey: this.state.apiKey
        }, {headers: {Authorization: 'Bearer ' + token}})
        if (response.status === 200) {
            this.setState((prevState) => ({
                ...prevState,
                validated: true,
            }));
        }
        // const response = await axios.get(ALPHAVANTAGE.testApiKeyUrl + this.state.apiKey)
        // if (response.status === 200) {
        //     console.log("Correct API Key")
        //
        // }else{
        //     console.log("Wrong API Key")
        //     this.setState((prevState) => ({
        //         ...prevState,
        //         validated: false,
        //     }));
        // }
    }

    render() {
        if (this.state.validated) {
            return (<Redirect to="/dashboard"/>);
        }
        return (
            <Container>
                <h1><Trans id="dashboard.apikey.title"/></h1>
                <p><Trans id="dashboard.apikey.description"/></p>
                <a href={ALPHAVANTAGE.getApiKeyUrl}/>
                <Form validated={this.state.validated} onSubmit={async (e) => {
                    await this.saveApiKey(e)
                }}>
                    <FormGroup controlId="apikey">
                        <Form.Label><Trans id="dashboard.apikey.label"/></Form.Label>
                        <Form.Control
                            value={this.state.apiKey}
                            onChange={(e) => this.handleApiKeyChange(e)}
                            type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            <Trans id="dashboard.apikey.wrongApiKey"/>
                        </Form.Control.Feedback>
                        <Button variant="success" type="submit"><Trans id="dashboard.apikey.save"/></Button>
                    </FormGroup>
                </Form>
            </Container>
        )
    }

}