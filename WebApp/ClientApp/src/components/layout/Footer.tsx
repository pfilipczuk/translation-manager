import { IStyle, ITheme, Stack, styled, DefaultPalette } from "office-ui-fabric-react";
import React, { Component } from "react";

interface Props {
    theme?: ITheme;
    styles?: any;
}

export class Footer extends Component<Props> {

    public render(): JSX.Element {
        const styles: IStyle = {
            backgroundColor: this.props.theme!.palette.purpleDark,
            color: this.props.theme!.palette.white,
            height: "100%",
        };

        return (
            <Stack grow={1} verticalAlign="center" horizontalAlign="center" styles={{ root: styles }}>
                <span style={{ color: DefaultPalette.white }} className="ms-font-m">Translation Manager 2019 - Pavlo Filipchuk</span>
            </Stack>);
    }
}

export default styled(Footer, {});
