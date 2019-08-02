import { Fabric, IStyleFunctionOrObject, ITheme, mergeStyles, styled } from "office-ui-fabric-react";
import React, { Component } from "react";
import { Content, Footer, Header } from "./components/layout/index";
import "./styles/App.css";

const flex = mergeStyles({
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
});

interface IProps {
    theme?: ITheme;
    styles?: IStyleFunctionOrObject<any, any>;
}

export class App extends Component<IProps> {
    public static displayName = App.name;

    public render(): JSX.Element {
        const styles = { backgroundColor: this.props.theme!.palette.white };

        return (
            <Fabric className={flex}>
                <div className="header">
                    <Header />
                </div>
                <div className="body" style={styles}>
                        <Content />
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </Fabric>
        );
    }
}

export default styled(App, {});
