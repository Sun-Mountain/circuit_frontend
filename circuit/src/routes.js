
import React from 'react';
import { Route } from 'react-router-dom';

import CircuitList from './containers/CircuitListView';
import CircuitDetail from './containers/CircuitDetailView';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={CircuitList} />
        <Route exact path='/:id' component={CircuitDetail} />
    </div>
);

export default BaseRouter;