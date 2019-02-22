import {
    Button as ActionButton, getTheme, IButtonProps,
    IButtonStyles, ITheme, registerOnThemeChangeCallback, removeOnThemeChangeCallback,
} from "office-ui-fabric-react";
import React, { Component, ReactNode } from "react";
import { ISuccess, PopupWindow } from "./PopupWindow";
import { toQuery } from "./Utils";

interface IProps {
    clientId: string;
    scope: string;
    redirectUri: string;
    onRequest: () => void;
    onSuccess: (success: { userName?: string, iconUrl?: string }) => void;
    onFailure: (error: Error) => void;
}

interface IState {
    theme: ITheme;
}

export class LoginButton extends Component<IProps & IButtonProps, IState> {
    public static defaultProps = {
        onFailure: () => { },
        onRequest: () => { },
        onSuccess: () => { },
        scope: "user:email",
    };

    constructor(props: IProps) {
        super(props);
        this.onBtnClick = this.onBtnClick.bind(this);

        if (process.env.REACT_APP_DEMO) {
            this.onBtnClick = () => {
                this.props.onSuccess({ userName: "Demo User", iconUrl: process.env.PUBLIC_URL + "photo.jpg" });
            };
        }

        this.state = {
            theme: getTheme(),
        };
    }

    public componentDidMount() {
        registerOnThemeChangeCallback(this.onThemeChange);
    }

    public componentWillUnmount() {
        removeOnThemeChangeCallback(this.onThemeChange);
    }

    public onBtnClick() {
        const { clientId, scope, redirectUri } = this.props;
        const search = toQuery({
            client_id: clientId,
            redirect_uri: redirectUri,
            scope,
        });
        const popup = PopupWindow.open(
            "github-oauth-authorize",
            `https://github.com/login/oauth/authorize?${search}`,
            { height: 1000, width: 600 },
        );

        this.onRequest();
        popup.then(this.onSuccess, this.onFailure);
    }

    public onRequest = () => {
        this.props.onRequest();
    }

    public onSuccess = (data: ISuccess) => {
        if (!data.code) {
            return this.onFailure(new Error("'code' not found"));
        }

        this.props.onSuccess({});
    }

    public onFailure = (error: Error) => {
        this.props.onFailure(error);
    }

    public render(): ReactNode {
        const { className, children } = this.props;
        const attrs: React.ButtonHTMLAttributes<HTMLButtonElement> = { onClick: this.onBtnClick };

        if (className) {
            attrs.className = className;
        }

        const styles: IButtonStyles = {
            icon: {
                fill: this.state.theme.palette.white,
                height: "2em",
                marginRight: "1em",
                width: "2em",
            },
            iconPressed: { fill: this.state.theme.palette.black },
            label: {
                color: this.state.theme.palette.white,
            },
            root: {
                backgroundColor: this.state.theme.palette.black,
                borderWidth: 0,
                color: this.state.theme.palette.white,
                height: "100%",
            },
            rootHovered: {
                backgroundColor: this.state.theme.palette.blackTranslucent40,
                color: this.state.theme.palette.white,
            },
        };

        return (
            <ActionButton {...attrs} styles={styles} iconProps={{ iconName: "github-svg" }}>
                <span>Sign in with GitHub</span>
            </ActionButton>
        );
    }

    private onThemeChange(theme: ITheme): any {
        this.setState({ theme });
    }
}
