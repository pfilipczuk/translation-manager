import {
    DefaultPalette,
    IButtonStyles,
    IconButton,
    IStyleFunctionOrObject,
    ITheme,
    loadTheme,
    Panel,
    styled,
    Toggle,
} from "office-ui-fabric-react";
import React, { Component } from "react";
import { DarkTheme, LightTheme } from "../themes/themes";

interface IState {
    showSettings: boolean;
    isDarkTheme: boolean;
}

interface IProps {
    theme?: ITheme;
    styles?: IStyleFunctionOrObject<any, any>;
}

export class SettingsButton extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isDarkTheme: false,
            showSettings: false,
        };
    }

    public render(): JSX.Element {
        const styles: IButtonStyles = {
            icon: {
                color: this.state.showSettings ? this.props.theme!.palette.themeDarker : DefaultPalette.white,
                fontSize: this.props.theme!.fonts.xLarge.fontSize,
            },
            root: {
                backgroundColor: this.state.showSettings ? this.props.theme!.palette.neutralLighter : "transparent",
                height: "4em", width: "4em",
            },
            rootHovered: !this.state.showSettings ? { backgroundColor: this.props.theme!.palette.themeDark } : undefined,
        };

        return (
            <div>
                <IconButton onClick={this.showSettings} styles={styles} iconProps={{ iconName: "Settings" }} />
                <Panel
                    style={{ top: "4em", bottom: "3em", left: "calc(100vw - 340px" }}
                    isLightDismiss={true}
                    onDismiss={this.hideSettings}
                    headerText="Settings"
                    isOpen={this.state.showSettings}
                >
                    <Toggle defaultChecked={this.state.isDarkTheme} label="Dark theme" inlineLabel={true} onChange={this.changeTheme} />
                </Panel>
            </div>
        );
    }

    private showSettings = () => {
        this.setState({
            showSettings: true,
        });
    }

    private hideSettings = () => {
        this.setState({
            showSettings: false,
        });
    }

    private changeTheme = (_: any, checked?: boolean) => {
        if (checked) {
            loadTheme(DarkTheme);
        } else {
            loadTheme(LightTheme);
        }
        this.setState({
            isDarkTheme: !!checked,
        });
    }
}

export default styled(SettingsButton, (props: any) => { });
