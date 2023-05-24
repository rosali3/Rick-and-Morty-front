import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { EpisodesCard } from "../components/episodes-card";

export default function Episodes() {
    const [data, setData] = useState([]);
    const [info, setInfo] = useState();
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
      
    useEffect(() => {
      fetch(`https://rickandmortyapi.com/api/episode/?page=${page}`)
        .then((res) => res.json())
        .then((res) => {
          setData((prev) => [...prev, ...res.results]);
          setInfo(res.info);
        });
    }, [page]);
  
    useEffect(() => {
      fetch(`https://rickandmortyapi.com/api/episode/?name=${searchValue}`)
        .then((res) => res.json())
        .then((res) => {
          setData(res.results);
          setInfo(res.info);
        });
    }, [searchValue]);
  
    return (
      <>
      <Head>
        <title>Episodes R&M</title>
        <meta name="description" content="Episodes R&M<" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <main className={styles.main}>
          {data.map((episode) => (
            <Link href={`/episodes/${episode.id}`} key={episode.id}>
              <EpisodesCard
                name={episode.name}
                air_date={episode.air_date}
                episode={episode.episode}
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
  