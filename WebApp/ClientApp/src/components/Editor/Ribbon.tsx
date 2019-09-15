import { ILabelStyles, IStyleFunctionOrObject, ITheme, Label, styled } from "office-ui-fabric-react";
import React, { Component } from "react";

interface Props {
    theme?: ITheme;
    styles?: IStyleFunctionOrObject<any, any>;
    text: string;
}

class RibbonBase extends Component<Props> {

    public render(): JSX.Element {
        const styles: Partial<ILabelStyles> = {
            root: {
                ...this.props.theme!.fonts.xLarge,
                backgroundColor: this.props.theme!.palette.neutralLight,
                writingMode: "tb-rl",
            },
        };

        return (
            <Label styles={styles}>
                {this.props.text}
            </Label>
        );
    }
}

export const Ribbon = styled(RibbonBase, {});
