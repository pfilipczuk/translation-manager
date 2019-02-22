import { Fabric, getTheme, ITheme, mergeStyles, Panel, registerOnThemeChangeCallback, Toggle, LayerHost } from "office-ui-fabric-react";
import React, { Component } from "react";
import { Content, Footer, Header, Sidebar } from "./components/layout/index";
import { loadThemeDark, loadThemeLight } from "./components/services/Themes";
// import {mergeStyleSets} fr
import "./styles/App.css";

const styles = mergeStyles({
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
});

const changeTheme = (event: any, checked?: boolean) => checked ? loadThemeDark() : loadThemeLight();

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
                    {/* <LayerHost id="settingsHost"/> */}
                    <Panel
                        // style={{position: "relative"}}
                        // layerProps={{hostId: "settingsHost"}}
                        isLightDismiss={true}
                        onLightDismissClick={this._hideSettings}
                        isBlocking={false}
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
