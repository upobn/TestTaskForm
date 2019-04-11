import * as React from 'react';
import cn from 'classnames';
import { IInputFormFieldProps, InputFormFieldWrapper } from './field';

export interface IInputFormTextProps extends IInputFormFieldProps {
    value?: string;
    large?: boolean;
    className?: string;

    validate?: (value?: string | any | null) => string | null;
    change?: (value: string) => void;
}

interface IInputFormTextState {
    value?: string;
    error?: string | null;
}

export class InputFormText extends React.Component<IInputFormTextProps, IInputFormTextState> {
    public static Required: (value: string) => string | null = (value: string): string | null => {
        return !(value && value.trim()) ? 'Поле не может быть пустым' : null;
    };

    constructor(props: any) {
        super(props);

        const { value, validate = null } = props;
        const error = validate && validate(value);

        this.state = { value, error };

        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(newProps: IInputFormTextProps) {
        const { value, validate } = newProps;
        const error = validate && validate(value);

        this.setState({ ... this.state, value, error });
    }

    componentWillUpdate(nextProps: Readonly<IInputFormTextProps>) {
        if (nextProps !== this.props) {
            const { value, validate } = nextProps;
            const error = validate && validate(value);

            this.setState({ ... this.state, value, error });
        }
    }

    render() {
        const { label, readonly = false, disabled = false, style, large = false, className } = this.props;
        const { value } = this.state;
        const error = this.state.error || this.props.error;

        return (
            <InputFormFieldWrapper label={label} error={error} style={style}>
                {!large && (
                    <input type="text" className={cn('form-control', error ? 'is-invalid' : null, className)}
                        value={value}
                        readOnly={readonly}
                        disabled={disabled}
                        autoComplete="none"
                        onChange={this.onChange}
                    />
                )}
                {large && (
                    <textarea className={cn('form-control', error ? 'is-invalid' : null, className)}
                        value={value}
                        readOnly={readonly}
                        disabled={disabled}
                        autoComplete="none"
                        rows={25}
                        onChange={this.onChange}
                    />
                )}
            </InputFormFieldWrapper>
        );
    }

    onChange(e: any) {
        const value = e.target.value;
        const { change = null, validate } = this.props;
        const error = validate && validate(value);
        if(change) {
            change(value);
        }
        this.setState({ ... this.state, value, error });
    }
}
