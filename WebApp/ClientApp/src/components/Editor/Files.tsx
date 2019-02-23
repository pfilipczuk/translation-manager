import {
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    ScrollablePane,
    ScrollbarVisibility,
    SelectionMode,
    Label,
    Stack,
    StackItem,
} from "office-ui-fabric-react";
import { DefaultPalette } from "office-ui-fabric-react";
import React, { Component, ReactNode } from "react";
import { IFileDto } from "./IFileDto";

interface IProps {
    files: IFileDto[];
    onActiveItemChanged?: (item?: IFileDto, index?: number, ev?: React.FocusEvent<HTMLElement>) => void;
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
                        items={this.props.files}
                        columns={this.columns}
                        onActiveItemChanged={this.props.onActiveItemChanged}
                    />
                    {/* </ScrollablePane> */}
                </StackItem>
            </Stack>);
    }

    private renderTranslated(item: IFileDto, index?: number, column?: IColumn): JSX.Element {
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

    private renderFileSize(item: IFileDto, index?: number, column?: IColumn): JSX.Element {
        return (<span>{`${item.fileSize / 1000} KB`}</span>);
    }
}
