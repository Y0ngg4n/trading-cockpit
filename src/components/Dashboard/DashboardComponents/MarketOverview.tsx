import React, {Component} from "react";
import {Card, ListGroup, Row, Col, Button} from "react-bootstrap";
import {Trans} from "@lingui/react";
import {LEMONMARKETS} from "../../../config";
import ReconnectingWebSocket from "reconnecting-websocket";

interface StateProps {
    tesla: string
}

export class MarketOverview extends Component<{}, StateProps> {

    state = {
        tesla: ""
    }

    webSocket = new ReconnectingWebSocket(LEMONMARKETS.websocketUrl)

    componentDidMount() {
        // this.webSocket.onopen = () => {
        //     // on connecting, do nothing but log it to the console
        //     console.log('connectedaads')
        //     this.webSocket.send(JSON.stringify({
        //         "action": "subscribe",
        //         "specifier": "with-uncovered",
        //         "value": "US88160R1014"
        //     }))
        // }
        //
        // this.webSocket.onmessage = evt => {
        //     console.log('message')
        //     // listen to data sent from the websocket server
        //     const message = JSON.parse(evt.data)
        //     console.log(message)
        //     this.setState({tesla: message})
        // }
        //
        // this.webSocket.onclose = () => {
        //     console.log('disconnected')
        //     // automatically try to reconnect on connection loss
        //
        // }
    }

    render() {
        return (
            <Card.Body>
                <Card.Header><Trans id="dashboard.marketoverview.header.title"/></Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        {this.state.tesla}
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        )
    }
}