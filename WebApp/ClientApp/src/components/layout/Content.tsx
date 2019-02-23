import { Stack } from "office-ui-fabric-react";
import React, { Component } from "react";
import { IResource } from "../../services/FileService";
import { Editor } from "../Editor/Editor";
import { Selection } from "../Editor/Selection";

interface IState {
    resource: IResource;
}

export class Content extends Component<any, IState> {
    public render(): JSX.Element {
        return (
            <Stack horizontal={true} grow={1}>
                    <Selection onSelectionChange={this.onResourceChanged} />
                    <Editor resource={this.state.resource}/>
            </Stack>);
    }

    private onResourceChanged = (resource: IResource) => {
        this.setState({
            resource,
        });
    }
}
