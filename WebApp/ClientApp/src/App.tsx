import { Fabric, getTheme, ITheme, loadTheme, mergeStyles, Panel, registerOnThemeChangeCallback, Toggle } from "office-ui-fabric-react";
import React, { Component } from "react";
import { Content, Footer, Header, Sidebar } from "./components/layout/index";
import "./styles/App.css";
import { DarkTheme, LightTheme } from "./themes/themes";

const styles = mergeStyles({
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
});

const changeTheme = (event: any, checked?: boolean) => checked ? loadTheme(DarkTheme) : loadTheme(LightTheme);

interface IState {
    showSettings: boolean;
    theme: ITheme;
}

export default class App extends Component<{}, IState> {
    public static displayName = App.name;

    constructor(props: any) {
        super(props);

        this._onThemeUpdate = this._onThemeUpdate.bind(this);

        this.state = {
            showSettings: false,
            theme: getTheme(),
        };

        registerOnThemeChangeCallback(this._onThemeUpdate);
    }

    public render(): JSX.Element {
        return (
            <Fabric className={styles}>
                <div className="header">
                    <Header onSettingsClick={this._showSettings} />
                </div>
                <div style={{ backgroundColor: this.state.theme.palette.white }} className="body">
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                    <div className="content">
                        <Content />
                    </div>
                    <Panel
                        style={{ top: "4em", bottom: "3em", left: "calc(100vw - 340px" }}
                        isLightDismiss={true}
                        onLightDismissClick={this._hideSettings}
                        headerText="Settings"
                        isOpen={this.state.showSettings}
                    >
                        <Toggle label="Dark theme" inlineLabel={true} onChange={changeTheme} />
                    </Panel>
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </Fabric>
        );
    }

    private _onThemeUpdate = (theme: ITheme) => {
        this.setState({ theme });
    }

    private _showSettings = () => {
        this.setState({
            showSettings: true,
        });
    }

    private _hideSettings = () => {
        this.setState({
            showSettings: false,
        });
    }
}
