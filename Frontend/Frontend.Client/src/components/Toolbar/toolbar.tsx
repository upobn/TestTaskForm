import * as React from 'react';

export class Toolbar extends React.Component {
    render() {
        return (
            <div className="btn-group mr-2">
                 {this.props.children}
            </div>
        );
    }
}
