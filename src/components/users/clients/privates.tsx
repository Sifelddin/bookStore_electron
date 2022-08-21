import React from 'react';
import Title from '../../UI/Title';
import ListUsers from '../components/List';

const Privates = () => {
  return (
    <>
      <Title>List of Privates</Title>
      <ListUsers endPoint="/api/users?private=true" status="private" />
    </>
  );
};

export default Privates;
