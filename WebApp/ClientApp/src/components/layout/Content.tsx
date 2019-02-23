import { Stack } from "office-ui-fabric-react";
import React, { Component } from "react";
import { IResource } from "../../services/FileService";
import { Editor } from "../Editor/Editor";
import { IFileDto } from "../Editor/IFileDto";
import { Selection } from "../Editor/Selection";

interface IState {
    file: IFileDto;
    resource: IResource;
}

export class Content extends Component<any, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            file: {} as IFileDto,
            resource: { editor: "", key: "", source: "", translation: ""},
        };
    }

    public render(): JSX.Element {
        return (
            <Stack horizontal={true} grow={1}>
                    <Selection onSelectionChange={this.onSelectionChange} />
                    <Editor resource={this.state.resource}/>
            </Stack>);
    }

    private onSelectionChange = (file: IFileDto, resource: IResource) => {
        this.setState({
            file,
            resource,
        });
    }
}
