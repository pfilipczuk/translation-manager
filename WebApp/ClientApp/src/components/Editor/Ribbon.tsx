import { ILabelStyles, IStyleFunctionOrObject, ITheme, Label, styled } from "office-ui-fabric-react";
import React, { Component, Props, ReactNode } from "react";

interface IProps {
    theme?: ITheme;
    styles?: IStyleFunctionOrObject<any, any>;
    children?: ReactNode;
}

export class Ribbon extends Component<IProps> {
    public constructor(props: IProps) {
        super(props);
    }

    public render(): JSX.Element {
        const styles: Partial<ILabelStyles> = {
            root: {
                ...this.props.theme!.fonts.xLarge,
                backgroundColor: this.props.theme!.palette.neutralLight,
                writingMode: "tb-rl",
            },
        } ;

        return (
            <Label styles={styles}>
                {this.props.children}
            </Label>
        );
    }
}

export default styled(Ribbon, {});
