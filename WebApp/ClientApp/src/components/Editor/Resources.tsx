import {
    DefaultPalette,
    DetailsList, DetailsListLayoutMode,
    getInitials,
    IColumn,
    Persona,
    PersonaInitialsColor,
    PersonaSize,
    ScrollablePane,
    ScrollbarVisibility,
    SelectionMode,
    Stack,
    StackItem,
} from "office-ui-fabric-react";
import React, { Component } from "react";
import { IResource } from "../../services/FileService";
import Ribbon from "./Ribbon";
interface IProps {
    resources: IResource[];
    onActiveItemChanged?: (item?: any, index?: number, ev?: React.FocusEvent<HTMLElement>) => void;
    filterText?: string;
}

export class Resources extends Component<IProps> {
    private columns: IColumn[] = [{
        key: "name",
        name: "Name",
        fieldName: "key",
        minWidth: 50,
        maxWidth: 300,
        isResizable: true,
        onRender: this.onRenderResource,
    }, {
        key: "editor",
        name: "Modified By",
        fieldName: "editor",
        minWidth: 100,
        maxWidth: 150,
    }];

    public constructor(props: IProps) {
        super(props);
        this.filterResources = this.filterResources.bind(this);
        this.onRenderResource = this.onRenderResource.bind(this);
    }

    public render(): JSX.Element {
        const resources = this.filterResources();

        return (
            <Stack grow={1} horizontal={true}>
                <Ribbon>
                    Resources
                </Ribbon>
                <StackItem grow={1} styles={{ root: { position: "relative" } }}>
                    <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
                        <DetailsList
                            layoutMode={DetailsListLayoutMode.justified}
                            selectionMode={SelectionMode.none}
                            selectionPreservedOnEmptyClick={true}
                            items={resources}
                            columns={this.columns}
                            onActiveItemChanged={this.props.onActiveItemChanged}
                        />
                    </ScrollablePane>
                </StackItem>
            </Stack>
        );
    }

    private onRenderResource(resource: IResource) {
        return (
            <Persona
                imageInitials={getInitials(resource.editor, false)}
                initialsColor={PersonaInitialsColor.violet}
                coinProps={{ styles: { initials: { color: DefaultPalette.white } } }}
                size={PersonaSize.size40}
                text={resource.key}
                secondaryText={resource.translation || resource.source}
            />);
    }

    private filterResources(): IResource[] {
        if (this.props.filterText) {
            return this.props.resources.filter((resource) => {
                if (resource.source.indexOf(this.props.filterText!) !== -1) {
                    return true;
                }
                if (resource.translation && resource.translation.indexOf(this.props.filterText!) !== -1) {
                    return true;
                }
                return false;
            });
        }
        return this.props.resources;
    }
}
