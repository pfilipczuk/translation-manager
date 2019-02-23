import {
    DefaultPalette,
    DetailsList,
    DetailsListLayoutMode, getInitials,
    IColumn,
    Label,
    Persona,
    PersonaInitialsColor,
    PersonaSize,
    ScrollablePane,
    ScrollbarVisibility,
    SelectionMode,
    Stack,
    StackItem,
} from "office-ui-fabric-react";
import React, { Component, ReactNode } from "react";
import { IResource } from "../../services/FileService";

interface IProps {
    resources: IResource[];
    onActiveItemChanged?: (item?: any, index?: number, ev?: React.FocusEvent<HTMLElement>) => void;
    filterText?: string;
}

export class Resources extends Component<IProps> {
    private columns: IColumn[] = [{
        fieldName: "key",
        key: "name",
        isResizable: true,
        maxWidth: 300,
        minWidth: 50,
        name: "Name",
        onRender: this.onRenderResource,
    }, {
        fieldName: "editor",
        key: "editor",
        maxWidth: 150,
        minWidth: 100,
        name: "Modified By",
    }];

    public constructor(props: IProps) {
        super(props);
        this.filterResources = this.filterResources.bind(this);
        this.onRenderResource = this.onRenderResource.bind(this);
    }

    public render(): ReactNode {
        return (
            <Stack grow={1} verticalFill={true} horizontal={true}>
                <Label
                    styles={{ root: { writingMode: "tb-rl" } }}
                    className="ms-font-xl ms-fontColor-white ms-bgColor-themeSecondary"
                    children="Resources"
                />
                <StackItem grow={1} verticalFill={true} styles={{ root: { position: "relative" } }}>
                    <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
                        <DetailsList
                            layoutMode={DetailsListLayoutMode.justified}
                            selectionMode={SelectionMode.none}
                            items={this.filterResources()}
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
                secondaryText={resource.source}
            />);
    }

    private filterResources() {
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
