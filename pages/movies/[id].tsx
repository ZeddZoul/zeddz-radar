import Nav from "@/components/Nav";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
interface MovieType {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  name: string;
  first_air_date: string;
}
const Movie = () => {
  const router = useRouter();
  const [movie, setMovie] = useState<MovieType>();
  const { id } = router.query;
  useEffect(() => {
    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=e1c3af0d54d0c6b4b9d257363e6e136e&language=en-US`
      );
      const movieDetails = await data.json();
      setMovie(movieDetails);
    };
    fetchMovie();
  }, [id]);

  console.log(movie);
  return (
    
      <div>
        <nav>
          {" "}
          <Link href="/movies"> &larr; Back to Movies</Link>{" "}
        </nav>
      </div>
    
  );
};
Movie.pageLayout = Nav;

export default Movie;
