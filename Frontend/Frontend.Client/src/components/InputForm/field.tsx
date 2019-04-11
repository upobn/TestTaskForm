import * as React from 'react';
import cn from 'classnames';

const css = require('./input-form.css');

export type InputFormFieldStyle = 'normal' | 'compact' | 'vertical';

export interface IInputFormFieldProps {
    label: string;
    error?: string;
    disabled?: boolean;
    readonly?: boolean;
    style?: InputFormFieldStyle;
}

export interface IInputFormFieldWrapperProps {
    label?: string;
    error?: string;
    style?: InputFormFieldStyle;
}

export class InputFormFieldWrapper extends React.Component<IInputFormFieldWrapperProps> {
    render() {
        const { label = '', error = null, children, style } = this.props;
        // title={error}
        if (style === 'compact') {
            return (
                <div className={cn('form-group', css.inputFormField, error && 'is-invalid')}>
                    <label className="col-sm-4 col-form-label">{label}</label>
                    <div className="col-sm-8">
                        {children}
                    </div>
                </div>
            );
        }

        if (style === 'vertical') {
            return (
                <div className={cn('form-group', css.inputFormField, error && 'is-invalid')}>
                    <label className="col-sm-12 col-form-label">{label}</label>
                    <div className="col-sm-12">
                        {children}
                    </div>
                </div>
            );
        }

        return (
            <div className={cn('form-group', css.inputFormField)}>
                <label className="col-sm-2 col-form-label">{label}</label>
                <div className="col-sm-4">
                    {children}
                </div>
                <div className="col-sm-6 text-danger">
                    {error}
                </div>
            </div>
        );
    }
}
