import axios, { AxiosRequestHeaders } from 'axios';
import { FormInputs } from './components/interfaces';

// export const baseUrl = ((): string => {
//   if (import.meta.env.DEV) return <string>import.meta.env.VITE_BASE_URL_DEV;
//   return <string>import.meta.env.VITE_BASE_URL_PROD;
// })();

export const baseUrl = import.meta.env.DEV
  ? <string>import.meta.env.VITE_BASE_URL_DEV
  : <string>import.meta.env.VITE_BASE_URL_PROD;

export const fetchData = async (url: string, callback: (value: any) => void) => {
  const token = localStorage.getItem('token');
  return axios
    .get(url, {
      baseURL: baseUrl,
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => callback({ loading: false, data: res.data }));
};

// postData function used for the posting data operations : post,delete,put
export const postData = async (method: string, url: string, headers?: AxiosRequestHeaders, data?: object) => {
  const token = localStorage.getItem('token');
  return axios({ method, url, baseURL: baseUrl, headers: { Authorization: `Bearer ${token}` }, data });
};

export const inputFormData = (data: FormInputs) => {
  const formData = new FormData();
  const arr = Object.keys(data) as (keyof FormInputs)[];

  arr.map((field) => {
    if (field === 'imageFile') {
      if (data[field][0]) {
        formData.append(field, data[field][0]);
      }
    } else if (field === 'published') {
      formData.append(field, data[field].toString());
    } else {
      formData.append(field, data[field]?.toString() || '');
    }

    return formData;
  });
  return formData;
};
