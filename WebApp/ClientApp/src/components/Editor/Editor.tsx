import { CommandBar, ICommandBarItemProps, ITextFieldProps, Stack, TextField, Label, StackItem, IStyle } from "office-ui-fabric-react";
import React, { Component, Props, ReactNode } from "react";
import "./Editor.css";

export class Editor extends Component {
    public commands: ICommandBarItemProps[] = [{
        iconProps: {
            iconName: "Undo",
        },
        key: "undo",
        text: "Undo",
    }, {
        iconProps: {
            iconName: "Redo",
            title: "Redo",
        },
        key: "redo",
        text: "Redo",
    }];

    public state: {
        source: string,
        translation: string,
    };

    public constructor(props: Props<{}>) {
        super(props);
        this.state = {
            // tslint:disable-next-line: max-line-length
            source: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            // tslint:disable-next-line: max-line-length
            translation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        };
    }

    public render(): ReactNode {
        const renderLabel = (props?: ITextFieldProps) => {
            return <Label className="ms-font-xl">{props!.label}</Label>;
        };
        const flexStyle: IStyle = {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
        };

        return (
            <Stack padding="0.2em 1em" verticalFill={true} style={{ flexGrow: 1 }}>
                <StackItem grow={1} disableShrink={true} align="stretch">
                    <Stack verticalFill={true}>
                        <TextField
                            inputClassName="ms-font-xl"
                            styles={{ root: { ...flexStyle, paddingBottom: "1em" }, wrapper: flexStyle, fieldGroup: { height: "100%" }, field: flexStyle }}
                            // styles={{ field: { height: "13em" } }}
                            label="Source"
                            resizable={false}
                            onRenderLabel={renderLabel}
                            multiline={true}
                            disabled={true}
                            value={this.state.source}
                        />
                    </Stack>
                </StackItem>
                <StackItem grow={3}>
                    <Stack verticalFill={true}>
                        <CommandBar items={this.commands} />
                        <TextField
                            inputClassName="ms-font-xl"
                            styles={{ root: { ...flexStyle, paddingBottom: "1em" }, wrapper: flexStyle, fieldGroup: { height: "100%" }, field: flexStyle }}
                            // styles={{ field: { height: "15em" } }}
                            resizable={false}
                            label="Translation"
                            onRenderLabel={renderLabel}
                            multiline={true}
                            value={this.state.translation}
                        />
                    </Stack>
                </StackItem>
            </Stack>
        );
    }
}
