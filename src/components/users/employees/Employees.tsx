import React from 'react';
import Title from '../../UI/Title';
import ListUsers from '../components/List';

const Employees = () => {
  return (
    <>
      <Title>List of Employees</Title>
      <ListUsers isClient={false} />
    </>
  );
};

export default Employees;
