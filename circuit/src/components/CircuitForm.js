import React from 'react';
import { Form, Input, Button, } from 'antd';

import axios from 'axios';

class CircuitForm extends React.Component {

    handleFormSubmit = (event, requestType, circuitID) => {
        const name = event.target.elements.name.value;
        const description = event.target.elements.description.value;

        var newCircuit = {
            name: name,
            description: description
        }

        console.log(name, description)

        switch ( requestType ) {

        case 'post':
            return axios.post('http://localhost:8000/api/create/', newCircuit)
            .then((res) => {console.log(newCircuit);
            
            let circuit = [...this.state.newCircuit]
            circuit.push(newCircuit)
            this.setState({circuit})})
            .catch(error => console.log(error));
        case 'put':
            return axios.put(`http://localhost:8000/api/${circuitID}/update/`, {
                name: name,
                description: description
            })
            .then(res => console.log(res))
            .catch(error => console.log(error));
        }
    }

    render() {
        return (
        <div className="list-form-container">
            <Form onSubmit={
                (event) => this.handleFormSubmit(
                    event,
                    this.props.requestType,
                    this.props.circuitID ) } >
            <Form.Item label="Circuit Name"  className="label">
                <Input name="name" placeholder="Circuit Name" className="form-input" />
            </Form.Item>
            <Form.Item label="Description " className="label">
                <Input name="description" className="form-input" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit" >
                    {this.props.btnText}
                </Button>
            </Form.Item>
            </Form>
        </div>
        );
    }
}

export default CircuitForm;