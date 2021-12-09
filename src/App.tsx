import { useContext, useEffect } from "react";
import "./App.css";
import defaultImg from "./images/small.jpeg";
import { Store } from "./store/Store";
import { IEpisodes, IAction } from "./interfaces";

function App(): JSX.Element {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    state.episodes.length === 0 && fetchData();
  });

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

  const toggleFavAction = (episodes: IEpisodes): IAction => {
    const episodeInFav = state.favourites.includes(episodes);
    let dispatchObj = {
      type: "ADD_FAV",
      payload: episodes,
    };
    if (episodeInFav) {
      const newFavirote = state.favourites.filter(
        (item: any) => item.id !== episodes.id
      );
      dispatchObj = { type: "REMOVE_FAV", payload: newFavirote };
    }

    return dispatch(dispatchObj);
  };
  console.log(state);
  return (
    <>
      <header className="header">
        <div>
          <h1>Rick and Morty</h1>
          <p>Pick your favourite episodes!!! </p>
        </div>
        <div>Favorites: {state.favourites.length}</div>
      </header>
      <section className="episode-layout">
        {state.episodes.map((episode: IEpisodes) => {
          return (
            <aside key={episode.id} className="episode-box">
              <img
                src={defaultImg || episode.url}
                alt={`Rick and Mort ${episode.name}`}
              />
              <p>{episode.name}</p>
              <div className="season">
                <p>
                  Season: {episode.season} Number:{episode.number}
                </p>

                <button type="button" onClick={() => toggleFavAction(episode)}>
                  {state.favourites.find(
                    (fev: IEpisodes) => fev.id === episode.id
                  )
                    ? "UnFav"
                    : "Fav"}
                </button>
              </div>
            </aside>
          );
        })}
      </section>
    </>
  );
}

export default App;
