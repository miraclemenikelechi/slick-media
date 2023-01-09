import { useEffect, useState } from "react";
import logo from "./assets/logo.svg";
import Movie from "./components/Movie";

function App() {
  const
    myApiKey = import.meta.env.VITE_API_KEY,
    apiURL = `http://www.omdbapi.com/?apikey=${myApiKey}`,

    [movies, setMovies] = useState([]),

    // ? seperating movies from series
    movie = movies.filter(function (movie) {
      return (
        movie.Type == "movie"
      );
    }),
    series = movies.filter(function (movie) {
      return (
        movie.Type == "series"
      );
    }),

    forMovie = (search) => {
      const movies = search.filter(function (movie) {
        return (
          movie.Type == "movie"
        );
      });
      return movies;
    },

    // ? search functionality
    [search, setSearch] = useState(""),
    searchMovies = async function (title) {
      const
        request = await fetch(`${apiURL}&s=${title}`),
        response = await request.json(),
        data = response.Search;

      if (data) {
        setMovies(data);
      }
    };

  useEffect(() => {
    searchMovies(search);
  }, [search]);

  return (
    <section className="container">
      <header>
        <div className="logo">
          <span>
            <img src={logo} alt="logo" />
          </span>
        </div>
        <div className="hero">
          <h2>Watch something incredible.</h2>
        </div>
      </header>
      <main>
        <div className="search">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={"Search for a Movie or Series"}
          />
        </div>
        <div className="movies">
          <h2>Movies</h2>
          {
            movies.length > 0 && movie?.length > 0 ?
              (
                <Movie movies={movie} />
              ) :
              <h3>No Movies found for this search</h3>
          }
        </div>
        <div className="movies">
          <h2>Series</h2>
          {
            movies.length > 0 && series.length > 0 ?
              (
                <Movie movies={series} />
              ) :
              <h3>No Series found for this search</h3>
          }
        </div>
      </main>
    </section>
  );
};

export default App;