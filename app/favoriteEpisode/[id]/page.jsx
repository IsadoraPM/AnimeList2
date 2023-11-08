'use client'
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/usuario";
import { useParams } from "next/navigation";
import { useState } from "react";  // Adicionei importação ausente
import { useForm } from "react-hook-form";  // Adicionei importação ausente

export default function FavoriteEpisode() {
  const params = useParams();
  const [anime, setAnime] = useState({});
  const { clientId } = useContext(UserContext);
  const { register, handleSubmit } = useForm();  // Adicionei inicialização de useForm

  useEffect(() => {
    async function getAnime() {
      const response = await fetch(`http://localhost:3004/animes/${params.id}`);
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
  }, []);  // Adicionei o segundo argumento vazio para evitar execuções infinitas

  async function addFavoriteEpisode(data) {
    const favorite = { ...data, clientId: clientId, animeId: anime.id };  // Corrigi o uso de "dados" para "data"
    const response = await fetch(`http://localhost:3004/animes/${anime.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(favorite)
    });

    if (response.ok) {
      alert('Episódio adicionado aos favoritos');
      reset();  
    } else {
      alert('Erro ao adicionar episódio');
    }
  }

  return (
    <h5>{anime.titulo}</h5>
  
    )
}
