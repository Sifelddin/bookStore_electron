import axios, { AxiosResponse } from 'axios';

const baseUrl = 'https://127.0.0.1:8000';

export const fetchData = async (url: string, callback: (value: any) => void) => {
  const res = await axios.get(url, {
    baseURL: baseUrl
  });
  try {
    callback({ loading: false, data: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const postData = async (method: string, url: string, data?: object, callback?: any) => {
  return axios({ method, url, baseURL: baseUrl, data })
    .then((res) => callback(res))
    .catch((err) => callback(err.response as AxiosResponse));
};
