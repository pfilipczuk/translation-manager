import { ITheme, Persona, PersonaSize } from "office-ui-fabric-react";
import React, { Component, Props } from "react";
// import "./Auth.css";
import { LoginButton } from "./LoginButton";

interface ISuccess {
    userName?: string;
    iconUrl?: string;
}

interface IState {
    theme: ITheme;
}

export class Auth extends Component {

    public state: {
        logged: boolean,
        userName?: string,
        iconUrl?: string,
    };

    public constructor(props: Props<{}>) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);

        this.state = {
            logged: false,
        };
    }

    public log(message: any | string): void {
        // tslint:disable-next-line: no-console
        console.log(message);
    }

    public onSuccess(success: ISuccess): void {
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
        if (this.state.logged) {
            return (
                <Persona
                    text={this.state.userName}
                    imageUrl={this.state.iconUrl}
                    size={PersonaSize.size40}
                    styles={{primaryText: "ms-fontColor-white ms-fontColor-white--hover"}}
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
            </LoginButton>
        );
    }

    private getToken(code: string) {
        return "";
    }
}
