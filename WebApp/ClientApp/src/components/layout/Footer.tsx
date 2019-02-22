import { getTheme, ITheme, registerOnThemeChangeCallback, removeOnThemeChangeCallback, Toggle } from "office-ui-fabric-react";
import React, { Component, ReactNode } from "react";
import { loadThemeDark, loadThemeLight } from "../services/Themes";
import "./Footer.scss";

interface IState {
    theme: ITheme;
}

export class Footer extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);

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

    public render(): ReactNode {
        const changeTheme = (event: any, checked?: boolean) => checked ? loadThemeDark() : loadThemeLight();

        const style: React.CSSProperties = {
            backgroundColor: this.state.theme.palette.purpleDark,
            color: this.state.theme.palette.white,
        };

        return (
            <div className="footer-contrainer" style={style}>
                <span className="ms-font-m">Translation Manager 2019 - made by Pavlo Filipchuk</span>
            </div>);
    }
}
