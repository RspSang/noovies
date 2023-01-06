const API_KEY = "63499326424116264172142ac5886cd9";
const BASE_URL = `https://api.themoviedb.org/3`;

const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ja-JP&page=1&region=JP`
  ).then((res) => res.json());
const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ja-JP&page=1&region=JP`
  ).then((res) => res.json());

export const moviesApi = { trending, upcoming, nowPlaying };
