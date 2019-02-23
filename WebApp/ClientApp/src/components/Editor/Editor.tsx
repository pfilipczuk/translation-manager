import { CommandBar, ICommandBarItemProps, IStyle, ITextFieldProps, Label, Stack, StackItem, TextField } from "office-ui-fabric-react";
import React, { Component, ReactNode } from "react";
import { IResource } from "../../services/FileService";
import "./Editor.css";

interface IProps {
    resource: IResource;
    onEdit?: (translation: string) => void;
}

export class Editor extends Component<IProps> {
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
        translation: string,
    };

    public constructor(props: IProps) {
        super(props);
        this.state = {
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

        const styles = {
            field: flexStyle,
            fieldGroup: { height: "100%" },
            root: { ...flexStyle, paddingBottom: "1em" },
            wrapper: flexStyle,
        };

        return (
            <Stack padding="0.2em 1em" verticalFill={true} grow={1}>
                <StackItem grow={1} disableShrink={true} align="stretch">
                    <Stack verticalFill={true}>
                        <TextField
                            inputClassName="ms-font-xl"
                            styles={styles}
                            label="Source"
                            resizable={false}
                            onRenderLabel={renderLabel}
                            multiline={true}
                            disabled={true}
                            value={this.props.resource.source}
                        />
                    </Stack>
                </StackItem>
                <StackItem grow={3}>
                    <Stack verticalFill={true}>
                        <CommandBar items={this.commands} />
                        <TextField
                            inputClassName="ms-font-xl"
                            styles={styles}
                            resizable={false}
                            label="Translation"
                            onRenderLabel={renderLabel}
                            multiline={true}
                            value={this.props.resource.translation}
                            onChange={this.onChange}
                        />
                    </Stack>
                </StackItem>
            </Stack>
        );
    }

    private onChange = (event: any, newValue?: string) => {
        if (this.props.onEdit) {
            this.props.onEdit(newValue!);
        }
    }
}
