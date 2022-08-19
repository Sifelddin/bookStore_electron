import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchData } from '../../../hooks';
import { UserFetch } from '../../interfaces';
import LinkSpan from '../../UI/LinkSpan';
import Spinner from '../../UI/Spinner';
import Form from './Form';
import Tr from './UI/Tr';

const ShowUser = () => {
  const [user, setUser] = useState<UserFetch>({ loading: true, data: undefined });
  const { id } = useParams();
  useEffect(() => {
    fetchData(`api/users/${id}`, setUser);
  }, []);
  const { loading, data } = user;

  if (loading) {
    return <Spinner />;
  }
  console.log(data);

  return (
    <div className="min-h-fit sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 col-span-4">
      <div className="flex flex-col  mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg m-10">
        <div className="grid grid-cols-2 gap-2">
          <table className="divide-y divide-gray-200 col-span-1">
            <tbody>
              <Tr th="Id :" td={data?.id} />
              <Tr th="Email :" td={data?.email} />
              <Tr th="FirstName :" td={data?.firstname} />
              <Tr th="LastName :" td={data?.lastname} />
              <Tr th="Address :" td={data?.address} />
              <Tr th="City :" td={data?.city} />
              <Tr th="Zipcode :" td={data?.zipCode} />
              <Tr th="Phone :" td={data?.phone} />
              <Tr th="Coefficient :" td={data?.Coef} />
              {(data?.private === false || data?.private === true) && (
                <Tr th="status :" td={data?.private ? 'private' : 'professional'} />
              )}
              <tr>
                <th className="text-left uppercase">Roles :</th>
                {data?.roles.map((role) => {
                  return <td>{role}</td>;
                })}
              </tr>
            </tbody>
          </table>

          <div className="min-h-fit flex sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50 col-span-1">
            {user && <Form user={data} />}
          </div>
        </div>
        <div className="flex justify-around items-center mt-10">
          <Link to={data?.private === false || data?.private === true ? '../users/clients' : '../users/employees'}>
            <LinkSpan link="users/employees">
              {data?.private === false || data?.private === true ? 'clients list' : 'employees list'}
            </LinkSpan>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowUser;
