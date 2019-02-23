import { initializeIcons, loadTheme, registerIcons } from "office-ui-fabric-react";
import "office-ui-fabric-react/dist/css/fabric.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ReactComponent as GitHubLogo } from "./icons/github.svg";
import registerServiceWorker from "./registerServiceWorker";
import "./styles/index.css";
import { LightTheme } from "./themes/themes";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href") as string;
const rootElement = document.getElementById("root");

loadTheme(LightTheme);

registerIcons({
    icons: {
        "github-svg": <GitHubLogo />,
    },
});

initializeIcons(process.env.PUBLIC_URL + "/fonts/");

registerServiceWorker();

const render = (Component: any) => ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <Component />
    </BrowserRouter>,
    rootElement);

render(App);

if (module.hot) {
    module.hot.accept("./App", () => {
        const NextApp = require("./App").default;
        render(NextApp);
    });
}
