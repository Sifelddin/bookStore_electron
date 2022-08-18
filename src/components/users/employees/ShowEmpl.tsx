import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchData } from '../../../hooks';
import { UserFetch } from '../../interfaces';
import LinkSpan from '../../UI/LinkSpan';
import Spinner from '../../UI/Spinner';
import Tr from '../components/UI/Tr';

const ShowEmploye = () => {
  const [employe, setEmploye] = useState<UserFetch>({ loading: true, data: undefined });
  const { id } = useParams();
  useEffect(() => {
    fetchData(`api/users/${id}`, setEmploye);
  }, []);
  const { loading, data } = employe;

  if (loading) {
    return <Spinner />;
  }

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
              <tr>
                <th className="text-left uppercase">Roles :</th>
                {data?.roles.map((role) => {
                  return <td>{role}</td>;
                })}
              </tr>
            </tbody>
          </table>

          <div className="min-h-fit flex sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 col-span-1">
            <div className="flex flex-col w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
              form
            </div>
          </div>
        </div>
        <div className="flex justify-around items-center mt-10">
          <Link to="../users/employees">
            <LinkSpan link="users/employees">Employees List</LinkSpan>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowEmploye;
