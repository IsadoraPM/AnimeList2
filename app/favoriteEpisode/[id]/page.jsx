'use client';
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/usuario";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function FavoriteEpisode() {
  const params = useParams();
  const [anime, setAnime] = useState({});
  const { clientId } = useContext(UserContext);
  const { register, handleSubmit, reset } = useForm(); // Adicionei inicialização de useForm

  useEffect(() => {
    async function getAnime() {
      const response = await fetch(`http://localhost:3004/animeApi/animes/2`);
      const dados = await response.json();
      console.log(dados);
      setAnime({
        id: dados.id,
        titulo: dados.titulo,
        genero: dados.genero,
        nota: dados.nota,
        episodios: dados.episodios,
        capa: dados.capa,
      });
    }
    getAnime();
  }, []);

  async function addFavoriteEpisode(data) {
    const favorite = { ...data, clientId: clientId, animeId: anime.id };
    const response = await fetch(`http://localhost:3004/animeApi/favorite-episode/${anime.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(favorite),
    });

    if (response.ok) {
      alert('Episódio adicionado aos favoritos');
      reset();
    } else {
      alert('Erro ao adicionar episódio');
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(addFavoriteEpisode)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titulo">
                Título
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                readOnly
                id="titulo"
                name="titulo"
                type="text"
                value={anime.titulo}
                ref={register}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="episodio">
                Episódio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="episodio"
                name="episodio"
                type="number"
                placeholder="Episódio"
                ref={register}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-laranja hover:bg-laranja-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
