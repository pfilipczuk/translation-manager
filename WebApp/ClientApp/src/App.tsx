import React, { Component } from "react";
import { Route } from "react-router";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Layout } from "./components/Layout";

export default class App extends Component {
    public static displayName = App.name;

    public render(): JSX.Element {
        return (
            <Layout>
                <Route exact path="/" component={Home} />
                <Route path="/counter" component={Counter} />
                <Route path="/fetch-data" component={FetchData} />
            </Layout>
        );
    }
}
