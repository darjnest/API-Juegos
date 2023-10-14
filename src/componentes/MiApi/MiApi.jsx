import React from 'react';
import { useState, useEffect } from 'react';
import Buscador from '../Buscador';
import './MiApi.css';

export default function MiApi() {
  const API_KEY = 'a2fee76310mshf6fbdd91216cb8ep1bb156jsn128258abf7c0';
  const API_HOST = 'free-to-play-games-database.p.rapidapi.com';
  const iconWindows = 'fa-brands fa-windows fa-lg';
  const iconBrowser = 'fa-solid fa-window-maximize fa-lg';

  const [dataGames, setDataGames] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  const consultarApi = () => {
    const url = `https://${API_HOST}/api/games`;
    const options = {
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => setDataGames(data))
      .catch((error) => {
        console.log('Hubo un problema con la petición:' + error.message);
      });
  };

  useEffect(() => {
    consultarApi();
  }, []);

  function ordenarPor(game1, game2) {
    if (sort === 'date_asc') {
      const date1 = new Date(game1.release_date);
      const date2 = new Date(game2.release_date);
      return date1 - date2;
    }
    if (sort === 'date_des') {
      const date1 = new Date(game1.release_date);
      const date2 = new Date(game2.release_date);
      return date2 - date1;
    }
    if (sort === 'az') {
      return game1.title.localeCompare(game2.title);
    }
    if (sort === 'za') {
      return game2.title.localeCompare(game1.title);
    }
  }

  const showGames = dataGames
    .filter((game) => game.title.toLowerCase().includes(search.toLowerCase()))
    .sort(ordenarPor)
    .map((game) => (
      <div key={game.id} className="col">
        <div className="card h-100">
          <a href={game.game_url} title="Ir al juego por más Detalles">
            <img
              src={game.thumbnail}
              className="card-img-top"
              alt={'Foto' + game.title}
            />
          </a>
          <div className="card-body">
            <h5 className="card-title">{game.title}</h5>
            <p className="card-text">
              {game.short_description.slice(0, 50) + '...'}
            </p>
          </div>
          <div className="card-footer">
            <small className="text-body-secondary" title="Fecha lanzamiento">
              {game.release_date}
            </small>
            <small className="text-body-secondary">
              <span className="badge bg-secondary">{game.genre}</span>
              <i
                className={
                  game.platform === 'Web Browser' ? iconBrowser : iconWindows
                }
                title={game.platform}
              ></i>
            </small>
          </div>
        </div>
      </div>
    ));

  return (
    <main>
      <Buscador searchGames={setSearch} sortGames={setSort} />
      <div className="games row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
        {showGames}
      </div>
    </main>
  );
}
