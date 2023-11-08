'use client'
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AnimePage({params}) {

  const [favEpisodes, setFavEpisodes] = useState([]);

  


  useEffect(() => {
    async function loadFavEpisodes() {
      try {
        const response = await fetch(`http://localhost:3004/favEp?animeId=${params?.id}`);
        if (response.ok) {
          const favEpisodesData = await response.json();
          setFavEpisodes(favEpisodesData);
        } else {
          toast.error("Erro ao carregar episódios favoritos.");
        }
      } catch (error) {
        console.error("Erro ao carregar episódios favoritos:", error);
        toast.error("Erro ao carregar episódios favoritos. Verifique o console para mais detalhes.");
      }
    }

    loadFavEpisodes();
  }, [params?.id]);
  if (!favEpisodes) {
    return <div>Carregando episódios...</div>;
  }
  return (
    <div className="container mx-auto p-4">
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4">Episódios Favoritos dos Usuários</h2>
      <ul>
        {favEpisodes.map((favEpisode) => (
          <li key={favEpisode.id} className="border p-4 mb-4 rounded-lg shadow-md">
            <p className="text-lg font-bold">Usuário ID: {favEpisode.usuarioId}</p>
            <p className="text-orange-500">Episódio Escolhido: {favEpisode.epEscolhido}</p>
          </li>
        ))}
      </ul>
    </div>

  </div>
  );
}
