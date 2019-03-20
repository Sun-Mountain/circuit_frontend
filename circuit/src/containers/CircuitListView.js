import React from 'react';
import axios from 'axios';
import Circuits from '../components/Circuits';

class CircuitList extends React.Component {
    
    state = {
        circuitList: []
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/')
            .then(res => {
                this.setState({
                    circuitList: res.data
                });
                console.log(res.data)
            })
    }

    render() {
        return (
            <Circuits data={this.state.circuitList} />
        )
    }
}

export default CircuitList;