import { SearchBox, Stack } from "office-ui-fabric-react";
import React, { Component } from "react";
import { File, Resource } from "../../services/fileService";
import { FileList } from "./FileList";
import { ResourceList } from "./ResourceList";
import { Ribbon } from "./Ribbon";
import "./Selection.css";
import scrollToComponent from "react-scroll-to-component";

interface Props {
    onSelectionChange?: (file: File, resource: Resource) => void;
    files: File[];
}

interface State {
    selectedFile: File;
    filter: string;
}

export class Selection extends Component<Props, State> {
    private Files?: HTMLDivElement | null;
    private Resources?: HTMLDivElement | null;

    public get files(): File[] {
        const { files } = this.props;
        const { filter } = this.state;
        if (!filter) {
            return files;
        }
        return files.filter((file) => file.resources.some(this.getFilterCondition(filter)));
    }

    public get resources(): Resource[] {
        const { selectedFile, filter } = this.state;
        if (!selectedFile) {
            return [];
        }
        if (!filter) {
            return selectedFile.resources;
        }
        return selectedFile.resources.filter(this.getFilterCondition(filter));
    }

    public constructor(props: Props) {
        super(props);
        this.changeActiveFile = this.changeActiveFile.bind(this);
        this.changeActiveResource = this.changeActiveResource.bind(this);
        this.onSearch = this.onSearch.bind(this);

        this.state = {
            filter: "",
            selectedFile: this.props.files[0],
        };
    }

    public render(): JSX.Element {
        return (
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12">
                        <SearchBox underlined={true} placeholder="Search" onChange={this.onSearch} />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div ref={(div) => { this.Files = div }} className="ms-Grid-col ms-sm12 ms-xl6">
                        <Stack horizontal={true}>
                            <Ribbon text="Files" />
                            <FileList files={this.files} onActiveItemChanged={this.changeActiveFile} />
                        </Stack>
                    </div>
                    <div ref={(div) => { this.Resources = div }} className="ms-Grid-col ms-sm12 ms-xl6">
                        <Stack horizontal={true}>
                            <Ribbon text="Resources" />
                            <ResourceList resources={this.resources} onActiveItemChanged={this.changeActiveResource} />
                        </Stack>
                    </div>
                </div>
            </div>);
    }

    private changeActiveFile(item: File, index?: number, event?: React.FocusEvent<HTMLElement>): void {
        this.setState({
            selectedFile: item,
        });
        scrollToComponent(this.Resources);
    }

    private changeActiveResource(item: Resource, index?: number, event?: React.FocusEvent<HTMLElement>): void {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(this.state.selectedFile, item);
        }
    }

    private onSearch(event?: React.ChangeEvent<HTMLInputElement>, text?: string): void {
        this.setState({
            filter: text!,
        });
    }

    private getFilterCondition(filter: string): (resource: Resource) => boolean {
        return (resource: Resource) => {
            if (resource.source.indexOf(filter) >= 0) {
                return true;
            }
            if (resource.translation && resource.translation.indexOf(filter) >= 0) {
                return true;
            }
            return false;
        };
    }
}
