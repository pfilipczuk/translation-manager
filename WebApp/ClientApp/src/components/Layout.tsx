import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
import NavBar from "./NavBar";

export class Layout extends Component {
    public static displayName = Layout.name;

    public render(): JSX.Element {
        return (
            <div>
                <NavBar />
                <NavMenu />
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
