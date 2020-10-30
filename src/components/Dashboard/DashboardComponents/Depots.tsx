import React, {Component} from "react";
import {Card, ListGroup, Row, Col, Button} from "react-bootstrap";
import {Trans} from "@lingui/react";

interface StateProps {

}

export class Depots extends Component<{}, StateProps> {

    render() {
        return (
            <Card>
                <Card.Header>Depots</Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col md={8}>Test</Col>
                                <Col md={4}><Button><Trans id="dashboard.depots.login"/></Button></Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        )
    }
}