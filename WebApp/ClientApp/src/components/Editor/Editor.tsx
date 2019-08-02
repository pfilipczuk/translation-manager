import {
    CommandBar,
    DefaultFontStyles,
    ICommandBar,
    ICommandBarItemProps, IStyle,
    ITextFieldProps,
    ITextFieldStyles,
    Label,
    Stack,
    StackItem,
    TextField,
} from "office-ui-fabric-react";
import React, { Component, ReactNode, RefObject } from "react";
import { IResource } from "../../services/fileService";
import "./Editor.css";
import { EditorCommands } from "./EditorCommands";

interface IProps {
    resource: IResource;
    onEdit?: (translation: string) => void;
}

interface IState {
    enableUndo: boolean;
    enableRedo: boolean;
}

export class Editor extends Component<IProps, IState> {

    private commands: ICommandBarItemProps[];

    private editHistory: {
        [resourceKey: string]: {
            values: string[],
            currentIndex: number,
        },
    };

    public constructor(props: IProps) {
        super(props);
        this.state = {
            enableRedo: false,
            enableUndo: false,
        };
        this.editHistory = {};
        this.commands = [];
    }

    public render(): JSX.Element {
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

        const history = this.editHistory[this.props.resource.key];

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
                        <EditorCommands
                            undoDisabled={!history || history.currentIndex === 0}
                            redoDisabled={!history || history.currentIndex === history.values.length - 1}
                            onUndo={this.undoClick}
                            onRedo={this.redoClick}
                        />
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
        if (!this.editHistory[this.props.resource.key]) {
            this.editHistory[this.props.resource.key] = {
                values: [this.props.resource.translation!],
                currentIndex: 0,
            };
        }
        const history = this.editHistory[this.props.resource.key];
        history.currentIndex++;
        history.values.splice(history.currentIndex, history.values.length - history.currentIndex);
        history.values.push(newValue!);

        this.setState({
            enableUndo: true,
        });

        if (this.props.onEdit) {
            this.props.onEdit(newValue!);
        }
    }

    private undoClick = () => {
        const history = this.editHistory[this.props.resource.key];
        if (history.currentIndex === 0) {
            return;
        }

        history.currentIndex--;
        this.props.resource.translation = history.values[history.currentIndex];
        this.setState({
            enableUndo: history.currentIndex !== 0,
        });
    }

    private redoClick = () => {
        const history = this.editHistory[this.props.resource.key];
        if (history.currentIndex === history.values.length - 1) {
            return;
        }
        history.currentIndex++;
        this.props.resource.translation = history.values[history.currentIndex];
        this.setState({
            enableRedo: history.currentIndex !== history.values.length - 1,
        });
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
