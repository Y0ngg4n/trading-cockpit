import React from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom";
import {I18nProvider} from '@lingui/react'
import {Home} from "./components/Home";

import catalogDe from './locales/de/messages.js'
import catalogEn from './locales/en/messages.js'
import {Dashboard} from "./components/Dashboard/Dashboard";
import {ApiKeyForm} from "./components/Dashboard/ApiKeyForm";

function App() {

    const lang: string = navigator.language.split("-")[0]
    const catalogs = {de: catalogDe, en: catalogEn};
    console.log(lang)

    return (
        <I18nProvider language={lang} catalogs={catalogs}>
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/dashboard" component={Dashboard} exact/>
                <Route path="/api-key-form" component={ApiKeyForm} exact/>
            </Switch>
        </I18nProvider>
    );
}

export default App;
