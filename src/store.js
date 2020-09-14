import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import axios from 'axios';

const initialState = {
  departments: [],
  employees: []
}

//Action types
const INIT = 'INIT';
const DESTROY_EMPLOYEE = 'DESTROY_EMPLOYEE';
const REMOVE_FROM_DEPT = 'REMOVE_FROM_DEPT';

//Action creators
export const init = (employees, departments) => (
  {
    type: INIT,
    employees,
    departments
  }
)

export const destroyEmployee = (employee) => {
  return {
    type: DESTROY_EMPLOYEE,
    employee
  }
}

export const removeFromDepartment = (employee) => {
  return {
    type: REMOVE_FROM_DEPT,
    employee
  }
}

//Reducer
function reducer(state = initialState, action) {
  switch(action.type) {
    case INIT:
      const allEmployees = action.employees;
      const allDepartments = action.departments;
      return {employees: allEmployees, departments: allDepartments};
    case DESTROY_EMPLOYEE:
      const employeeToDistroy = action.employee;
      const filterEmployees = state.employees.filter(_employee => employeeToDistroy.id !== _employee.id);
      return {...state, employees: filterEmployees}
    case REMOVE_FROM_DEPT:
      const employeeToRemove = action.employee;
      employeeToRemove.departmentId = null;
      const newEmployees = state.employees.map(_employee => employeeToRemove.id === _employee.id ? employeeToRemove : _employee);
      return {...state, employees: newEmployees};
    default:
      return state;
  }
}

export const store = createStore(reducer, applyMiddleware(loggerMiddleware));
