import { SearchBox, Stack } from "office-ui-fabric-react";
import React, { Component } from "react";
import { IFile, IResource } from "../../services/fileService";
import { FileList } from "./FileList";
import { ResourceList } from "./ResourceList";
import { Ribbon} from "./Ribbon";
import "./Selection.css";

interface IProps {
    onSelectionChange?: (file: IFile, resource: IResource) => void;
    files: IFile[];
}

interface IState {
    selectedFile: IFile;
    filter: string;
}

export class Selection extends Component<IProps, IState> {
    public get files(): IFile[] {
        const { files } = this.props;
        const { filter } = this.state;
        if (!filter) {
            return files;
        }
        return files.filter((file) => file.resources.some(this.getFilterCondition(filter)));
    }

    public get resources(): IResource[] {
        const { selectedFile, filter } = this.state;
        if (!selectedFile) {
            return [];
        }
        if (!filter) {
            return selectedFile.resources;
        }
        return selectedFile.resources.filter(this.getFilterCondition(filter));
    }

    public constructor(props: IProps) {
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
                    <div className="ms-Grid-col ms-sm12 ms-xl6">
                        <Stack horizontal={true}>
                            <Ribbon text="Files" />
                            <FileList files={this.files} onActiveItemChanged={this.changeActiveFile} />
                        </Stack>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-xl6">
                        <Stack horizontal={true}>
                            <Ribbon text="Resources" />
                            <ResourceList resources={this.resources} onActiveItemChanged={this.changeActiveResource} />
                        </Stack>
                    </div>
                </div>
            </div>);
    }

    private changeActiveFile(item: IFile, index?: number, event?: React.FocusEvent<HTMLElement>): void {
        this.setState({
            selectedFile: item,
        });
    }

    private changeActiveResource(item: IResource, index?: number, event?: React.FocusEvent<HTMLElement>): void {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(this.state.selectedFile, item);
        }
    }

    private onSearch(event?: React.ChangeEvent<HTMLInputElement>, text?: string): void {
        this.setState({
            filter: text!,
        });
    }

    private getFilterCondition(filter: string): (resource: IResource) => boolean {
        return (resource: IResource) => {
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
