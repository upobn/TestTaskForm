import * as React from 'react';

export class ToolbarContainer extends React.Component {
    render() {
        return (
            <div className="btn-toolbar mb-2 mb-md-0">
                {this.props.children}
            </div>
        );
    }
}
