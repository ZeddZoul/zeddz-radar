import s from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import logo from "/public/favicon2.png";
import { useRouter } from "next/router";
const Nav: FC = () => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState<string>("");


  return (
    <header className={s.Header}>
      <div className={s.static}>
        <div className={s.Logo}>
          <Link href="/">
            <Image priority src={logo} alt="" height={80} />
            <h1>.Radar</h1>
          </Link>
        </div>

        <span className={s.search}>
          <input
            onChange={(e) => setInputValue(e.target.value)}
            type="search"
            value={inputValue}
            placeholder="Search"
          />
          <button onClick={() => router.push(`/search/${inputValue}`)}> &rarr; </button>
          <div className={s.search_results}>{}</div>
        </span>
      </div>
      <nav className={s.nav}>
        <Link href="/">Trending</Link>
        <Link href="/">Tv shows</Link>
        <Link href="/">Anime</Link>
       
      </nav>
      <p>&#9776;</p>
    </header>
  );
};

export default Nav;
