import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData, postData, baseUrl, inputFormData } from '../../hooks';
import Modal from '../modal';
import Button from '../UI/Button';
import Label from '../UI/Label';
import ErrorSpan from '../UI/ErrorSpan';
import LinkSpan from '../UI/LinkSpan';
import { useModal } from '../../contexts/ConfirmContext';
import { Evalidation, FormInputs, ContentList, FormComponentProps } from '../interfaces';

const CategoryForm = ({ category, action }: FormComponentProps) => {
  const [categoriesParent, setCategoriesParent] = useState<ContentList>({ loading: true, data: undefined });
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

  const serverErr = (field: any, message: string) => {
    setError(field, { type: `errors server`, message });
  };

  const onSubmit = async (data: FormInputs) => {
    try {
      await postData(
        'post',
        category ? `/api/v2/categories/${category.id}/image` : '/api/v2/categories',
        {
          'Content-Type': 'multipart/form-data'
        },
        inputFormData(data)
      );

      navigate('/admin/categories', { replace: true });
    } catch (e: any) {
      console.log(e);

      e.response.data?.violations?.map((violation: Evalidation) => {
        return serverErr(violation.propertyPath, violation.message);
      });
      console.log(e);
    }
    return data;
  };

  const { data } = categoriesParent;

  const show: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = (e) => {
    e?.preventDefault();
    setShowModal?.(true);
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center">
      <div className="flex flex-col w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        {category && (
          <div className="mx-auto">
            <img
              className="h-52 hover:scale-150 hover:translate-y-14 duration-200"
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
              {errors.name?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
              {errors.name?.type === 'errors server' && <ErrorSpan>{errors.name?.message}</ErrorSpan>}
            </Label>
          </div>

          {(category?.subCategories.length !== 0 && action === 'update') || (
            <div className="flex items-center text-lg mb-6 md:mb-8 w-full">
              <Label fieldId="parentCategory">
                Parent Category : {data && <span className="text-gray-500">{data['hydra:totalItems']}</span>}
                <select
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                  id="parentCategory"
                  defaultValue={category?.catParent?.name}
                  {...register('catParent')}
                >
                  {/* updata action check if there is a parent category */}
                  {category?.catParent && (
                    <option value={category?.catParent?.['@id']}> {category?.catParent?.name}</option>
                  )}

                  {(!category || category?.books.length === 0) && (
                    <option value="null" className="text-gray-400">
                      select parent category...
                    </option>
                  )}

                  {data?.['hydra:member'].map((parent) => {
                    return (
                      'name' in parent &&
                      parent.name !== category?.catParent?.name &&
                      category?.name !== parent.name && (
                        <option key={parent.id} value={parent['@id']}>
                          {parent.name}
                        </option>
                      )
                    );
                  })}
                </select>
              </Label>
            </div>
          )}

          <div className="flex items-center text-lg mb-4 md:mb-6 w-full">
            <Label fieldId="photo">
              <input
                type="file"
                id="photo"
                className="cursor-pointer"
                {...register('imageFile', {
                  required: action === 'create'
                })}
              />
              {errors.imageFile?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
              {errors.imageFile?.type === 'errors server' && <ErrorSpan>{errors.imageFile.message}</ErrorSpan>}
            </Label>
          </div>
          <div className="w-full grid grid-cols-2 gap-3 ">
            <Button handler={show}>{action}</Button>
            <Link to="/admin/categories" replace>
              <LinkSpan link="/admin/categories">List</LinkSpan>
            </Link>
          </div>
          <Modal action={action} />
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
