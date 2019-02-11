import "./NavBar.css";
import React, { Component } from "react";
import { SearchBox, ICommandBarItemProps, CommandBar } from "office-ui-fabric-react";
import { withRouter } from "react-router";

export default class NavBar extends Component {

    private items: ICommandBarItemProps[] = [{
        key: "Home",
        text: "Home",
        href: "/",
    }, {
        key: "Counter",
        text: "Counter",
        href: "/counter",
    }, {
        key: "FetchData",
        text: "Fetch data",
        href: "/fetch-data"
    },
    ];

    private getItems(history: any): ICommandBarItemProps[] {
        return this.items.map<ICommandBarItemProps>((value) => {
            return {
                buttonStyles: {
                    label: "ms-fontColor-white",
                    textContainer: { backgroundColor: "transparent" }
                },
                key: value.key,
                text: value.text,
                onClick: () => history.push(value.href)
            }
        });
    }

    public render(): JSX.Element {
        const Logo = withRouter(({ history }) => <div onClick={() => history.push("/")} className="ms-font-xl" style={{ cursor: "pointer" }}>
            <strong>Translation Manager</strong>
        </div>);
        const Nav = withRouter(({ history }) => <CommandBar className="nav-bar" items={[]} farItems={this.getItems(history)}></CommandBar>);

        return <div className="NavBar ms-bgColor-themePrimary ms-fontColor-white">
            <Logo />
            <div>
                <Nav />
                <div className="search-box">
                    <SearchBox labelText="Search" />
                </div>
            </div>
        </div>
    }
}