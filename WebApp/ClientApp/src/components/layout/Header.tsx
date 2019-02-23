import {
    DefaultPalette,
    getTheme,
    ITheme,
    registerOnThemeChangeCallback,
    removeOnThemeChangeCallback,
    Stack as div,
} from "office-ui-fabric-react";
import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { User } from "../User/User";
import SettingsButton from "../SettingsButton";
import "./Header.css";

interface IHeaderProps extends RouteComponentProps {
    onSettingsClick: () => void;
}

interface IHeaderState {
    theme: ITheme;
}

class Header extends Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps) {
        super(props);
        this.onThemeChange = this.onThemeChange.bind(this);

        this.state = {
            theme: getTheme(),
        };
    }

    public componentDidMount() {
        registerOnThemeChangeCallback(this.onThemeChange);
    }

    public componentWillUnmount() {
        removeOnThemeChangeCallback(this.onThemeChange);
    }

    public onThemeChange(theme: ITheme) {
        this.setState({ theme });
    }

    public render(): JSX.Element {
        const navigateRoot = () => this.props.history.push("/");

        return (
            <div
                style={{ backgroundColor: DefaultPalette.themeDarker, color: DefaultPalette.white }}
                className="header-container"
            >
                <div className="title ms-font-xl" onClick={navigateRoot}>
                    <span>Translation Manager {process.env.REACT_APP_DEMO ? "(Demo)" : ""}</span>
                </div>
                <div style={{height: "100%", display: "flex"}}>
                    <SettingsButton />
                    <User />
                </div>
            </div>);
    }
}

export default withRouter(Header);
