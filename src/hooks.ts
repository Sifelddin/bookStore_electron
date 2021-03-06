import axios, { AxiosRequestHeaders } from 'axios';

// export const baseUrl = ((): string => {
//   if (import.meta.env.DEV) return <string>import.meta.env.VITE_BASE_URL_DEV;
//   return <string>import.meta.env.VITE_BASE_URL_PROD;
// })();

export const baseUrl = import.meta.env.DEV
  ? <string>import.meta.env.VITE_BASE_URL_DEV
  : <string>import.meta.env.VITE_BASE_URL_PROD;

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

// postData function used for the posting data operations : post,delete,put
export const postData = async (method: string, url: string, headers?: AxiosRequestHeaders, data?: object) => {
  return axios({ method, url, baseURL: baseUrl, headers, data });
  // .then((res) => (callback ? callback(res) : console.log(res)))
  // .catch((err) => (callback ? callback(err.response as AxiosResponse) : console.log(err)));
};
