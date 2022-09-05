import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormInputs } from '../components/interfaces';
import ErrorSpan from '../components/UI/ErrorSpan';
import { postData } from '../hooks';

const Home = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    postData('post', '/api/login', undefined, data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        navigate('/admin/dashboard', { replace: true });
      })
      .catch((e) => setError('credentials', { type: 'username-password', message: e.response.data.message }));
  };

  return (
    <div className="h-full w-full">
      <div className="mx-auto flex justify-center items-center h-full w-2/4 flex-col text-white xl:w-1/3 mt-40">
        <div>
          <p className="text-2xl">Login</p>
          {errors.credentials?.type === 'username-password' && <ErrorSpan>{errors?.credentials.message}</ErrorSpan>}
        </div>
        <div className="mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="mb-2.5 block font-extrabold" htmlFor="email">
                Email
                <input
                  type="email"
                  id="email"
                  className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
                  placeholder="mail@user.com"
                  {...register('username', { required: true })}
                />
                {errors.password?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
              </label>
            </div>
            <div className="mt-4">
              <label className="mb-2.5 block font-extrabold" htmlFor="password">
                Password
                <input
                  type="password"
                  id="password"
                  className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow"
                  {...register('password', { required: true })}
                />
                {errors.password?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
              </label>
            </div>
            <div className="my-10">
              <button
                onClick={() => delete errors?.credentials}
                className="w-full rounded-full bg-orange-600 p-5 hover:bg-orange-800"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-hero-pattern -z-10 bg-no-repeat bg-cover" />
    </div>
  );
};

export default Home;
