import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData } from '../../../hooks';
import { ContentList } from '../../interfaces';
import LinkSpan from '../../UI/LinkSpan';
import ListFrame from '../../UI/ListFrame';
import Pagination from '../../UI/Pagination';
import Spinner from '../../UI/Spinner';
import Th, { Td } from '../../UI/Th';

const ListUsers = ({ endPoint, status }: { endPoint: string; status: string }) => {
  const navigate = useNavigate();
  const [url, setUrl] = useState(endPoint);
  const [users, setUsers] = useState<ContentList>({ loading: true, data: undefined });

  useEffect(() => {
    fetchData(url, setUsers).catch((e) =>
      e.response.data.code === 401 ? navigate('/', { replace: true }) : console.log(e)
    );
  }, []);

  const { loading, data } = users;

  if (loading) {
    return <Spinner />;
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
                  <td className="text-green-700">{status}</td>
                  <td className="grid grid-cols-2 items-center px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {(user?.private === true || user?.private === false) && (
                      <Link to={`${user.id}/orders`}>
                        <LinkSpan link={`${user.id}`}>orders</LinkSpan>
                      </Link>
                    )}
                    <Link to={`${user.id}/edit`} state={user}>
                      <LinkSpan link={`${user.id}`}>edit</LinkSpan>
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
