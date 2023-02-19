import Nav from "@/components/Nav";
import s from "./index.module.scss";
import { useRouter } from "next/router";
import { useState, useEffect, SyntheticEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
interface MovieType {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  name: string;
  first_air_date: string;
  overview: string;
  vote_average: number;
  runtime: number
  backdrop_path: string
  genres: {
    id: number,
    name: string
  }[],
  spoken_languages: {
    english_name: string
  }[]
}
const Movie = () => {
  const router = useRouter();
  const [movie, setMovie] = useState<MovieType>();
  const { id } = router.query;
  const back = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.back();
  };
  useEffect(() => {
    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=e1c3af0d54d0c6b4b9d257363e6e136e&language=en-US`
      );
      const movieDetails = await data.json();
      setMovie(movieDetails);
      console.log(movieDetails);
      
    };
    fetchMovie();
  }, [id]);
  return (
    <>
      <Head>
        <title>Zeddz Radar - {movie?.title || movie?.name}</title>
        <meta
          name="description"
          content="Zeddz Radar - A next app built by Adele Wisdom for users to search and find information about movies"
        />
        <meta
          name="keywords"
          content="Wisdom, Adele, web, developer, frontend, fullstack, movies, search, portfolio, UI"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={s.Movie}>
        <nav>
          {" "}
          <Link onClick={ back } href="/"> &larr; Back</Link>{" "}
        </nav>
        <div className={s.movieDetails}>
          <span>
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
              height={400}
              width={300}
              alt=""
            />
            <button> Watch Now</button>
          </span>

          <div className={s.description}>
            <h1>
              {movie?.title || movie?.name}{" "}
              <span>&#9733; &#9733; &#9733; &#9733; &#9733;</span>
            </h1>
            <span>
              <small>Rating: {movie?.vote_average}</small>
              <small>Runtime: {movie?.runtime} mins</small>
              <small>
                Released: {movie?.release_date || movie?.first_air_date}
              </small>
            </span>
            <strong>
              <p>Overview:</p>
            </strong>
            <p>{movie?.overview}</p>
            <p><span>Genre:</span> {movie?.genres?.map(genre => <small key={genre.id}>{genre.name }, </small>)}etc</p>
            <p><span>Language(s):</span> {movie?.spoken_languages?.map(lang => <small key={lang.english_name}>{lang.english_name } </small>)}</p>
          
          </div>
        </div>
      </div>
    </>
  );
};
Movie.pageLayout = Nav;

export default Movie;
