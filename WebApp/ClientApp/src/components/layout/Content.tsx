import { Stack } from "office-ui-fabric-react";
import React, { Component } from "react";
import { getFiles, IFile, IResource } from "../../services/fileService";
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
            selectedResource: { key: "", source: "", translation: "", editor: "" },
        };
    }

    public async componentDidMount(): Promise<void> {
        this.allFiles = await getFiles();
        this.setState({
            files: this.allFiles,
        });
    }

    public render(): JSX.Element {
        const { files, selectedResource } = this.state;
        return (
            <>
                <div className="ms-Grid-col ms-sm12 ms-xl6">
                    <Selection files={files} onSelectionChange={this.onSelectionChange} />
                </div>
                <div className="ms-Grid-col ms-sm12 ms-xl6" style={{ height: "calc( 100vh - 7em )" }}>
                    <Editor resource={selectedResource} onEdit={this.onTranslationChange} />
                </div>
            </>
        );
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
        const { selectedResource } = this.state;
        selectedResource.translation = translation;
    }
}
