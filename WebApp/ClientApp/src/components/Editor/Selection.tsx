import { SearchBox, Stack } from "office-ui-fabric-react";
import React, { Component } from "react";
import { IFile, IResource } from "../../services/FileService";
import { Files } from "./Files";
import { Resources } from "./Resources";
import "./Selection.css";

interface IProps {
    onSelectionChange?: (file: IFile, resource: IResource) => void;
    files: IFile[];
}

interface IState {
    files: IFile[];
    selectedFile: IFile;
    filterText: string;
}

export class Selection extends Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.activeFileChanged = this.activeFileChanged.bind(this);
        this.activeResourceChanged = this.activeResourceChanged.bind(this);
        this.onSearch = this.onSearch.bind(this);

        this.state = {
            files: this.props.files,
            filterText: "",
            selectedFile: this.props.files[0],
        };

    }

    public render(): JSX.Element {
        const resources = this.state.selectedFile ? this.state.selectedFile.resources : [];

        return (
            <Stack verticalFill={true} className="selection" grow={1}>
                <SearchBox underlined={true} placeholder="Search" onChange={this.onSearch} />
                <Stack verticalFill={true} horizontal={true}>
                    <Files filterText={this.state.filterText} files={this.props.files} onActiveItemChanged={this.activeFileChanged} />
                    <Resources filterText={this.state.filterText} onActiveItemChanged={this.activeResourceChanged} resources={resources} />
                </Stack>
            </Stack>);
    }

    private activeFileChanged(item?: IFile, index?: number, ev?: React.FocusEvent<HTMLElement>): void {
        this.setState({
            selectedFile: item!,
        });
    }

    private activeResourceChanged(item?: IResource, index?: number, ev?: React.FocusEvent<HTMLElement>): void {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(this.state.selectedFile, item!);
        }
    }

    private onSearch(text: string): void {
        this.setState({
            filterText: text,
        });
    }
}
