import axios from 'axios';

const Movies = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'c0a8af32722551708a91c6cd46bae218',
    language: 'es-ES',
  },
});

export default Movies;
