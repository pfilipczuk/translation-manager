import { CommandBar, ICommandBarItemProps, SearchBox } from "office-ui-fabric-react";
import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";

class NavBar extends Component<RouteComponentProps> {

    private items: ICommandBarItemProps[] = [{
        buttonStyles: {
            label: "ms-fontColor-white",
            // root: { backgroundColor: "transparent" },
            // rootPressed: { backgroundColor: "ms-bgColor-themeTertiary"},
            // rootHovered: { backgroundColor: "ms-bgColor-themeSecondary" },
            // rootFocused: { outline: "0px" }
        },
        key: "Home",
        onClick: () => this.props.history.push("/"),
        text: "Home",
    }, {
        key: "Counter",
        onClick: () => this.props.history.push("/counter"),
        text: "Counter",
    }, {
        key: "FetchData",
        onClick: () => this.props.history.push("/fetch-data"),
        text: "Fetch data",
    }];

    public constructor(props: RouteComponentProps) {
        super(props);
    }

    public render(): JSX.Element {
        const items = this.items;

        return (
            <div style={{ display: "flex" }}>
                <CommandBar className="nav-bar" items={items} />
                <div className="search-box">
                    <SearchBox placeholder="Search" />
                </div>
            </div>);
    }
}

export default withRouter(NavBar);
