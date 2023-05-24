import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CharactersCard } from "../components/characters-card";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
    
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setData((prev) => [...prev, ...res.results]);
        setInfo(res.info);
      });
  }, [page]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?name=${searchValue}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.results);
        setInfo(res.info);
      });
  }, [searchValue]);

  return (
    <>
      <Head>
        <title>Rick and Morty</title>
        <meta name="description" content="Rick and Morty project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <main className={styles.main}>
        {data.map((character) => (
          <Link href={`/characters/${character.id}`} key={character.id}>
            <CharactersCard
              name={character.name}
              species={character.species}
              image={character.image}
            />
          </Link>
        ))}

        {info?.next && (
          <button onClick={() => setPage((prev) => ++prev)}>LOAD MORE</button>
        )}
      </main>
    </>
  );
}
