import React from 'react';
import axios from 'axios';

import { Button } from 'antd';

import WorkoutForm from '../components/WorkoutForm';

class CircuitDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
        circuit: {},
        workout: []
    }

    this.fetchAPIs = this.fetchAPIs.bind(this)
}

    componentDidMount() {
        this.fetchAPIs(this.state)
    }

    fetchAPIs() {
        const circuitID = this.props.match.params.id;

        // id and put workouts w/ circuit id in array
        axios.all([
            axios.get(`http://localhost:8000/api/${circuitID}`),
            axios.get(`http://localhost:8000/api/workout/`)
        ])
            .then(axios.spread((circuitRes, workoutRes) => {
                this.setState({
                    circuit: circuitRes.data,
                    workout: workoutRes.data
                })
                console.log(this.state);
            }))
    }

    handleDeleteCircuit = (event) => {
        const circuitID = this.props.match.params.id;

        axios.delete(`http://localhost:8000/api/${circuitID}/delete/`);
        this.props.history.push('/');
        this.forceUpdate();
    }

    handleDeleteWorkout = (workoutID) => {
        const circuitID = this.props.match.params.id;

        axios.delete(`http://localhost:8000/api/workout/${workoutID}/delete/`);
        this.props.history.push(`/circuits/${circuitID}`);
        this.forceUpdate();
    }

    render() {
        const workoutArray = this.state.workout
        const circuitID = this.state.circuit.id

        const circuitWorkout = workoutArray.map((workout, index) => {
            const workoutCircuit = workout.circuit
            const workoutID = workout.id
            if (workoutCircuit === circuitID) {
                return(
                    <div key={index}>
                        {workout.exercise} - {workout.minutes} min {workout.seconds} sec 
                        <form onSubmit={() => this.handleDeleteWorkout(workoutID)}>
                        <Button type="danger" htmlType="submit">Delete This Workout</Button>
                        </form>
                    </div>
            )}
            return console.log('fixed')
        })

        return (
            <div className="list-view-container circuit-detail">
                <div className="detail-view">
                    <h2 className="list-detail">{this.state.circuit.name}</h2>
                <form onSubmit={this.handleDeleteCircuit}>
                    <Button type="danger" htmlType="submit">Delete</Button>
                </form>
                    <p>{this.state.circuit.description}</p>
                    {circuitWorkout}
                </div>

                <WorkoutForm 
                    circuitID={this.state.circuit.id}
                    btnText="Add" />
            </div>
        )
    }
}

export default CircuitDetail;