import * as React from 'react';
import * as fa from '../icons';
import cn from 'classnames'

export interface IToolbarSearchProps {
    query?: string;
    onSearch?: (query: string) => void;
}

interface IToolbarSearchState {
    query?: string;
    isValid: boolean;
}

export class ToolbarSearch extends React.Component<IToolbarSearchProps, IToolbarSearchState> {
    constructor(props: IToolbarSearchProps) {
        super(props);
        this.state = { query: props.query || '', isValid: true };
    }

    componentWillReceiveProps(nextProps: Readonly<IToolbarSearchProps>) {
        if (nextProps.query !== this.state.query) {
            this.setState({ ...this.state, query: nextProps.query, isValid: true });
        }
    }

    render() {
        const { query, isValid } = this.state;
        const { onSearch } = this.props;

        const onSubmit = (e: any) => {
            e.preventDefault();
            if (!query) {
                this.setState({ ...this.state, isValid: false });
                return;
            }

            this.setState({ ...this.state, isValid: true });

            if (onSearch) {
                onSearch(query);
            }
        };

        const onChange = (e: any) => {
            this.setState({ ...this.state, query: e.target.value, isValid: true });
        };

        const onBlur = () => {
            if (!isValid) {
                this.setState({ ...this.state, isValid: true });
            }
        };

        const onClear = () => {
            this.setState({ ...this.state, query: '', isValid: true });

            if (onSearch) {
                onSearch('');
            }
        };


        return (
            <form onSubmit={onSubmit} className={cn('form-inline', 'searchBox')}>
                <div className="input-group">
                    <input type="text"
                        className={cn('form-control', !isValid ? 'is-invalid' : null)}
                        placeholder="Поиск..."
                        value={query || ''}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    <span className="input-group-btn">
                        <button className={cn('btn', isValid ? 'btn-outline-primary' : 'btn-outline-danger border-danger')}
                            type="button"
                            onClick={onClear}
                            disabled={!query}>
                            <fa.Times />
                        </button>
                        <button className={cn('btn', isValid ? 'btn-outline-primary' : 'btn-outline-danger border-danger')} type="submit">
                            <fa.Search />
                        </button>
                    </span>
                </div>
            </form>
        );
    }
}
