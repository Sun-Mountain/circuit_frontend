import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Layout from './containers/Layout';

import CircuitList from './containers/CircuitListView';
import CircuitDetail from './containers/CircuitDetailView';
import CircuitTimer from './containers/CircuitTimer';

class App extends Component {

  constructor(props) {
    super(props)
        this.state = {
            circuitList: []
        }
  this.getList = this.getList.bind(this)
}

componentDidMount() {
  this.getList()
}

getList() {
  // axios.get to call both apis
  axios.get('http://circuit-backend.herokuapp.com/api/')
  // separate them into their respective arrays
      .then(res => {
          this.setState({
              circuitList: res.data
          })
          console.log('got');
      })
  .catch((err) => {
      console.log(err)
  })

}
afterDeleteCircuit = (circuitID) => {

  // state before deleting anything
  const currentState = this.state.circuitList;

  // remove deleted item from state
  this.setState = currentState.filter(circuit => circuit.id !== circuitID)

  // delete from API
  axios
      .delete(`http://circuit-backend.herokuapp.com/api/${circuitID}/delete/`, this.state)
      .then(res => {
          if (res.status === 'error') {
              // Oops, something went wrong. Let's get that deleted Id back.
              this.setState({
                  circuits: currentState,
              });
          } else {
              // Delete successfully, do nothing.
              // Because we already remove the deleted id from state.

              // Show success message here.
              console.log(`successfully deleted {circuitID}`);
              // this.props.history.push('/');
          }
      })
}

  render() {
    return (
      <div>
        <Router>
          <Layout {...this.props}>
            <Route exact path='/' render={(props) => <CircuitList {...props} circuits={this.state.circuitList} /> } />
            <Route path='/circuits/:id' render={(props) => <CircuitDetail {...props} onDelete={this.afterDeleteCircuit} /> } />
            <Route exact path='/timer' component={CircuitTimer} />
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;