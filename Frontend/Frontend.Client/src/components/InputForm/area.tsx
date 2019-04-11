import * as React from 'react';

export class InputFormArea extends React.Component {
    render() {
        const { children } = this.props;

        return (
            <fieldset>
                <hr />
                {children}
            </fieldset>
        );
    }
}
