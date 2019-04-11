import * as React from 'react';
import { Link } from 'react-router-dom';
import { LocationDescriptor } from 'history';

export interface ISidebarLink {
    to: LocationDescriptor;
    text: string;
    icon?: React.ReactNode;
    description?: string;
}


export interface ISidebarProps {
    links: ISidebarLink[]
}

class Sidebar extends React.Component<ISidebarProps> {

    render() {
        return (
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">

                        {
                            this.props.links.map((link, i) =>
                                (<li key={i} className="nav-item">
                                    <Link to={link.to} className="nav-link">{link.text}</Link>
                                </li>))
                        }

                    </ul>
                </div>
            </nav>
        );
    };
}

export default Sidebar;