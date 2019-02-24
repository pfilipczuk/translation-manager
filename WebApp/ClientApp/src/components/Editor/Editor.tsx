import {
    CommandBar,
    DefaultFontStyles,
    ICommandBarItemProps,
    IStyle, ITextFieldProps,
    ITextFieldStyles,
    Label,
    Stack,
    StackItem,
    TextField,
} from "office-ui-fabric-react";
import React, { Component, ReactNode } from "react";
import { IResource } from "../../services/FileService";
import "./Editor.css";

interface IProps {
    resource: IResource;
    onEdit?: (translation: string) => void;
}

export class Editor extends Component<IProps> {

    public commands: ICommandBarItemProps[] = [];

    public state: {
        translation: string,
    };

    private editHistory: {
        [resourceKey: string]: {
            values: [],
            currentIndex: number,
        },
    };

    public constructor(props: IProps) {
        super(props);
        this.state = {
            translation: "",
        };

        this.commands = [{
            key: "undo",
            text: "Undo",
            iconProps: {
                iconName: "Undo",
            },
            onClick: this.undoClick,
        }, {
            key: "redo",
            text: "Redo",
            iconProps: {
                iconName: "Redo",
                title: "Redo",
            },
        }];

        this.editHistory = {};
    }

    public render(): ReactNode {
        const renderLabel = (props?: ITextFieldProps) => {
            return <Label styles={{ root: DefaultFontStyles.xLarge }}>{props!.label}</Label>;
        };
        const flexStyle: IStyle = {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
        };

        const styles: Partial<ITextFieldStyles> = {
            field: { ...flexStyle, ...DefaultFontStyles.large, lineHeight: "1.5em" },
            fieldGroup: { height: "100%" },
            root: { ...flexStyle, paddingBottom: "1em" },
            wrapper: flexStyle,
        };

        return (
            <Stack padding="0.2em 1em" verticalFill={true} grow={1}>
                <StackItem grow={1} disableShrink={true} align="stretch">
                    <Stack verticalFill={true}>
                        <TextField
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
                            onKeyDown={this.onKeyDown}
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

    private onChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (this.props.onEdit) {
            this.props.onEdit(newValue!);
        }
    }

    private undoClick = () => {

    }

    private redoClick = () => {

    }

    private onKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.ctrlKey) {
            if (event.key === "z") {
                event.preventDefault();
                this.undoClick();
            }
            if (event.key === "y") {
                event.preventDefault();
                this.redoClick();
            }
        }
    }
}
