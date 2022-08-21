import React from 'react';
import Title from '../../UI/Title';
import ListUsers from '../components/List';

const Employees = () => {
  return (
    <>
      <Title>List of Employees</Title>
      <ListUsers endPoint="/api/users?exists%5Bprivate%5D=false" status="employee" />
    </>
  );
};

export default Employees;
