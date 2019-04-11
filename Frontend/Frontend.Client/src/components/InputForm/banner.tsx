import * as React from 'react';
import { InputFormFieldWrapper } from './field';

export class InputFormBanner extends React.Component {
    render() {

        return (
            <InputFormFieldWrapper>
                {this.props.children}
            </InputFormFieldWrapper>
        );
    }
}
