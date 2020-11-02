import React, {Component} from "react";
import {Navigation} from "./Navigation";
import {Depots} from "./DashboardComponents/Depots";
import GridLayout from 'react-grid-layout';
import {CONFIG} from "../../config";
import axios from "axios";
import {ApiKeyForm} from "./ApiKeyForm";
import {MarketOverview} from "./DashboardComponents/MarketOverview";
import {Redirect} from "react-router-dom";

interface StateProps {
    apikey: string;
}

export class Dashboard extends Component<{}, StateProps> {

    state = {
        apikey: ""
    }

    componentDidMount() {
        this.fetchMe()
    }

    async fetchMe() {
        const token = localStorage.getItem(CONFIG.localSessionKey)
        const response = await axios.get(CONFIG.apiURL + CONFIG.meUrl, {
            headers: {Authorization: 'Bearer ' + token}
        });
        localStorage.setItem(CONFIG.localAPIKey, response.data.apikey)
        if (response.status === 200) {
            this.setState((prevState) => ({
                    ...prevState,
                    apikey: response.data.apikey
                }
            ));
        }
    }

    layout = [
        {i: 'depots', x: 0, y: 0, w: 6, h: 4, minW: 2, maxW: 6},
        {i: 'marketoverview', x: 1, y: 0, w: 6, h: 4, minW: 2, maxW: 6},
    ];

    render() {
        if (this.state.apikey == null) {
            return (<Redirect to="/api-key-form"/>);
        }
        return (
            <div>
                <Navigation/>
                <GridLayout className="layout" layout={this.layout}>
                    <Depots key="depots"/>
                    <MarketOverview key="marketoverview"/>
                </GridLayout>
            </div>
        )
    }

}