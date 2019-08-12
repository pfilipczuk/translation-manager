import { IStyle, ITheme, Stack, styled } from "office-ui-fabric-react";
import React, { Component } from "react";

interface IProps {
    theme?: ITheme;
    styles?: any;
}

export class Footer extends Component<IProps> {

    public render(): JSX.Element {
        const styles: IStyle = {
            backgroundColor: this.props.theme!.palette.purpleDark,
            color: this.props.theme!.palette.white,
            height: "100%",
        };

        return (
<<<<<<< HEAD
            <Stack verticalAlign="center" horizontalAlign="center" styles={{ root: styles }}>
                <span className="ms-font-m">Translation Manager 2019 - made by Pavlo Filipchuk</span>
=======
            <Stack grow={1} verticalAlign="center" horizontalAlign="center" styles={{root: styles}}>
                <span className="ms-font-m">Translation Manager 2019 - Pavlo Filipchuk</span>
>>>>>>> 75184d3a5fd3d626d60149e33406dfa560ad8ac4
            </Stack>);
    }
}

export default styled(Footer, {});
