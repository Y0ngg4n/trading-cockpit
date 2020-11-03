import React, {Component} from "react";
import {Card, ListGroup, Row, Col, Button} from "react-bootstrap";
import {Trans} from "@lingui/react";
import {CONFIG, LEMONMARKETS} from "../../../config";
import ReconnectingWebSocket from "reconnecting-websocket";
import {LemonMarkets, LemonMarketsStream} from "lemon-markets";
import axios from "axios";

interface StateProps {
    apple: number
    stocks: Stock[]
}

class Stock {

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get isin(): string {
        return this._isin;
    }

    set isin(value: string) {
        this._isin = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    private _name: string = "";
    private _isin: string = "";
    private _price: number = 0;


    constructor(name: string, isin: string) {
        this._name = name;
        this._isin = isin;
    }
}

export class MarketOverview extends Component<{}, StateProps> {

    state = {
        apple: 0,
        stocks: [
            new Stock("Apple", "US0378331005"),
            new Stock("Microsoft", "US5949181045"),
            new Stock("Tesla", "US88160R1014")
        ]
    }

    lemon = new LemonMarkets(localStorage.getItem(CONFIG.localAPIKey) as string)

    async componentDidMount() {
        for (let i = 0; i < this.state.stocks.length; i++) {
            const stock = this.state.stocks[i] as Stock
            const apikey = localStorage.getItem(CONFIG.localAPIKey)
            console.log(LEMONMARKETS.searchUrl + stock.isin + LEMONMARKETS.lastTickUrl)
            axios.get(LEMONMARKETS.searchUrl + stock.isin + LEMONMARKETS.lastTickUrl, {
                headers: {
                    "Authorization": "Token " + apikey
                }
            }).then(value => {
                if (!value.request.result) return;
                const lastTick = value.request.result.price;
                let stocks: Stock[] = this.state.stocks
                stock.price = lastTick.price
                this.state.stocks[i] = stock
                this.setState((prevState) => ({
                    ...prevState,
                    stocks: stocks
                }));
            })
            const lemonStream = new ReconnectingWebSocket(LEMONMARKETS.websocketUrl);
            lemonStream.onopen = () => {
                lemonStream.send(JSON.stringify({
                    action: "subscribe",
                    specifier: 'with-quantity-with-uncovered',
                    value: this.state.stocks[i].isin,
                }));
            }
            lemonStream.onmessage = evt => {
                let stocks: Stock[] = this.state.stocks
                stock.price = JSON.parse(evt.data).price
                this.state.stocks[i] = stock
                this.setState((prevState) => ({
                    ...prevState,
                    stocks: stocks
                }));
            }
        }
    }

    render() {
        return (
            <Card>
                <Card.Header><Trans id="dashboard.marketoverview.header.title"/></Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        {this.state.stocks.map(value => {
                            return (
                                <ListGroup.Item key={value.name}>
                                    <Row>
                                        <Col md={8}>{value.name}</Col>
                                        <Col md={4}>{value.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Card.Body>
            </Card>
        )
    }
}