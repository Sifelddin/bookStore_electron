import React from 'react';
import Title from '../../UI/Title';
import ListUsers from '../components/List';

const Profs = () => {
  return (
    <>
      <Title>List of Professionals</Title>
      <ListUsers endPoint="/api/v2/users?private=false" status="professional" />
    </>
  );
};

export default Profs;
