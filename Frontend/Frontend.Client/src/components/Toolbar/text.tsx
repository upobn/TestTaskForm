import * as React from 'react';

interface IToolbarTextProps {
    text: string;
}

export class ToolbarText extends React.Component<IToolbarTextProps> {
    render() {
        return (
            <label className="ml-2">{this.props.text}</label>
        );
    }
}
