import React from 'react';

import Circuits from '../components/Circuits';
import CircuitForm from '../components/CircuitForm';

class CircuitList extends React.Component {
    render() {
        const { circuits } = this.props;
        return (
            <div className="list-view-container">
                <div className="circuit-form-wrapper form-style">
                <h2>Create A Circuit</h2>
                <CircuitForm 
                    requestType="post"
                    circuitID={null}
                    btnText="Create" />
                </div>
                <div>
                <Circuits data={circuits} />
                </div>
            </div>
        )
    }
}

export default CircuitList;