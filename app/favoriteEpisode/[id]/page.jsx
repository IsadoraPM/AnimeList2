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
      try {
        const response = await fetch(`http://localhost:3004/animeApi/animes/${params.id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + localStorage.getItem("User Token"),
          },
        });
        const dados = await response.json();
        setAnime({
          id: dados.id,
          titulo: dados.titulo,
          nota: dados.nota,
          episodios: dados.episodios,
          capa: dados.capa,
        });
      } catch (error) {
        console.error("Erro ao obter informações do anime:", error);
      }
    }
    getAnime();
  }, []);

  async function addFavoriteEpisode(data) {
    try {
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
      
      if (response.ok) {
        toast.success("Episódio adicionado aos favoritos com sucesso!");
      } else {
        toast.error("Você já adicionou algum episódio desse anime aos favoritos!");
      }
    } catch (error) {
      console.error("Erro ao adicionar episódio aos favoritos:", error);
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
    <div className="container mx-auto p-4">
      <div className="text-center">
        <img src={anime.capa} alt="capa" className="w-64 h-auto mx-auto rounded-lg" />
        <h1 className="text-3xl font-bold mt-4">{anime.titulo}</h1>
      </div>
  
      <form onSubmit={handleSubmit(onSubmit)} className="my-4 text-center">
        <label htmlFor="episode" className="block mb-2">Número do Episódio:</label>
        <input {...register("episode")} type="number" id="episode" className="border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500" />
        <button type="submit" className="bg-blue-500 text-white mx-3 px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Adicionar aos Favoritos
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}