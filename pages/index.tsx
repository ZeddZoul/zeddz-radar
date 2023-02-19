import Nav from "@/components/Nav";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import s from "./index.module.scss";
import { useState } from "react";
interface Movies {
 moviesList: {
   id: number,
   title: string,
   release_date: string,
   first_air_date: string,
   poster_path: string,
  name: string
 }[]
  error: string
};
export default function Home({ moviesList, error }: Movies) {
  const [myMoviesList, setMyMoviesList] =useState(moviesList)
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
        <div className={s.main}>
          {error && <p className={s.error}>{error}</p>}
          {myMoviesList?.map(
            (
              { id, name, title, release_date, poster_path, first_air_date },
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
                  <small>Release date: {release_date || first_air_date}</small>
                </div>
              </Link>
            )
          )}
        </div>
      </>
    </>
  );


}
Home.pageLayout = Nav
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

}
   catch (error: any) {
    console.log(error);

    return {
      props: {
        error:
          "Could not process Your request at the moment please check your internet connection or try again later",
      },
    };
  }
};
