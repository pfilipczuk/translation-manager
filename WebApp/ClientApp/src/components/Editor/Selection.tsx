import { SearchBox, Spinner, Stack } from "office-ui-fabric-react";
import React, { Component } from "react";
import { getFiles, IFile, IResource } from "../../services/FileService";
import { Files } from "./Files";
import { IFileDto } from "./IFileDto";
import { Resources } from "./Resources";
import "./Selection.css";

interface IProps {
    onSelectionChange?: (file: IFileDto, resource: IResource) => void;
}

interface IState {
    files: IFileDto[];
    selectedFileId: number;
    isLoading: boolean;
}

export class Selection extends Component<IProps, IState> {
    private allFiles: IFile[];

    public constructor(props: IProps) {
        super(props);
        this.activeFileChanged = this.activeFileChanged.bind(this);
        this._filterFiles = this._filterFiles.bind(this);
        this._onSearch = this._onSearch.bind(this);

        this.allFiles = [];
        this.state = {
            files: [],
            isLoading: true,
            selectedFileId: 0,
        };

    }

    public activeFileChanged(item?: IFileDto, index?: number, ev?: React.FocusEvent<HTMLElement>): void {
        this.setState({
            selectedFileId: item!.id,
        });
    }

    public async componentDidMount(): Promise<void> {
        this.allFiles = await getFiles();
        this.setState({
            files: await this._filterFiles(""),
            isLoading: false,
        });
    }

    public render(): JSX.Element {
        const resources = this.state.files.length === 0 ? [] : this.allFiles[this.state.selectedFileId].resources;

        return (
            <Stack verticalFill={true} className="selection" grow={1}>
                <SearchBox underlined={true} placeholder="Search" onChange={this._onSearch} />
                <Stack verticalFill={true} horizontal={true}>
                    {this.state.isLoading ? <Spinner /> : <Files files={this.state.files} onActiveItemChanged={this.activeFileChanged} />}
                    {this.state.isLoading ? <Spinner /> : <Resources resources={resources} />}
                </Stack>
            </Stack>);
    }

    private _filterFiles(text: string): Promise<IFileDto[]> {
        return new Promise((resolve) => {
            const files = this.allFiles.filter((file) =>
                file.name.indexOf(text) !== -1 ||
                file.resources.some((resource) => {
                    if (resource.source.indexOf(text) !== -1) {
                        return true;
                    }
                    if (resource.translation && resource.translation.indexOf(text) !== -1) {
                        return true;
                    }
                    return false;
                }));
            resolve(files.map((file) => ({
                fileSize: file.fileSize,
                id: file.id,
                modified: file.modified,
                name: file.name,
                resources: [],
                resxCount: file.resxCount,
                translatedCount: file.translatedCount,
            })));
        });
    }

    private async _onSearch(text: string): Promise<void> {
        const files = await this._filterFiles(text);
        this.setState({
            files,
            isLoading: false,
        });
    }
}
