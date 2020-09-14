import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { store, init, destroyEmployee, removeFromDepartment } from './store'

import Departments from './Departments';
import Stats from './Stats';

class App extends React.Component{
  constructor(){
    super();
    this.state = store.getState();
  }
  // async destroyEmployee(employee){
  //   await axios.delete(`/api/employees/${employee.id}`);
  //   const employees = this.state.employees.filter(_employee => employee.id !== _employee.id);
  //   this.setState({ employees });
  // }
  // async removeFromDepartment(employee){
  //   employee = (await axios.put(`/api/employees/${employee.id}`, { departmentId: null})).data;
  //   const employees = this.state.employees.map(_employee => employee.id === _employee.id ? employee : _employee);
  //   this.setState({ employees });
  // }
  async componentDidMount(){
    store.subscribe(() => this.setState(store.getState()));
    const responses = await Promise.all([
      axios.get('/api/employees'),
      axios.get('/api/departments'),
    ]);
    store.dispatch(init(responses[0].data, responses[1].data));
  }
  render(){
    const { departments, employees } = this.state;
    return (
      <div>
        <h1>Acme Employees And Departments</h1>
        <Stats employees={ employees }/>
        <Departments
          departments={ departments }
          employees={ employees }
      />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
