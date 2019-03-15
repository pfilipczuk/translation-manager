import {
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    ScrollablePane,
    ScrollbarVisibility,
    SelectionMode,
    Stack,
    StackItem,
} from "office-ui-fabric-react";
import { DefaultPalette } from "office-ui-fabric-react";
import React, { Component, ReactNode } from "react";
import { IFile } from "../../services/FileService";
import Ribbon from "./Ribbon";

interface IProps {
    files: IFile[];
    filterText?: string;
    onActiveItemChanged?: (item?: any, index?: number, ev?: React.FocusEvent<HTMLElement>) => void;
}

export class Files extends Component<IProps> {
    private columns: IColumn[] = [{
        key: "name",
        name: "Name",
        fieldName: "name",
        minWidth: 50,
    }, {
        key: "modified",
        name: "Date Modified",
        fieldName: "modified",
        minWidth: 125,
    }, {
        key: "translated",
        name: "Translated",
        minWidth: 60,
        onRender: this.renderTranslated,
    }, {
        key: "fileSize",
        name: "File Size",
        minWidth: 50,
        onRender: this.renderFileSize,
    }];

    public constructor(props: IProps) {
        super(props);
        this.renderTranslated = this.renderTranslated.bind(this);
        this.renderFileSize = this.renderFileSize.bind(this);
        this.filterFiles = this.filterFiles.bind(this);
    }

    public render(): JSX.Element {
        const files = this.filterFiles();

        return (
            <Stack grow={1} horizontal={true} styles={{ root: { height: "calc( 100vh - 7em - 32px )" } }}>
                <Ribbon>
                    Files
                </Ribbon>
                <StackItem grow={1} styles={{ root: { position: "relative" } }}>
                    <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
                        <DetailsList
                            layoutMode={DetailsListLayoutMode.justified}
                            selectionMode={SelectionMode.none}
                            selectionPreservedOnEmptyClick={true}
                            items={files}
                            columns={this.columns}
                            onActiveItemChanged={this.props.onActiveItemChanged}
                        />
                    </ScrollablePane>
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
