import {
    ConstrainMode,
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    IDetailsHeaderProps,
    IRenderFunction,
    IStyle,
    ITheme,
    ScrollablePane,
    SelectionMode,
    Stack,
    StackItem,
    Sticky,
    StickyPositionType,
    styled,
} from "office-ui-fabric-react";
import { DefaultPalette } from "office-ui-fabric-react";
import React, { Component } from "react";
import { IFile, IResource } from "../../services/fileService";

interface IProps {
    theme?: ITheme;
    styles?: any;
    files: IFile[];
    onActiveItemChanged?: (item?: any, index?: number, ev?: React.FocusEvent<HTMLElement>) => void;
}

export class FileListBase extends Component<IProps> {
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
    }

    public render(): JSX.Element {
        const { theme } = this.props;
        const styles: IStyle = {
            position: "relative",
            selectors: {
                "::-webkit-scrollbar-thumb": { backgroundColor: theme!.palette.neutralLighter },
            },
        };

        return (
            <Stack grow={1} styles={{ root: { height: "calc( 100vh - 7em - 32px )" } }}>
                <StackItem grow={1} styles={{ root: styles }}>
                    <ScrollablePane>
                        <DetailsList
                            onRenderDetailsHeader={this.renderHeader}
                            constrainMode={ConstrainMode.horizontalConstrained}
                            layoutMode={DetailsListLayoutMode.justified}
                            selectionMode={SelectionMode.none}
                            selectionPreservedOnEmptyClick={true}
                            items={this.props.files}
                            columns={this.columns}
                            onActiveItemChanged={this.props.onActiveItemChanged}
                        />
                    </ScrollablePane>
                </StackItem>
            </Stack>);
    }

    private renderHeader(props?: IDetailsHeaderProps, defaultRender?: IRenderFunction<IDetailsHeaderProps>): JSX.Element {
        return (
            <Sticky stickyPosition={StickyPositionType.Header}>
                {defaultRender!(props)}
            </Sticky>
        );
    }

    private renderTranslated(file: IFile, index?: number, column?: IColumn): JSX.Element {
        let color;
        if (file.translatedCount === 0) {
            color = DefaultPalette.red;
        } else if (file.translatedCount === file.resxCount) {
            color = DefaultPalette.green;
        } else {
            color = DefaultPalette.yellow;
        }

        return (<span style={{ color }}>{`${file.translatedCount}/${file.resxCount}`}</span>);
    }

    private renderFileSize(file: IFile, index?: number, column?: IColumn): JSX.Element {
        return (<span>{`${file.fileSize / 1000} KB`}</span>);
    }
}

export const FileList = styled(FileListBase, {});
