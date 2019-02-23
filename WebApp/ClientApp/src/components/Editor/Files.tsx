import {
    ActivityItem,
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    ScrollablePane,
    ScrollbarVisibility,
    SelectionMode } from "office-ui-fabric-react";
import React, { Component, Props, ReactNode } from "react";
import { IFile } from "../../services/fileService";
import { IFileDto } from "../layout/IFileDto";

interface IProps {
    files: IFileDto[];
    onActiveItemChanged?: (item?: IFileDto, index?: number, ev?: React.FocusEvent<HTMLElement>) => void;
}

export class Files extends Component<IProps> {
    private columns: IColumn[] = [{
        fieldName: "name",
        key: "name",
        maxWidth: 100,
        minWidth: 50,
        name: "Name",
    }, {
        fieldName: "doneRatio",
        isCollapsible: false,
        key: "doneRatio",
        maxWidth: 100,
        minWidth: 50,
        name: "Translated",
    }];

    public constructor(props: IProps) {
        super(props);
        this.onRenderItem = this.onRenderItem.bind(this);
    }

    public render(): ReactNode {
        return (
            <div className="files">
                <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
                    <DetailsList
                        layoutMode={DetailsListLayoutMode.justified}
                        selectionMode={SelectionMode.single}
                        items={this.props.files}
                        columns={this.columns}
                        onActiveItemChanged={this.props.onActiveItemChanged}
                    />
                </ScrollablePane>
            </div>);
    }

    private onRenderItem(item: IFile, index?: number, isScrolling?: boolean): ReactNode {
        return (
            <ActivityItem
                key={index}
                activityDescription={[<span key={1}>{item.name}</span>]}
                // timeStamp={`Edited by ${item.modifiedBy} just now`}
            />
        );
    }
}
