import { Stack } from "office-ui-fabric-react";
import React, { Component } from "react";
import { getFiles, File, Resource } from "../../services/fileService";
import { Editor } from "../Editor/Editor";
import { Selection } from "../Editor/Selection";
import scrollToComponent from "react-scroll-to-component";

interface State {
    files: File[];
    selectedFile: File;
    selectedResource: Resource;
}

export class Content extends Component<any, State> {
    private allFiles: File[];
    private Editor?: HTMLDivElement | null;

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
                <div ref={(div) => { this.Editor = div }} className="ms-Grid-col ms-sm12 ms-xl6" style={{ height: "calc( 100vh - 7em )" }}>
                    <Editor resource={selectedResource} onEdit={this.onTranslationChange} />
                </div>
            </>
        );
    }

    private onSelectionChange = (file: File, resource: Resource) => {
        const selectedFile = this.allFiles[this.allFiles.indexOf(file)];
        const selectedResource = selectedFile.resources[selectedFile.resources.indexOf(resource)];
        if (this.state.selectedResource !== selectedResource) {
            scrollToComponent(this.Editor)
        }
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
