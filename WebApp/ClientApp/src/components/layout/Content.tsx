import React, { Component } from "react";
import { Editor } from "../Editor/Editor";
import "./Content.css";

interface IState {
    showPanel: boolean;
}

export class Content extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            showPanel: true,
        };
    }
    public render(): JSX.Element {
        return (
            <div className="content-container">
                <Editor />
            </div>);
    }
}
