import { useContext, useEffect } from "react";
import "./App.css";
import { Store } from "./store/Store";

interface IEpisodes {
  airdate: string;
  airstamp: string;
  airtime: string;
  id: number;
  image: {
    medium: string;
    original: string;
  };
  name: string;
  number: number;
  rating: { average: null };
  runtime: number;
  season: number;
  summary: string;
  type: string;
  url: string;
}

function App(): JSX.Element {
  const { state, dispatch } = useContext(Store);

  const fetchData = async () => {
    const URL =
      "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";

    const data = await fetch(URL);
    const dataJSON = await data.json();
    return dispatch({
      type: "FETCH_DATA",
      payload: dataJSON._embedded.episodes,
    });
  };
  useEffect(() => {
    state.episodes.length === 0 && fetchData();
  });
  console.log(state.episodes);
  return (
    <>
      <header className="header">
        <h1>Rick and Morty</h1>
        <p>Pick your favourite episodes!!! </p>
      </header>
      <section className="episode-layout">
        {state.episodes.map((episode: IEpisodes) => {
          return (
            <aside key={episode.id} className="episode-box">
              <img
                src={episode.image.medium}
                alt={`Rick and Mort ${episode.name}`}
              />
              <p>{episode.name}</p>
              <div>
                Season: {episode.season} Number:{episode.number}
              </div>
            </aside>
          );
        })}
      </section>
    </>
  );
}

export default App;
