import * as React from 'react';
import { InputFormFieldWrapper } from './field';

interface IInputFormPreProps {
    label?: string;
    text: string;
}

export class InputFormPre extends React.Component<IInputFormPreProps> {
    render() {
        const { label, text } = this.props;

        return (
            <InputFormFieldWrapper label={label}>
                <pre><code>{text}</code></pre>
            </InputFormFieldWrapper>
        );
    }
}
