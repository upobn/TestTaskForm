import * as React from 'react';

export interface IInputFormGroupProps {
    label: string;
}

export class InputFormGroup extends React.Component<IInputFormGroupProps> {
    render() {
        const { label, children } = this.props;

        return (
            <div>
                <strong>{label}</strong>
                <div>
                    {children}
                </div>
            </div>
        );
    }
}
