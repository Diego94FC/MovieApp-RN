import {useState, useEffect} from 'react';
import {FullMovieDetails} from '../interfaces/MovieInterface';
import Movies from '../api/Movies';
import {Cast, CreditsResponse} from '../interfaces/CreditsInterface';

interface MovieDetails {
  isLoading: boolean;
  fullMovieInfo?: FullMovieDetails;
  cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    fullMovieInfo: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    const movieDetailsPromise = Movies.get<FullMovieDetails>(`/${movieId}`);
    const castPromise = Movies.get<CreditsResponse>(`/${movieId}/credits`);

    const [movieDetailsResponse, castResponse] = await Promise.all([
      movieDetailsPromise,
      castPromise,
    ]);

    setState({
      isLoading: false,
      fullMovieInfo: movieDetailsResponse.data,
      cast: castResponse.data.cast,
    });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...state,
  };
};
