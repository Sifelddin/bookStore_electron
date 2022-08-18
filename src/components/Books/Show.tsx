import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { baseUrl, fetchData, postData } from '../../hooks';
import Spinner from '../UI/Spinner';
import Tr from './UI/Tr';
import Button from './UI/button';
import Modal from '../modal';
import { useConfirmation, useModal } from '../../contexts/ConfirmContext';
import { BookFetch } from '../interfaces';

const ShowBook = () => {
  const { confirmed, setConfirmed } = useConfirmation();

  const { setShowModal } = useModal();
  const { id } = useParams();
  const location = useNavigate();
  const [book, setBook] = useState<BookFetch>({ loading: true, data: undefined });

  useEffect(() => {
    fetchData(`/api/books/${id}`, setBook);
  }, []);

  const { loading, data } = book;

  useEffect(() => {
    if (data && confirmed) {
      postData('delete', data['@id']).then(() => location('../books'));
      setConfirmed?.(false);
    }
  }, [data, confirmed]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className=" m-auto w-4/5 bg-white mt-6 shadow-md">
      {data && 'title' in data && (
        <div className="block lg:grid lg:grid-cols-2 lg:justify-between p-2 gap-2">
          <div
            className="
           col-span-1"
          >
            <img className=" h-96 w-auto m-auto " src={`${baseUrl}/images/books/${data.photo}`} alt={data.title} />
          </div>
          <div className="mx-auto col-span-1">
            <table className="divide-y divide-gray-200">
              <tbody>
                <Tr th="ID :" td={data.id} />
                <Tr th="title :" td={data.title} />
                <Tr th="author :" td={data.author} />
                <Tr th="editor :" td={data.editor} />
                <Tr th="category :" td={data.category.name} />
                <Tr th="supplier :" td={data.supplier.contactName} />
                <Tr th="price :" td={`${data.price}€`} />
                <Tr th="release Date :" td={data.releaseDate} />
                <Tr th="published :" td={data.published ? 'yes' : 'no'} />
                <Tr th="stock :" td={data.stock} />
                <Tr th="stock Alert :" td={data.stockAlert} />
                <Tr th="created date :" td={data.createdAt} />
                <Tr th="updated date :" td={data.updateAt} />
              </tbody>
            </table>
            <div className="">
              <span className="text-base uppercase">
                {' '}
                <strong>Description :</strong>
              </span>
              <p>{data.description}</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-around items-center mt-4 p-4">
        <Link to="../books">
          <Button color="gray"> back to list </Button>
        </Link>
        <Link to="./edit" state={data}>
          <Button color="blue"> Edit </Button>
        </Link>
        <button
          onClick={() => {
            setShowModal?.(true);
          }}
        >
          <Button color="red"> Delete </Button>
        </button>
      </div>
      <Modal action="delete" />
    </div>
  );
};

export default ShowBook;
