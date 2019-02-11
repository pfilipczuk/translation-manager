import { PrimaryButton } from "office-ui-fabric-react";
import React, { Component, Props } from "react";

export class Counter extends Component {
    public static displayName = Counter.name;

    public state: { currentCount: number };

    constructor(props: Props<Counter>) {
        super(props);
        this.state = { currentCount: 0 };
        this.incrementCounter = this.incrementCounter.bind(this);
    }

    public incrementCounter(): void {
        this.setState({
            currentCount: this.state.currentCount + 1,
        });
    }

    public render(): JSX.Element {
        return (
            <div>
                <h1>Counter</h1>

                <p>This is a simple example of a React component.</p>

                <p>Current count: <strong>{this.state.currentCount}</strong></p>
                <PrimaryButton onClick={this.incrementCounter}>Increment</PrimaryButton>
            </div>
        );
    }
}
