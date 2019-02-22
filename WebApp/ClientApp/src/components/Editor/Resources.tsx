import { DetailsList, DetailsListLayoutMode, IColumn, ScrollablePane, ScrollbarVisibility, SelectionMode, IDetailsRowProps, Shimmer, Spinner } from "office-ui-fabric-react";
import React, { Component, ReactNode } from "react";
import { IResource } from "../services/FileService";
import { number } from "prop-types";

interface IProps {
    resources: IResource[];
}

export class Resources extends Component<IProps> {
    private columns: IColumn[] = [{
        fieldName: "key",
        key: "name",
        maxWidth: 100,
        minWidth: 50,
        name: "Name",
    }, {
        fieldName: "modified",
        isCollapsible: false,
        key: "modified",
        maxWidth: 100,
        minWidth: 50,
        name: "Modified",
    }, {
        fieldName: "modifiedBy",
        isCollapsible: false,
        key: "modifiedBy",
        maxWidth: 100,
        minWidth: 50,
        name: "Modified By",
    }];

    public constructor(props: IProps) {
        super(props);
    }

    public render(): ReactNode {
        return (
            <div className="resources">
                <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
                    <DetailsList
                        layoutMode={DetailsListLayoutMode.justified}
                        selectionMode={SelectionMode.single}
                        items={this.props.resources}
                        columns={this.columns}
                    />
                </ScrollablePane>
            </div>
        );
    }
}
