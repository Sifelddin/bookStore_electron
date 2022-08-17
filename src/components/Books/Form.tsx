import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useModal } from '../../contexts/ConfirmContext';
import { fetchData, inputFormData, postData } from '../../hooks';
import { FormComponentProps, FormInputs, Content, Evalidation } from '../interfaces';
import Modal from '../modal';
import Button from '../UI/Button';
import Label from '../UI/Label';
import LinkSpan from '../UI/LinkSpan';

const BookForm = ({ action, book }: FormComponentProps) => {
  const [categories, setCategories] = useState<Content>({ loading: true, data: undefined });
  const [suppliers, setSuppliers] = useState<Content>({ loading: true, data: undefined });
  const { setShowModal } = useModal();

  const navigate = useNavigate();
  useEffect(() => {
    fetchData('https://localhost:8000/api/v2/categories/all?exists%5BcatParent%5D=true', setCategories);
    fetchData('https://localhost:8000/api/suppliers', setSuppliers);
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
  const onSubmit = (data: FormInputs) => {
    console.log(data);

    postData(
      'post',
      book ? `${book['@id']}/image` : '/api/books',
      { 'Content-Type': 'multipart/form-data' },
      inputFormData(data)
    )
      .then((res) => {
        console.log(res);
        navigate('/admin/books', { replace: true });
      })
      .catch((e: any) => {
        console.log(e);
        e.response.data?.violations?.map((violation: Evalidation) => {
          return serverErr(violation.propertyPath, violation.message);
        });
      });
  };

  const { data: categoriesList } = categories;
  const { data: suppliersList } = suppliers;

  const show = (e: MouseEvent) => {
    e.preventDefault();
    setShowModal?.(true);
  };

  return (
    <div className="h-screen overflow-hidden w-11/12 mx-auto">
      <div className="mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="p-2 md:p-6">
          <div className="grid grid-cols-2 gap-3">
            <div className=" col-span-1">
              <Label fieldId="Title">
                Title
                <input
                  type="text"
                  id="Title"
                  defaultValue={book?.title}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                  {...register('title', {
                    required: true
                  })}
                />
                {/* {errors.name?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
                {errors.name?.type === 'errors server' && <ErrorSpan>{errors.name?.message}</ErrorSpan>} */}
              </Label>

              <Label fieldId="Author">
                Author
                <input
                  type="text"
                  id="Author"
                  defaultValue={book?.author}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                  {...register('author', {
                    required: true
                  })}
                />
                {/* {errors.name?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
                {errors.name?.type === 'errors server' && <ErrorSpan>{errors.name?.message}</ErrorSpan>} */}
              </Label>

              <Label fieldId="Editor">
                Editor
                <input
                  type="text"
                  id="Editor"
                  defaultValue={book?.editor}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                  {...register('editor', {
                    required: true
                  })}
                />
                {/* {errors.name?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
                {errors.name?.type === 'errors server' && <ErrorSpan>{errors.name?.message}</ErrorSpan>} */}
              </Label>

              <Label fieldId="Description">
                Description
                <textarea
                  rows={6}
                  id="Description"
                  defaultValue={book?.description}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                  {...register('description', {
                    required: true
                  })}
                />
                {/* {errors.name?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
                {errors.name?.type === 'errors server' && <ErrorSpan>{errors.name?.message}</ErrorSpan>} */}
              </Label>

              <Label fieldId="Price">
                Price
                <input
                  type="text"
                  id="Price"
                  defaultValue={book?.price}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                  {...register('price', {
                    required: true
                  })}
                />
                {/* {errors.name?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
                {errors.name?.type === 'errors server' && <ErrorSpan>{errors.name?.message}</ErrorSpan>} */}
              </Label>
            </div>

            {/* second column */}

            <div className=" col-span-1">
              <Label fieldId="Category">
                Category
                <select
                  id="Category"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                  {...register('category', {
                    required: true
                  })}
                >
                  {book && (
                    <option className="text-gray-800" value={book.category['@id']}>
                      {book.category.name}
                    </option>
                  )}
                  <option className="text-gray-400" hidden>
                    select a category...
                  </option>
                  {categoriesList?.['hydra:member'].map((category) => {
                    return (
                      'name' in category &&
                      category.name !== book?.category.name && (
                        <option className="text-gray-800" key={category.id} value={category['@id']}>
                          {category.name}
                        </option>
                      )
                    );
                  })}
                </select>
                {/* {errors.name?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
                {errors.name?.type === 'errors server' && <ErrorSpan>{errors.name?.message}</ErrorSpan>} */}
              </Label>

              <Label fieldId="Stock">
                Stock
                <input
                  type="number"
                  id="Stock"
                  defaultValue={book?.stock}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                  {...register('stock', {
                    required: true
                  })}
                />
                {/* {errors.name?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
                {errors.name?.type === 'errors server' && <ErrorSpan>{errors.name?.message}</ErrorSpan>} */}
              </Label>
              <Label fieldId="Stock Alert">
                Stock
                <input
                  type="number"
                  id="Stock Alert"
                  defaultValue={book?.stockAlert}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                  {...register('stockAlert', {
                    required: true
                  })}
                />
                {/* {errors.name?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
                {errors.name?.type === 'errors server' && <ErrorSpan>{errors.name?.message}</ErrorSpan>} */}
              </Label>
              <div className="flex items-end ">
                <Label fieldId="Release date">
                  Release date
                  <input
                    type="date"
                    id="Release date"
                    defaultValue={book?.releaseDate}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block  pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                    {...register('releaseDate', {
                      required: true
                    })}
                  />
                  {/* {errors.name?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
                {errors.name?.type === 'errors server' && <ErrorSpan>{errors.name?.message}</ErrorSpan>} */}
                </Label>
                <Label fieldId="Published">
                  Published
                  <input
                    type="checkbox"
                    id="Published"
                    defaultChecked={book?.published}
                    className="focus:ring-indigo-500 focus:border-indigo-500 p-2 mx-2 border-gray-300 mb-2"
                    {...register('published', {
                      required: true
                    })}
                  />
                  {/* {errors.name?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
                {errors.name?.type === 'errors server' && <ErrorSpan>{errors.name?.message}</ErrorSpan>} */}
                </Label>
              </div>
              <Label fieldId="Supplier">
                Supplier
                <select
                  id="Supplier"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full  pl-4 pr-7 sm:text-md border-gray-300 rounded-md"
                  {...register('supplier', {
                    required: true
                  })}
                >
                  {book?.supplier && (
                    <option className="text-gray-800" value={book.supplier['@id']}>
                      {book.supplier.contactName}
                    </option>
                  )}
                  <option hidden className="text-gray-400">
                    select a supplier...
                  </option>
                  {suppliersList?.['hydra:member'].map((supplier) => {
                    return (
                      'contactName' in supplier &&
                      supplier.contactName !== book?.supplier.contactName && (
                        <option className="text-gray-800" key={supplier.id} value={supplier['@id']}>
                          {supplier.contactName}
                        </option>
                      )
                    );
                  })}
                </select>
                {/* {errors.name?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
                {errors.name?.type === 'errors server' && <ErrorSpan>{errors.name?.message}</ErrorSpan>} */}
              </Label>

              <div className="flex items-center text-lg my-4 md:mb-6 w-full cursor-pointer">
                <Label fieldId="photo">
                  <input
                    type="file"
                    id="photo"
                    className="cursor-pointer"
                    {...register('imageFile', {
                      required: action === 'create'
                    })}
                  />
                  {/* {errors.imageFile?.type === 'required' && <ErrorSpan>this feild is required</ErrorSpan>}
                {errors.imageFile?.type === 'errors server' && <ErrorSpan>{errors.imageFile.message}</ErrorSpan>} */}
                </Label>
              </div>
            </div>
            <div />
          </div>
          <div className=" w-4/5 md:w-3/5 lg:w-2/5 mx-auto grid grid-cols-2 gap-3 ">
            <Button handler={show}>{action}</Button>
            <Link to="/admin/books" replace>
              <LinkSpan link="/admin/books">List</LinkSpan>
            </Link>
          </div>
          <Modal action={action} />
        </form>
      </div>
    </div>
  );
};

export default BookForm;
