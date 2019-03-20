import React from 'react';
import axios from 'axios';

import Circuits from '../components/Circuits';
import CircuitForm from '../components/CircuitForm';

class CircuitList extends React.Component {
    
    constructor(props) {
        super(props)
            this.state = {
                circuitList: []
            }
    }

    componentDidMount() {
        // axios.get to call both apis
        axios.get('http://circuit-backend.herokuapp.com/api/')
        // separate them into their respective arrays
            .then(res => {
                this.setState({
                    circuitList: res.data
                })
                console.log(this.state);
            })
            // .then(refreshList())
    }

    render() {
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
                <Circuits data={this.state.circuitList} onChange={this.onChange} />
                </div>
            </div>
        )
    }
}

export default CircuitList;