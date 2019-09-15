import { DefaultPalette, IPersonaStyles, ITheme, Persona, PersonaSize } from "office-ui-fabric-react";
import React, { Component, Props } from "react";
import { LoginButton } from "./LoginButton";

interface Success {
    userName?: string;
    iconUrl?: string;
}

interface State {
    theme: ITheme;
}

export class User extends Component {

    public state: {
        logged: boolean;
        userName?: string;
        iconUrl?: string;
    };

    public constructor(props: Props<{}>) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);

        this.state = {
            logged: false,
        };
    }

    public log(message: unknown | string): void {
        // tslint:disable-next-line: no-console
        console.log(message);
    }

    public onSuccess(success: Success): void {
        this.log("login success");
        this.setState({
            iconUrl: success.iconUrl,
            logged: true,
            userName: success.userName,
        });
    }

    public onFailure(error: Error): void {
        this.log("login failure");
        this.log(error);
    }

    public render(): JSX.Element {
        const styles: Partial<IPersonaStyles> = {
            primaryText: {
                color: `${DefaultPalette.white} !important`,
            },
            root: {
                height: "4em", marginLeft: "1em",
            },
        };

        if (this.state.logged) {
            return (
                <Persona
                    text={this.state.userName}
                    imageUrl={this.state.iconUrl}
                    size={PersonaSize.size40}
                    styles={styles}
                />);
        }

        return (
            <LoginButton
                className="login-button"
                clientId="e08511dfe335afcbe2e0"
                onSuccess={this.onSuccess}
                onFailure={this.onFailure}
                redirectUri={`${document.location.origin}/login/oauth2/callback`}
            >
                Sign in with GitHub
            </LoginButton >
        );
    }

    private getToken(code: string) {
        return "";
    }
}
