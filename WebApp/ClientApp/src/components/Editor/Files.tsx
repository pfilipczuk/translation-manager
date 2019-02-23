import {
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    Label,
    ScrollablePane,
    ScrollbarVisibility,
    SelectionMode,
    Stack,
    StackItem,
} from "office-ui-fabric-react";
import { DefaultPalette } from "office-ui-fabric-react";
import React, { Component, ReactNode } from "react";
import { IFile } from "../../services/FileService";

interface IProps {
    files: IFile[];
    onActiveItemChanged?: (item?: any, index?: number, ev?: React.FocusEvent<HTMLElement>) => void;
    filterText?: string;
}

export class Files extends Component<IProps> {
    private columns: IColumn[] = [{
        fieldName: "name",
        key: "name",
        minWidth: 50,
        name: "Name",
    }, {
        fieldName: "modified",
        key: "modified",
        minWidth: 125,
        name: "Date Modified",
    }, {
        key: "translated",
        minWidth: 60,
        name: "Translated",
        onRender: this.renderTranslated,
    }, {
        key: "fileSize",
        minWidth: 50,
        name: "File Size",
        onRender: this.renderFileSize,
    }];

    public constructor(props: IProps) {
        super(props);
        this.renderTranslated = this.renderTranslated.bind(this);
        this.renderFileSize = this.renderFileSize.bind(this);
        this.filterFiles = this.filterFiles.bind(this);
    }

    public render(): ReactNode {
        return (
            <Stack horizontal={true}>
                <Label
                    styles={{ root: { writingMode: "tb-rl" } }}
                    className="ms-font-xl ms-fontColor-white ms-bgColor-themeSecondary"
                    children="Files"
                />
                <StackItem grow={1} styles={{ root: { overflowY: "auto" } }}>
                    {/* <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}> */}
                    <DetailsList
                        layoutMode={DetailsListLayoutMode.justified}
                        selectionMode={SelectionMode.none}
                        items={this.filterFiles()}
                        columns={this.columns}
                        onActiveItemChanged={this.props.onActiveItemChanged}
                    />
                    {/* </ScrollablePane> */}
                </StackItem>
            </Stack>);
    }

    private renderTranslated(item: IFile, index?: number, column?: IColumn): JSX.Element {
        let color;
        if (item.translatedCount === 0) {
            color = DefaultPalette.red;
        } else if (item.translatedCount === item.resxCount) {
            color = DefaultPalette.green;
        } else {
            color = DefaultPalette.yellow;
        }

        return (<span style={{ color }}>{`${item.translatedCount}/${item.resxCount}`}</span>);
    }

    private renderFileSize(item: IFile, index?: number, column?: IColumn): JSX.Element {
        return (<span>{`${item.fileSize / 1000} KB`}</span>);
    }

    private filterFiles() {
        if (this.props.filterText) {
            return this.props.files.filter((file) => {
                if (file.name.indexOf(this.props.filterText!) !== -1) {
                    return true;
                }
                const hasResources = file.resources.some((resource) => {
                    if (resource.source.indexOf(this.props.filterText!) !== -1) {
                        return true;
                    }
                    if (resource.translation && resource.translation.indexOf(this.props.filterText!) !== -1) {
                        return true;
                    }
                    return false;
                });
                return hasResources;
            });
        }
        return this.props.files;
    }
}
