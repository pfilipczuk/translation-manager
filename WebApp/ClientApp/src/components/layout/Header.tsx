import {
    DefaultPalette, Stack, DefaultFontStyles, Label, IStyle,
} from "office-ui-fabric-react";
import React, { Component } from "react";
import SettingsButton from "../SettingsButton";
import { User } from "../User/User";

export class Header extends Component {
    constructor(props: {}) {
        super(props);
    }

    public render(): JSX.Element {
        const styles: IStyle = {
            backgroundColor: DefaultPalette.themeDarker, color: DefaultPalette.white,
            height: "100%",
        };

        return (
            <Stack horizontal={true} styles={{ root: styles }} horizontalAlign="space-between" verticalAlign="center">
                <Label styles={{ root: { ...DefaultFontStyles.xLarge, marginLeft: "0.5em", color: DefaultPalette.white } }}>
                    Translation Manager {process.env.REACT_APP_DEMO ? "(Demo)" : ""}
                </Label>
                <Stack horizontal={true} verticalFill={true}>
                    <SettingsButton />
                    <User />
                </Stack>
            </Stack>);
    }
}
