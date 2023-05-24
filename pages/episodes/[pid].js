import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EpisodeProfile() {
  const router = useRouter();
  const [data, setData] = useState({});

  useEffect(() => {
    router.query.pid &&
      fetch(`https://rickandmortyapi.com/api/episode/${router.query.pid}`)
        .then((res) => res.json())
        // Логика, если эпизоды будут приходить массивом IRI
        .then(async (res) => {
          if (res.characters?.length) {
            await fetch(
              `https://rickandmortyapi.com/api/character/${res.characters
                .map((characters) => characters.split("/").pop())
                .join(",")}`
            )
              .then((res) => res.json())
              .then((characters) => {
                console.log(characters)
                res.characters = Array.isArray(characters) ? characters : [characters]
              });
          }
          return res;
        })
        .then((res) => setData(res));
  }, [router.query]);

  console.log(data.characters);

  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content="Episode" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button onClick={router.back}>GO BACK</button>
        <h1>{data.name}</h1>
        <div style={{ display: "grid", gridColumn: 2, gap: "10px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <h3>Characters</h3>
            {data?.characters?.map((characters) => (
              <Link key={characters.id} href={`/characters/${characters.id}`}>
                <div>
                    <p>{characters.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}