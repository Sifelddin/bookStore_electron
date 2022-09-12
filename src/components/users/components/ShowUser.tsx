import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../../hooks';
import { User, UserFetch } from '../../interfaces';
import LinkSpan from '../../UI/LinkSpan';
import Spinner from '../../UI/Spinner';
import Form from './Form';
import Tr from './UI/Tr';

const ShowUser = () => {
  const [user, setUser] = useState<UserFetch>({ loading: true, data: undefined });
  const [isEditValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    if (state && !isEditValid) {
      const stateData = state as User;
      setUser({ loading: false, data: stateData });
    } else {
      fetchData(`api/v2/users/${id}`, setUser).catch((e) =>
        e.response.data.code === 401 ? navigate('/', { replace: true }) : console.log(e)
      );
      setIsValid(false);
    }
  }, [state, isEditValid]);

  const { loading, data } = user;
  let usersList = '';

  if (loading) {
    return <Spinner />;
  }

  // switch the link labelle according the category of the users
  switch (data?.private) {
    case undefined:
      usersList = 'Employees List';
      break;
    case false:
      usersList = 'Professionals List';
      break;
    default:
      usersList = 'Privates List';
  }

  return (
    <div className="min-h-fit sm:justify-center items-center pt-6 sm:pt-0 col-span-4">
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
                  return <td key={role}>{role}</td>;
                })}
              </tr>
            </tbody>
          </table>

          <div className="min-h-fit flex sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50 col-span-1">
            {user && <Form user={data} setIsValid={setIsValid} />}
          </div>
        </div>
        <div className="flex justify-around items-center mt-10">
          <Link to=".." replace>
            <LinkSpan link="users/employees">{usersList}</LinkSpan>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowUser;
