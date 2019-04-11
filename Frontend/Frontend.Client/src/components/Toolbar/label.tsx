import * as React from 'react';

export interface IToolbarLabelProps {
    text: string;
    title?: string;
}

export class ToolbarLabel extends React.Component<IToolbarLabelProps> {
    render() {
        return (
            <label className="mr-sm-2" title={this.props.title}>{this.props.text}</label>
        );
    }
}
