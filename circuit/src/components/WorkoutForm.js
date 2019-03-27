import React from 'react';
import { Form, Input, Button, } from 'antd';

import axios from 'axios';

class WorkoutForm extends React.Component {

    handleFormSubmit = (event, circuitID) => {
        const exercise = event.target.elements.exercise.value;
        const minutes = event.target.elements.minutes.value;
        const seconds = event.target.elements.seconds.value;
        const circuit = circuitID;

        var newWorkout = {
            exercise: exercise,
            minutes: minutes,
            seconds: seconds,
            circuit: circuit
        }

        console.log(exercise, minutes, seconds, circuit)

        axios.post('http://circuit-backend.herokuapp.com/api/workout/create/', newWorkout)
            .then(res => {
                console.log(newWorkout);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
        <div className="list-form-container workout-form-style">
            <Form onSubmit={(event) => this.handleFormSubmit(event, 
                    this.props.circuitID )} >
                    <h3>Add A Workout</h3>
            <Form.Item label="Exercise:">
                <Input name="exercise" />
            </Form.Item>
            <Form.Item label="Minutes:">
                <Input name="minutes"  />
            </Form.Item>
            <Form.Item label="Seconds:">
                <Input name="seconds"  />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="workout-create-btn" onClick={this.refresh} >
                    {this.props.btnText}
                </Button>
            </Form.Item>
            </Form>
        </div>
        );
    }
}

export default WorkoutForm;