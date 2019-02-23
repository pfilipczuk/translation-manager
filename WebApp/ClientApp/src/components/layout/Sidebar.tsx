import { Label, SearchBox, Spinner } from "office-ui-fabric-react";
import React, { Component, Props } from "react";
import { getFiles, IFile } from "../../services/fileService";
import { Files } from "../Editor/Files";
import { Resources } from "../Editor/Resources";
import { IFileDto } from "./IFileDto";
import "./Sidebar.css";

interface IState {
    files: IFileDto[];
    selectedFileId: number;
    isLoading: boolean;
}

export class Sidebar extends Component<any, IState> {
    private allFiles: IFile[];

    public constructor(props: Props<{}>) {
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
            <div className="sidebar-container">
                <SearchBox underlined={true} placeholder="Search" onChange={this._onSearch} />
                <div className="navigation">
                    <Label
                        styles={{ root: { padding: "0.2em", writingMode: "tb-rl" } }}
                        className="ms-font-xl ms-fontColor-white ms-bgColor-themeSecondary"
                        children="Files"
                    />
                    {this.state.isLoading ? <Spinner /> : <Files files={this.state.files} onActiveItemChanged={this.activeFileChanged} />}
                    <Label
                        styles={{ root: { padding: "0.2em", writingMode: "tb-rl" } }}
                        className="ms-font-xl ms-fontColor-white ms-bgColor-themeSecondary"
                        children="Resources"
                    />
                    {this.state.isLoading ? <Spinner /> : <Resources resources={resources} />}
                </div>
            </div>);
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
