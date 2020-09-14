import React from 'react';
import axios from 'axios';
import { store, init } from './store'

import Departments from './Departments';
import Stats from './Stats';


class App extends React.Component{
  async componentDidMount(){
    //store.subscribe(() => this.setState(store.getState()));
    const responses = await Promise.all([
      axios.get('/api/employees'),
      axios.get('/api/departments'),
    ]);
    store.dispatch(init(responses[0].data, responses[1].data));
  }
  render(){
    return (
      <div>
        <h1>Acme Employees And Departments</h1>
        <Stats/>
        <Departments/>
      </div>
    );
  }
}

export default App;
