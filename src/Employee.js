import React from 'react';
import { connect } from 'react-redux';
import { destroyEmployee, removeFromDepartment } from './store'
import axios from 'axios';

const destroy = async (employee) => {
  await axios.delete(`/api/employees/${employee.id}`);
}

const remove = async (employee) => {
  await axios.put(`/api/employees/${employee.id}`, { departmentId: null})
}

const Employee = ({ employee, destroyEmployee, removeFromDepartment })=> {
  return (
    <li key={ employee.id }>
      { employee.name }
      <button onClick={ ()=> {
        destroy(employee);
        return destroyEmployee(employee);
      }}>x</button>
      {
        !!removeFromDepartment && (
          <button onClick={ ()=> {
            remove(employee);
            return removeFromDepartment(employee);
          }}>Remove From Department</button>
        )
      }
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    destroyEmployee: function(employee) {
      dispatch(destroyEmployee(employee));
    },
    removeFromDepartment: function(employee) {
      dispatch(removeFromDepartment(employee));
    }
  }
}

export default connect(null, mapDispatchToProps)(Employee);
