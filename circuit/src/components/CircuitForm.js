import React, { Component } from 'react';
import { Form, Input, Button, } from 'antd';

import axios from 'axios';

class CircuitForm extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            description: ''
        };
        this.onChange = this.onChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFormSubmit = (event, requestType, circuitID) => {
        // event.preventDefault();
        const name = event.target.elements.name.value;
        const description = event.target.elements.description.value;

        var newCircuit = {
            name: name,
            description: description
        }

        console.log(name, description)

        switch ( requestType ) {

        case 'post':
            return axios.post('http://circuit-backend.herokuapp.com/api/create/', this.state)
            .then((res) => {console.log(res);})
            .catch(error => console.log(error));
        case 'put':
            return axios.put(`http://circuit-backend.herokuapp.com/api/${circuitID}/update/`, {
                name: name,
                description: description
            })
            .then(res => console.log(res))
            .catch(error => console.log(error));
        }
    }

    render() {
        const { name, description } = this.state;
        return (
        <div className="list-form-container">
            <Form onSubmit={
                (event) => this.handleFormSubmit(
                    event,
                    this.props.requestType,
                    this.props.circuitID ) } >
            <Form.Item label="Circuit Name"  className="label">
                <Input name="name" placeholder="Circuit Name" className="form-input" value={name} onChange={this.onChange} />
            </Form.Item>
            <Form.Item label="Description " className="label">
                <Input name="description" className="form-input" value={description} onChange={this.onChange} />
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