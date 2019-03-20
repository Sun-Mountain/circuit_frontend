import React from 'react';
import { Link } from 'react-router-dom';

class CustomLayout extends React.Component {
    render() {
        return (
            <div>
                <header>
                        <Link to="/">Home</Link>
                </header>
                <main>
                    <div>
                        {this.props.children}
                    </div>
                </main>
                <footer>
                    <div className="credits">
                        By NPZ
                    </div>
                </footer>
            </div>
        );
    }
}

export default CustomLayout;