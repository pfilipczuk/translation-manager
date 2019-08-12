import { Fabric, IStyle, IStyleFunctionOrObject, ITheme, mergeStyles, styled } from "office-ui-fabric-react";
import React, { Component } from "react";
import { Content, Footer, Header } from "./components/layout/index";
import "./styles/App.css";

interface IProps {
    theme?: ITheme;
    styles?: IStyleFunctionOrObject<any, any>;
}

export class App extends Component<IProps> {
    public static displayName = App.name;

    public render(): JSX.Element {
        const styles = { backgroundColor: this.props.theme!.palette.white };

        return (
            <Fabric className="ms-Grid" dir="ltr" style={styles}>
                <div className="ms-Grid-row header">
                    <Header />
                </div>
                <div className="ms-Grid-row body">
                    <Content />
                </div>
                <div className="ms-Grid-row footer">
                    <Footer />
                </div>
            </Fabric>
        );
    }
}

export default styled(App, {});
