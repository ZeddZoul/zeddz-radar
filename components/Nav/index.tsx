import s from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import logo from "/public/favicon2.png";

const Nav: FC = () => {
  const nav = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<string>("Filter");
  const el = nav.current;
  const menu = () => {
    el?.classList.toggle(`${s.showMenu}`);
  };
  return (
    <header ref={nav} className={s.Header}>
      <div className={s.static}>
        <div className={s.Logo}>
          <Link href="/">
            <Image priority src={logo} alt="" height={80} />
            <h1>.Radar</h1>
          </Link>
        </div>

        <span className={s.search}>
          <input type="search" placeholder="Search" />
          <button> &rarr; </button>
        </span>
      </div>
      <nav ref={nav} className={s.nav}>
        <Link href="/">Trending</Link>
        <Link href="/">Tv shows</Link>
        <Link href="/">Trending</Link>
        <li>
          {" "}
          {filter} v
          <ul>
            <li onClick={() => setFilter("Genre")}>Genre</li>
            <li onClick={() => setFilter("Release date")}>Release date</li>
          </ul>
        </li>
      </nav>
      <p>&#9776;</p>
    </header>
  );
};

export default Nav;
