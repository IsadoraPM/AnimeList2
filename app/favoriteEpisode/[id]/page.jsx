'use client';
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/usuario";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FavoriteEpisode() {
  const params = useParams();
  const [anime, setAnime] = useState({});
  const { clientId } = useContext(UserContext);
  const { register, handleSubmit, reset } = useForm(); 


  useEffect(() => {
    async function getAnime() {
      const response = await fetch(`http://localhost:3004/animeApi/animes/${params.id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": "Bearer " + localStorage.getItem("User Token"),
        },
      });
      const dados = await response.json();
      console.log(dados);
      setAnime({
        id: dados.id,
        titulo: dados.titulo,
        nota: dados.nota,
        episodios: dados.episodios,
        capa: dados.capa,
      });
    }
    getAnime();
  }, []);

  async function addFavoriteEpisode(data) {
    data.episode = Number(data.episode);

    const response = await fetch(`http://localhost:3004/animeApi/favorite-episode/${params.id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + localStorage.getItem("User Token"),
      },
      body: JSON.stringify(data),
    });

    const dados = await response.json();
    console.log(dados);
    
    // Adiciona a notificação de sucesso ou erro usando react-toastify
    if (response.ok) {
      toast.success("Episódio adicionado aos favoritos com sucesso!");
    } else {
      toast.error("Voce ja adicionou algum episódio desse anime aos favoritos!");
    }
  }

  const onSubmit = async (data) => {
    try {
      await addFavoriteEpisode(data);
      reset();
    } catch (error) {
      console.error("Erro ao adicionar episódio aos favoritos:", error);
    }
  };
  
  return (
    <div className="container mx-auto">
      <div>
        <img src={anime.capa} alt="capa" />
      </div>
      <h1>{anime.titulo}</h1>
  
      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
        <label htmlFor="episode">Número do Episódio:</label>
        <input {...register("episode")} type="number" id="episode" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Adicionar aos Favoritos
        </button>
      </form>

      {/* Componente ToastContainer do react-toastify */}
      <ToastContainer />
    </div>
  );
}
