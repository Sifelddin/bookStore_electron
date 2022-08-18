import React from 'react';
import Title from '../../UI/Title';
import ListUsers from '../components/List';

const Clients = () => {
  return (
    <>
      <Title>List of Clients</Title>
      <ListUsers isClient />
    </>
  );
};

export default Clients;
