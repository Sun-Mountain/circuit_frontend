
import React from 'react';
import axios from 'axios';

import { Card } from 'antd';

class CircuitDetail extends React.Component {

    state = {
        circuit: {}
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get(`http://localhost:8000/api/${id}`)
            .then(res => {
                this.setState({
                    circuit: res.data
                });
                console.log(id)
            })
    }

    render() {
        return (
            <Card title={this.state.circuit.name}>
                <p>{this.state.circuit.description}</p>
            </Card>
        )
    }
}

export default CircuitDetail;