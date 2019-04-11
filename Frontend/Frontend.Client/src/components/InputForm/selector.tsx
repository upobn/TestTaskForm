import * as React from 'react';
import cn from 'classnames';
import { IInputFormFieldProps, InputFormFieldWrapper } from './field';
// const css = require('./input-form.scss');

export interface IInputFormSelectorProps extends IInputFormFieldProps {
    items: any[];
    value: any;

    validate: (value: any) => string | null;
    itemName?: (item: any) => string;
    change?: (value: any) => void;
}

interface IInputFormSelectorState {
    items: any[];
    value: any;
    error: string | null;
}

export class InputFormSelector extends React.Component<IInputFormSelectorProps, IInputFormSelectorState> {
    constructor(props: any) {
        super(props);

        const { value, items = [], validate = null } = props;
        const error = validate && validate(value);

        this.state = { value, error, items };
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(newProps: IInputFormSelectorProps) {
        const { value, items = [], validate } = newProps;
        this.setState({ ... this.state, value, items, error: validate(value) });
    }

    componentWillUpdate(nextProps: Readonly<IInputFormSelectorProps>) {
        if (nextProps !== this.props) {
            const { value, items = [], validate } = nextProps;
            this.setState({ ... this.state, value, items, error: validate(value) });
        }
    }

    render() {
        const {
            label,
            readonly = false,
            disabled = false,
            itemName = (item: any) => item,
            style
        } = this.props;

        const { value, items } = this.state;
        const error = this.state.error || this.props.error;

        let i = items.findIndex((x)=> x === value);
        if(i < 0 && value) {
            i = items.findIndex((x)=> x.id === value.id);
        }

        return (
            <InputFormFieldWrapper label={label} error={error} style={style}>
                <select className={cn('form-control', error ? 'is-invalid' : null)}
                    disabled={disabled || readonly}
                    value={i}
                    onChange={this.onChange}>
                    {<option selected={true} value={undefined}>--- Не выбрано ---</option>}
                    {items.map((item, ii) => <option key={ii} value={ii}>{itemName(item) || item}</option>)}
                </select>
            </InputFormFieldWrapper>
        );
    }

    onChange(e: any) {
        const raw = e.target.value;
        const i = parseInt(raw as string, undefined);
        const value = this.props.items[i];

        const { change = null, validate = null } = this.props;
        const error = validate && validate(value);
        if(change) {change(value);}
        this.setState({ ... this.state, value, error });
    }
}
