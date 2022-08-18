import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../../../hooks';
import { ContentList } from '../../interfaces';
import LinkSpan from '../../UI/LinkSpan';
import ListFrame from '../../UI/ListFrame';
import Pagination from '../../UI/Pagination';
import Spinner from '../../UI/Spinner';
import Th, { Td } from '../../UI/Th';

const ListUsers = ({ isClient }: { isClient: boolean }) => {
  const [url, setUrl] = useState(`/api/users?exists%5Bprivate%5D=${isClient}`);
  const [users, setUsers] = useState<ContentList>({ loading: true, data: undefined });

  useEffect(() => {
    fetchData(url, setUsers);
  }, []);

  const { loading, data } = users;

  if (loading) {
    <Spinner />;
  }
  return (
    <ListFrame data={data}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <Th>Id</Th>
            <Th>fullName</Th>
            <Th>Email</Th>
            <Th>Phone number</Th>
            <Th>fullAddress</Th>
            <Th>Status</Th>
            <Th>actions</Th>
          </tr>
        </thead>
        <tbody>
          {data?.['hydra:member'].map((user) => {
            return (
              'email' in user && (
                <tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{`${user.firstname} ${user.lastname}`}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.phone}</Td>
                  <Td>{`${user.address} ${user.city} ${user.zipCode}`}</Td>
                  <td className="text-green-700">{user.private ? 'private' : 'professional'}</td>
                  <td className="grid grid-cols-2 items-center px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`${user.id}`}>
                      <LinkSpan link={`${user.id}`}>details</LinkSpan>
                    </Link>
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
      <Pagination data={data} setPageUrl={setUrl} />
    </ListFrame>
  );
};

export default ListUsers;
