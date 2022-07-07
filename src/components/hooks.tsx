import axios from 'axios';

const fetchData = async (url: string, callback: (value: any) => void) => {
  const res = await axios.get(url, {
    baseURL: 'https://127.0.0.1:8000/api/'
  });
  try {
    callback({ loading: false, data: res.data });
  } catch (err) {
    console.log(err);
  }
};

export default fetchData;
