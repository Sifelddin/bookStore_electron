import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData, postData, baseUrl } from '../../hooks';
import Modal from '../modal';
import Button from '../UI/Button';
import Label from '../UI/Label';
import ErrorSpan from '../UI/ErrorSpan';
import LinkSpan from '../UI/LinkSpan';
import { useModal } from '../../contexts/ConfirmContext';
import { Evalidation, Category, FormInputs, Content } from '../interfaces';

interface Props {
  category?: Category;
  method: string;
}

const CategoryForm = ({ category, method }: Props) => {
  const [categoriesParent, setCategoriesParent] = useState<Content>({ loading: true, data: undefined });
  const navigate = useNavigate();
  const { setShowModal } = useModal();
  useEffect(() => {
    fetchData('https://localhost:8000/api/v2/categories/all?page=1&exists%5BcatParent%5D=false', setCategoriesParent);
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    console.log(data.imageFile[0]);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('catParent', data.catParent);
    formData.append('imageFile', data.imageFile[0]);

    try {
      await postData(
        method,
        category ? `${category['@id']}/image` : '/api/categories',
        { 'Content-Type': 'multipart/form-data' },
        formData
      );
      navigate('/admin/categories', { replace: true });
      console.log('posted');
    } catch (e: any) {
      console.log(e);

      return e.response.data.violations
        ? e.response.data.violations.map((violation: Evalidation) => {
            return setError('name', { type: 'errors server', message: violation.message });
          })
        : setError('name', { type: 'errors server', message: 'an server error occurred ' });
    }
    return data;
  };

  const { loading, data } = categoriesParent;
  console.log(category);

  const show = (e: Event) => {
    e.preventDefault();
    setShowModal?.(true);
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center">
      <div className="flex flex-col w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        {category && (
          <div className="mx-auto">
            <img
              className="h-52 hover:scale-150 hover:translate-y-14 z-40 transition-all duration-200"
              src={`${baseUrl}/images/categories/${category.photo}`}
              alt={category.name}
            />
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="p-2 md:p-6">
          <div className="flex items-center text-lg mb-4 md:mb-6 w-full">
            <Label fieldId="category">
              Category
              <input
                type="text"
                id="category"
                defaultValue={category?.name}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                {...register('name', {
                  required: true
                })}
              />
              {errors.contactName?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
              {errors.contactName?.type === 'errors server' && <ErrorSpan>{errors.contactName.message}</ErrorSpan>}
            </Label>
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8 w-full">
            <Label fieldId="parentCategory">
              Parent Category : {data && <span className="text-gray-500">{data['hydra:totalItems']}</span>}
              {loading || (
                <select
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                  id="parentCategory"
                  {...register('catParent')}
                >
                  <option value={category?.name}> {category?.name || 'select parent category...'}</option>
                  {data?.['hydra:member'].map((parent) => {
                    return (
                      'name' in parent && (
                        <option key={parent.id} value={parent['@id']}>
                          {parent.name}
                        </option>
                      )
                    );
                  })}
                </select>
              )}
            </Label>
          </div>
          <div className="flex items-center text-lg mb-4 md:mb-6 w-full">
            <Label fieldId="photo">
              <input
                type="file"
                id="photo"
                className="cursor-pointer"
                {...register('imageFile', {
                  required: true
                })}
              />
              {errors.imageFile?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
              {errors.imageFile?.type === 'errors server' && <ErrorSpan>{errors.imageFile.message}</ErrorSpan>}
            </Label>
          </div>
          <div className="w-full grid grid-cols-2 gap-3 ">
            <Button handler={show}>{method === 'post' ? 'Create' : 'Update'}</Button>
            <Link to="/admin/categories" replace>
              <LinkSpan link="/admin/categories">List</LinkSpan>
            </Link>
          </div>
          <Modal method={method} />
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
