import Nav from "@/components/Nav";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import s from "./index.module.scss";
import { useMemo, useState } from "react";
interface Movies {
  moviesList: {
    id: number;
    title: string;
    release_date: string;
    first_air_date: string;
    poster_path: string;
    name: string;
    genre_ids: number[] | any ;
  }[];
  error: string;
}
interface Filter {
  id?: number;
  name: string;
}
export default function Home({ moviesList, error }: Movies) {
  const [filter, setFilter] = useState<Filter>({name: "None"});

  return (
    <>
      <Head>
        <title>Zeddz Radar - Home for all things movies</title>
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
      <>
        {error && <p className={s.error}>{error}</p>}
        {/* Render filters if there's no error when fetching movies */}
        {error || (
          <div className={s.filter__container}>
            <div className={s.filterr}>
              <p>
                {" "}
                <span>Filter:</span>
                <small> {filter.name}</small>
              </p>
              <ul>
                <li>By Genre:</li>
                <input type="checkbox" />
                <ul>
                  <p onClick={() => setFilter({ name: "None" })}>
                    None
                  </p>
                  <p onClick={() => setFilter({ id: 14, name: "Fantasy" })}>
                    Fantasy
                  </p>
                  <p onClick={() => setFilter({ id: 35, name: "Comedy" })}>
                    Comedy
                  </p>
                  <p onClick={() => setFilter({ id: 28, name: "Comedy" })}>
                    Action
                  </p>
                  <p onClick={() => setFilter({ id: 12, name: "Comedy" })}>
                    Adventure
                  </p>
                  <p onClick={() => setFilter({ id: 878, name: "Comedy" })}>
                    SciFi
                  </p>
                </ul>
              </ul>
              <ul>
                <li>By Release date:</li>
                <input type="checkbox" />
                <ul className={s.sec}>
                  <p onClick={() => setFilter({ id: 35, name: "Comedy" })}>
                    This week
                  </p>
                  <p onClick={() => setFilter({ id: 35, name: "Comedy" })}>
                    This month
                  </p>
                  <p onClick={() => setFilter({ id: 35, name: "Comedy" })}>
                    This year
                  </p>
                </ul>
              </ul>
            </div>
          </div>
        )}
        <div className={s.main}>
          {filter.id
            ? moviesList
                ?.filter((movie) => movie?.genre_ids?.includes(filter.id))
                .map(
                  (
                    {
                      id,
                      name,
                      title,
                      release_date,
                      poster_path,
                      first_air_date,
                    },
                    index
                  ) => (
                    <Link key={id} href={`/movies/${id}`}>
                      <div className={s.card}>
                        <Image
                          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                          height={250}
                          width={200}
                          alt=""
                        />
                        <p>Title: {title || name}</p>
                        <small>
                          Release date: {release_date || first_air_date}
                        </small>
                      </div>
                    </Link>
                  )
                )
            : moviesList
                .map(
                  (
                    {
                      id,
                      name,
                      title,
                      release_date,
                      poster_path,
                      first_air_date,
                    },
                    index
                  ) => (
                    <Link key={id} href={`/movies/${id}`}>
                      <div className={s.card}>
                        <Image
                          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                          height={250}
                          width={200}
                          alt=""
                        />
                        <p>Title: {title || name}</p>
                        <small>
                          Release date: {release_date || first_air_date}
                        </small>
                      </div>
                    </Link>
                  )
                )}
        </div>
      </>
    </>
  );
}
Home.pageLayout = Nav;
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const fetcher = await fetch(
      "https://api.themoviedb.org/3/trending/all/day?api_key=e1c3af0d54d0c6b4b9d257363e6e136e"
    );
    const data = await fetcher.json();
    const moviesList = data.results;
    return {
      props: {
        moviesList,
      },
    };
  } catch (error: any) {
    console.log(error);

    return {
      props: {
        error:
          "Could not process Your request at the moment please check your internet connection or try again later",
      },
    };
  }
};
