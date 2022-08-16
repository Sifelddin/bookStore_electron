import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../hooks';
import Spinner from '../UI/Spinner';
import { Tr } from '../UI/Th';
import { Book } from '../interfaces';

type Content = {
  loading: boolean;
  data: Book | undefined;
};

const ShowBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Content>({ loading: true, data: undefined });

  useEffect(() => {
    fetchData(`/api/books/${id}`, setBook);
  }, []);

  const { loading, data } = book;

  if (loading) {
    return <Spinner />;
  }
  console.log(data);

  return (
    <div className=" w-4/5 bg-white mt-6 shadow-md">
      {data && (
        <div className="grid grid-cols-2 justify-between p-2 gap-2">
          <div className=" col-span-1">
            <table className="divide-y divide-gray-200">
              <tbody>
                <Tr th="ID :" td={data.id} />
                <Tr th="title :" td={data.title} />
                <Tr th="author :" td={data.author} />
                <Tr th="editor :" td={data.editor} />
                <Tr th="category :" td={data.category.name} />
                <Tr th="supplier :" td={data.supplier.contactName} />
                <Tr th="price :" td={data.price} />
                <Tr th="release Date :" td={data.releaseDate} />
                <Tr th="published :" td={data.published ? 'yes' : 'no'} />
                <Tr th="stock :" td={data.stock} />
                <Tr th="stock Alert :" td={data.stockAlert} />
                <Tr th="created date :" td={data.createdAt} />
                <Tr th="updated date :" td={data.updateAt} />
              </tbody>
            </table>
          </div>
          <div className=" col-span-1">
            <p>photo</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
