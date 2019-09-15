import { CommandBar, ICommandBarItemProps } from "office-ui-fabric-react";
import React, { Component } from "react";

interface Props {
    onUndo: () => void;
    onRedo: () => void;
    undoDisabled: boolean;
    redoDisabled: boolean;
}

export class EditorCommands extends Component<Props> {
    public render(): JSX.Element {
        const commands: ICommandBarItemProps[] = [{
            key: "undo",
            text: "Undo",
            iconProps: {
                iconName: "Undo",
            },
            onClick: this.props.onUndo,
            disabled: this.props.undoDisabled,
        }, {
            key: "redo",
            text: "Redo",
            iconProps: {
                iconName: "Redo",
                title: "Redo",
            },
            onClick: this.props.onRedo,
            disabled: this.props.redoDisabled,
        }];

        return <CommandBar items={commands} />;
    }
}
