import * as React from 'react';
import * as ui from '..';
import * as fa from '../icons';
import cn from 'classnames'

export interface IToolbarDropdownProps {
    options: any[];
    selected: any;
    namePrefix?: string;
    title?: string;
    optionName: (item: any) => string;
    selectedOptionName?: (item: any) => string;
    onSelect?: (item: any) => void;
    emptyOption?: string;
    searchable?: boolean;
    inProgress?: boolean;
    error?: string;
}

interface IToolbarDropdownState {
    selected: any;
    filter: string;
    filteredOptions: any[];
    options: any[];
}

export class ToolbarDropdown extends React.Component<IToolbarDropdownProps, IToolbarDropdownState> {
    constructor(props: IToolbarDropdownProps) {
        super(props);
        this.state = {
            selected: props.selected,
            filter: '',
            filteredOptions: props.options,
            options: props.options,
        };
    }

    componentWillReceiveProps(nextProps: Readonly<IToolbarDropdownProps>) {
        if (nextProps.selected !== this.state.selected ||
            nextProps.options !== this.state.options) {
            this.setState({
                ...this.state,
                selected: nextProps.selected,
                options: nextProps.options,
                filteredOptions: this.executeFilter(nextProps.options)
            });
        }
    }

   

    render() {
        const { selected, filteredOptions, filter } = this.state;
        const { title, namePrefix, optionName, emptyOption, searchable, inProgress, error } = this.props;
        // , css.dropdown
        if (inProgress) {
            return (
                <div className={cn('form-inline')}>  
                    <div className="dropdown">
                        <button className="btn btn-outline-primary" type="button" onClick={this.onClickPreventDefault} style={{ pointerEvents: 'none' }} >
                            <ui.Spinner />
                        </button>
                    </div>
                </div>
            );
        }
       
        const selectedOptionName = this.props.selectedOptionName || this.props.optionName;
        const buttonText = selected
            ? (<span> <span className="dropdownLabel">{namePrefix || ''}</span> {selectedOptionName(selected)}</span>)
            : (<span> <span className="dropdownLabel">{namePrefix || ''}</span> {emptyOption || selectedOptionName(null)}</span>);

        return (
            <div className={cn('form-inline', "dropdown")} title={title}>
                <div className="dropdown">
                    <button className={cn('btn', error ? 'btn-outline-danger' : 'btn-outline-primary')} type="button" data-toggle="dropdown" title={error}>
                        {buttonText} <fa.CaretDown />
                    </button>
                    <div className="dropdown-menu">
                        {
                            searchable && (
                                <form onSubmit={this.onClickPreventDefault}>
                                    <input type="text" className="form-control" placeholder="Поиск..." value={filter} onChange={this.onChangeFilter} />
                                </form>
                            )
                        }
                        <div className={cn('dropdownList')}>
                            {
                                emptyOption && !filter && (
                                    <a key={-1} className="dropdown-item" href="#" onClick={this.onClickPreventDefault}>{emptyOption}</a>
                                )
                            }
                            {
                                filteredOptions.map((item, i) => (
                                    <a key={i} className="dropdown-item" href="#" onClick={this.onClickPreventDefault}>{optionName(item)}</a>
                                ))
                            }
                            {
                                filteredOptions.length === 0 && (
                                    <p className="text-secondary">
                                        Нет элементов для отображения
                                    </p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onChangeFilter(e: any){
        this.setFilter(e.target.value);
    }

    onClickPreventDefault(e: any){
        e.preventDefault(); 
    }

    private setFilter(filter: string) {
        this.setState({ ...this.state, filter, filteredOptions: this.executeFilter() });
    }

    private executeFilter(options?: any[]): any[] {
        let { filter } = this.state;
        filter = (filter || '').trim();

        options = options || this.state.options;

        if (!filter || !this.props.searchable) {
            return options;
        } else {
            const r = new RegExp(filter, 'i');
            const { optionName } = this.props;

            return options.filter((option) => r.test(optionName(option)));
        }
    }

    // private selectOption(option: any) {
    //     this.setState({ ...this.state, selected: option });
    // }
}
