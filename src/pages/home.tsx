import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative flex h-full w-full">
      <div className="h-screen w-1/2 bg-black">
        <div className="mx-auto flex h-full w-2/3 flex-col justify-center text-white xl:w-1/2">
          <div>
            <p className="text-2xl">Login</p>
          </div>
          <div className="mt-10">
            <form>
              <div>
                <label className="mb-2.5 block font-extrabold" htmlFor="email">
                  Email
                  <input
                    type="email"
                    id="email"
                    className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
                    placeholder="mail@user.com"
                  />
                </label>
              </div>
              <div className="mt-4">
                <label className="mb-2.5 block font-extrabold" htmlFor="password">
                  Password
                  <input
                    type="password"
                    id="password"
                    className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow"
                  />
                </label>
              </div>
              <div className="mt-4 flex w-full flex-col justify-between sm:flex-row">
                <div>
                  <Link className="text-sm hover:text-gray-200" to="admin">
                    {' '}
                    Forgot password
                  </Link>
                </div>
              </div>
              <div className="my-10">
                <button className="w-full rounded-full bg-orange-600 p-5 hover:bg-orange-800">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="h-screen w-1/2 bg-blue-600">
        <img
          src="https://images.pexels.com/photos/2523959/pexels-photo-2523959.jpeg"
          className="h-full w-full"
          alt=""
        />
      </div>
    </div>
  );
};

export default Home;
