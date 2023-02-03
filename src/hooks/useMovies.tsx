import {useEffect, useState} from 'react';
import Movies from '../api/Movies';
import {Movie, MovieApiResponse} from '../interfaces/MovieInterface';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovies = () => {
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const getNowPlayingMovies = async () => {
    const nowPlayingPromise = Movies.get<MovieApiResponse>('/now_playing');
    const popularPromise = Movies.get<MovieApiResponse>('/popular');
    const topratedPromise = Movies.get<MovieApiResponse>('/top_rated');
    const upcomingPromise = Movies.get<MovieApiResponse>('/upcoming');

    const responses = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topratedPromise,
      upcomingPromise,
    ]);

    setMoviesState({
      nowPlaying: responses[0].data.results,
      popular: responses[1].data.results,
      topRated: responses[2].data.results,
      upcoming: responses[3].data.results,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};
