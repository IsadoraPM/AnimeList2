'use client';
import React, { useEffect, useState } from 'react';
import AnimeListFav from '../components/ListAnimeFav';

export default function UserFavoriteAnimesPage() {
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3004/animeApi/favorite-episode',
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('User Token'),
          },
        });
        const data = await response.json();
        console.log(data);
        setUserFavorites(data); 
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  async function deleteFavoriteEpisode(id) {
    const response = await fetch(`http://localhost:3004/animeApi/favorite-episode/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + localStorage.getItem('User Token'),
      },
    });
    setUserFavorites(userFavorites.filter((favorite) => favorite.id !== id));
  }

  return (
    <div>
      <h1>Meus Animes Favoritos</h1>
      {userFavorites.map((favorite) => (
        <AnimeListFav key={favorite.id} favoriteAnime={favorite}
        onDelete={deleteFavoriteEpisode} />
      ))}
    </div>
  );
};

