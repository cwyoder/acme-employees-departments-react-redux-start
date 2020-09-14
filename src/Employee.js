import React from 'react';
import { store, destroyEmployee, removeFromDepartment } from './store'
import axios from 'axios';

const destroy = async (employee) => {
  await axios.delete(`/api/employees/${employee.id}`);
}

const remove = async (employee) => {
  await axios.put(`/api/employees/${employee.id}`, { departmentId: null})
}

const Employee = ({ employee })=> {
  return (
    <li key={ employee.id }>
      { employee.name }
      <button onClick={ ()=> {
        destroy(employee);
        return store.dispatch(destroyEmployee(employee))
      }}>x</button>
      {
        !!removeFromDepartment && (
          <button onClick={ ()=> {
            remove(employee);
            store.dispatch(removeFromDepartment(employee))
          }}>Remove From Department</button>
        )
      }
    </li>
  );
};

export default Employee;
