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
    // this.afterDeleteCircuit = this.afterDeleteCircuit.bind(this)
}

    componentDidMount() {
        this.fetchAPIs(this.state)
    }

    fetchAPIs() {
        const circuitID = this.props.match.params.id;

        // id and put workouts w/ circuit id in array
        axios.all([
            axios.get(`http://circuit-backend.herokuapp.com/api/${circuitID}`),
            axios.get(`http://circuit-backend.herokuapp.com/api/workout/`)
        ])
            .then(axios.spread((circuitRes, workoutRes) => {
                this.setState({
                    circuit: circuitRes.data,
                    workout: workoutRes.data
                })
                console.log(this.state);
            }))
    }

    handleDeleteWorkout = (workoutID) => {
        const circuitID = this.props.match.params.id;

        axios.delete(`http://circuit-backend.herokuapp.com/api/workout/${workoutID}/delete/`);
        this.props.history.push(`/circuits/${circuitID}`);
        this.forceUpdate();
        console.log('deleted!')
    }

    leadingZero(num){
        if(num<10){
            return '0'+num;
        }
        else{
            return num
        }
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
                        {workout.exercise} - {this.leadingZero(workout.minutes)} min {this.leadingZero(workout.seconds)} sec 
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
                    <div className="detail-view-title">
                        <h2 className="list-detail">{this.state.circuit.name}</h2>
                        <div className="circuit-delete-btn-container">
                            <form>
                                <Button type="danger" htmlType="submit" className="circuit-delete-button" onClick={() => this.props.onDelete(circuitID)} >X</Button>
                            </form>
                        </div>
                    </div>
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