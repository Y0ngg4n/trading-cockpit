import React, {Component} from "react";
import {Navigation} from "./Navigation";

interface StateProps {

}

export class Dashboard extends Component<{}, StateProps> {
    render() {
        return (<Navigation/>)
    }

}