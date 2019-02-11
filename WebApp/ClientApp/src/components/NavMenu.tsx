import "./NavMenu.css";
import { CommandBar, ICommandBarItemProps } from "office-ui-fabric-react";
import React, { Component, Props } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";


export class NavMenu extends Component {
    public static displayName = NavMenu.name;

    public state: { collapsed: boolean };

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
                key: value.key,
                text: value.text,
                onClick: () => history.push(value.href)
            }
        });
    }

    constructor(props: Props<NavMenu>) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
        };
    }

    public toggleNavbar(): void {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    public render(): JSX.Element {
        const Nav = withRouter(({ history }) => <CommandBar items={this.getItems(history)}></CommandBar>);
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">TranslationManager</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
                <Nav />
            </header>
        );
    }
}
