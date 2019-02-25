import { Stack } from "office-ui-fabric-react";
import React, { Component } from "react";
import { getFiles, IFile, IResource } from "../../services/FileService";
import { Editor } from "../Editor/Editor";
import { Selection } from "../Editor/Selection";

interface IState {
    files: IFile[];
    selectedFile: IFile;
    selectedResource: IResource;
}

export class Content extends Component<any, IState> {
    private allFiles: IFile[];

    constructor(props: any) {
        super(props);
        this.allFiles = [];
        this.state = {
            files: [],
            selectedFile: { id: 0, name: "", resources: [], modified: "", fileSize: 0, resxCount: 0, translatedCount: 0 },
            selectedResource: { key: "", source: "", translation: "", editor: ""},
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
                    <Editor resource={this.state.selectedResource} onEdit={this.onTranslationChange} />
            </Stack>);
    }

    private onSelectionChange = (file: IFile, resource: IResource) => {
        const selectedFile = this.allFiles[this.allFiles.indexOf(file)];
        const selectedResource = selectedFile.resources[selectedFile.resources.indexOf(resource)];
        this.setState({
            selectedFile,
            selectedResource,
        });
    }

    private onTranslationChange = (translation: string) => {
        this.state.selectedResource.translation = translation;
        this.setState({});
    }
}
