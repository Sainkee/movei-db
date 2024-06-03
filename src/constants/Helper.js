

import axios from 'axios';

const TMDB_TOKEN = import.meta.env.VITE_APP_TMBD_TOKEN;

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    Accept: 'application/json',
  },
});

export const fetchData = async (param) => {
    try {
        const response = await api(`/${param}`);
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export default fetchData;