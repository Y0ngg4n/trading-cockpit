import React, {Component} from "react";
import {Navigation} from "./Navigation";
import {Depots} from "./DashboardComponents/Depots";
import { Responsive, WidthProvider} from 'react-grid-layout';
import {CONFIG} from "../../config";
import axios from "axios";
import {ApiKeyForm} from "./ApiKeyForm";
import {MarketOverview} from "./DashboardComponents/MarketOverview";
import {Redirect} from "react-router-dom";

import '../../css/dashboard.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

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

    layouts = {
        lg: [
            {i: 'depots', x: 0, y: 0, w: 6, h: 8, minW: 2, maxW: 12, minH: 8},
            {i: 'marketoverview', x: 6, y: 0, w: 6, h: 12, minW: 2, maxW: 12, minH: 12}
        ]
    }

    render() {
        if (this.state.apikey == null) {
            return (<Redirect to="/api-key-form"/>);
        }
        return (
            <div>
                <Navigation/>
                <ResponsiveGridLayout className="layout" layouts={this.layouts} rowHeight={10}
                                      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                                      cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
                                      useCSSTransforms={true} preventCollision={true} isBounded={true} autoSize={true} verticalCompact={false}>
                    <div className="widget bg-primary" key="depots"><Depots/></div>
                    <div className="widget bg-primary" key="marketoverview"><MarketOverview/></div>
                </ResponsiveGridLayout>
            </div>
        )
    }

}