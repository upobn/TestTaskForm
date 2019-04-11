import * as React from 'react';
import { InputFormFieldWrapper } from './field';

interface IInputFormSubmitProps {
    text?: string;
}

export class InputFormSubmit extends React.Component<IInputFormSubmitProps> {
    render() {
        const { text = "OK" } = this.props;

        return (
            <InputFormFieldWrapper>
                <button type="submit" className="btn btn-primary">{text}</button>
            </InputFormFieldWrapper>
        );
    }
}
