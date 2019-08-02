import {
    ConstrainMode,
    DefaultPalette, DetailsList,
    DetailsListLayoutMode,
    getInitials,
    IColumn,
    ISelection,
    Persona,
    PersonaInitialsColor,
    PersonaSize,
    ScrollablePane,
    ScrollbarVisibility,
    Selection,
    SelectionMode,
    Stack,
    StackItem,
} from "office-ui-fabric-react";
import React, { Component } from "react";
import { IResource } from "../../services/fileService";
import Ribbon from "./Ribbon";

interface IProps {
    resources: IResource[];
    filterText?: string;
    onActiveItemChanged?: (item?: any, index?: number, ev?: React.FocusEvent<HTMLElement>) => void;
}

interface IState {
    selectedResource: IResource;
}

export class Resources extends Component<IProps, IState> {

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

        this.state = {
            selectedResource: this.props.resources[0],
        };
    }

    public render(): JSX.Element {
        const resources = this.filterResources();

        return (
            <Stack grow={1} horizontal={true} styles={{ root: { height: "calc( 100vh - 7em - 32px )" } }}>
                <Ribbon>
                    Resources
                </Ribbon>
                <StackItem grow={1} styles={{ root: { position: "relative" } }}>
                    <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
                        <DetailsList
                            constrainMode={ConstrainMode.horizontalConstrained}
                            layoutMode={DetailsListLayoutMode.justified}
                            selectionMode={SelectionMode.none}
                            selectionPreservedOnEmptyClick={true}
                            items={resources}
                            columns={this.columns}
                            onActiveItemChanged={this.onSelectionChange}
                        />
                    </ScrollablePane>
                </StackItem>
            </Stack>
        );
    }

    private onRenderResource(resource: IResource, index?: number, column?: IColumn) {
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

    private onSelectionChange = (resource?: IResource): void => {
        this.setState({
            selectedResource: resource!,
        });
        if (this.props.onActiveItemChanged) {
            this.props.onActiveItemChanged(resource);
        }
    }
}
