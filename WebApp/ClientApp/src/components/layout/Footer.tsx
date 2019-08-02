import { getTheme, IStyle, ITheme, registerOnThemeChangeCallback, removeOnThemeChangeCallback, Stack } from "office-ui-fabric-react";
import React, { Component } from "react";

interface IState {
    theme: ITheme;
}

export class Footer extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);

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

    public onThemeChange(theme: ITheme) {
        this.setState({ theme });
    }

    public render(): JSX.Element {
        const styles: IStyle = {
            backgroundColor: this.state.theme.palette.purpleDark,
            color: this.state.theme.palette.white,
        };

        return (
            <Stack grow={1} verticalAlign="center" horizontalAlign="center" styles={{root: styles}}>
                <span className="ms-font-m">Translation Manager 2019 - Pavlo Filipchuk</span>
            </Stack>);
    }
}
