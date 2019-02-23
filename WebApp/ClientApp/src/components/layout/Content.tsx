import { Stack } from "office-ui-fabric-react";
import React, { Component } from "react";
import { IFile, IResource, getFiles } from "../../services/FileService";
import { Editor } from "../Editor/Editor";
import { IFileDto } from "../Editor/IFileDto";
import { Selection } from "../Editor/Selection";

interface IState {
    files: IFile[];
    resource: IResource;
}

export class Content extends Component<any, IState> {
    private allFiles: IFile[];

    constructor(props: any) {
        super(props);
        this.allFiles = [];
        this.state = {
            files: [],
            resource: { editor: "", key: "", source: "", translation: ""},
        };
    }

    public async componentDidMount(): Promise<void> {
        this.allFiles = await getFiles();
        this.setState({
            files: this.allFiles,
        });
    }

    public render(): JSX.Element {
        return (
            <Stack horizontal={true} grow={1}>
                    <Selection files={this.state.files} onSelectionChange={this.onSelectionChange} />
                    <Editor onEdit={this.onTranslation} resource={this.state.resource}/>
            </Stack>);
    }

    private onSelectionChange = (file: IFile, resource: IResource) => {
        this.setState({
            resource,
        });
    }

    private onTranslation = (translation: string) => {
        this.setState((prev) => ({
            resource: {
                ...prev.resource,
                translation,
            },
        }));
    }
}
