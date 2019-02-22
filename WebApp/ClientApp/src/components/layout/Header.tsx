import { getTheme, ITheme, registerOnThemeChangeCallback, removeOnThemeChangeCallback, IconButton, IButtonStyles, Stack } from "office-ui-fabric-react";
import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Auth } from "../Auth/Auth";
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
        const styles: IButtonStyles = {
            icon: {
                color: this.state.theme.palette.white,
                fontSize: this.state.theme.fonts.xxLarge.fontSize,
            },
            root: {marginRight: "1em"},
        };

        return (
            <div
                style={{ backgroundColor: this.state.theme.palette.themeDarker, color: this.state.theme.palette.white }}
                className="header-container"
            >
                <div className="title ms-font-xl" onClick={navigateRoot}>
                    <span>Translation Manager {process.env.REACT_APP_DEMO ? "(Demo)" : ""}</span>
                </div>
                <Stack horizontal={true} verticalFill={true} verticalAlign="center">
                    <IconButton onClick={this.props.onSettingsClick} styles={styles} iconProps={{ iconName: "Settings" }} />
                    <Auth />
                </Stack>
            </div>);
    }
}

export default withRouter(Header);
