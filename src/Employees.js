import React from 'react';
import { connect } from 'react-redux';

import Employee from './Employee';

const Employees = ({ department, employees })=> {
  return (
      <ul>
        {
          employees.filter( employee => employee.departmentId === (department ? department.id : null )).map( employee => <Employee employee={ employee } key={ employee.id }/>)
        }
      </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    employees: state.employees
  }
}

export default connect(mapStateToProps)(Employees);
