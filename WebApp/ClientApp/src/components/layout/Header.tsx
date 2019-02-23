import {
    DefaultPalette, Stack, DefaultFontStyles, Label,
} from "office-ui-fabric-react";
import React, { Component } from "react";
import SettingsButton from "../SettingsButton";
import { User } from "../User/User";

export class Header extends Component {
    constructor(props: {}) {
        super(props);
    }

    public render(): JSX.Element {
        const style: React.CSSProperties = {
            backgroundColor: DefaultPalette.themeDarker, color: DefaultPalette.white,
        };

        return (
            <Stack horizontal={true} grow={1} style={style} horizontalAlign="space-between" verticalAlign="center">
                <Label styles={{ root: { ...DefaultFontStyles.xLarge, marginLeft: "0.5em", color: DefaultPalette.white } }}>
                    Translation Manager {process.env.REACT_APP_DEMO ? "(Demo)" : ""}
                </Label>
                <div style={{ height: "100%", display: "flex" }}>
                    <SettingsButton />
                    <User />
                </div>
            </Stack>);
    }
}
