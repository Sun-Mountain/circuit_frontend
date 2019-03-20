import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';
import './App.css';

import Layout from './containers/Layout';

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Layout {...this.props}>
              <BaseRouter />
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;