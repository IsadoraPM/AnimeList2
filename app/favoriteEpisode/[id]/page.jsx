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
        nota: dados.nota,
        episodios: dados.episodios,
        capa: dados.capa,
      });
    }
    getAnime();
  }, []);



  return (
    <div className="container mx-auto">
        <p className="bg-blend-color-dodge">
          <img src={anime.capa} alt="capa" />
        </p>
    </div>
  );
}
