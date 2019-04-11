import * as React from 'react';
// import cn from 'classnames';
import * as ui from '..';
import { IInputFormFieldProps } from './field';

export interface IInputFormIntegerProps extends IInputFormFieldProps {
    value: number;

    validate?: (value?: number | any | null) => string | null;
    change?: (value: number) => void;
}

interface IInputFormIntegerState {
    value: number;
    error: string | null;
}

export class InputFormInteger extends React.Component<IInputFormIntegerProps, IInputFormIntegerState> {
    constructor(props: any) {
        super(props);

        const { value, validate = null } = props;
        const error = validate && validate(value);

        this.state = { value: value && value.toString(), error };

    }


    componentWillReceiveProps(newProps: IInputFormIntegerProps) {
        const { value, validate = null } = newProps;
        const error = validate && validate(value);


        this.setState({ ... this.state, value, error });
    }

    render() {
        const onValidate = (str: string | number): string | null => {
            if (!str && str !== 0) {
                return 'Значение не может быть пустым';
            }

            const num = parseInt(str as string, undefined);
            if (!isFinite(num)) {
                return 'Введенное значение не является числом';
            }

            if (!Number.isInteger(num)) {
                return 'Введенное число не является целым';
            }

            const { validate } = this.props;
            if (validate) {
                const e = validate(num);
                if (e) {
                    return e;
                }
            }

            return null;
        };

        const onChange = (str: string): void => {
            str = str && str.trim();
            if (str) {
                const num = parseInt(str as string, undefined);
                if (isFinite(num)) {
                    if (Number.isInteger(num) && this.props.change) {
                        this.props.change(num);
                    }
                }
            }
        };

        const { label, style } = this.props;
        const { value } = this.state;
        const error = this.state.error || this.props.error;

        return (
            <ui.InputFormText
                label={label}
                style={style}
                value={value.toString()}
                error={error}
                validate={onValidate}
                change={onChange} />
        );
    }
}
