'use client'
import { UserContext } from "@/app/contexts/usuario";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function favEpPage(){
  const { register, handleSubmit, reset } = useForm();
  const params = useParams();
  const {id} = params;
  const { userId,username,status } = useContext(UserContext);

  const [anime, setAnime] = useState(null);
  const [generos, setGeneros] = useState([]);
  const [favEp, setFavEp] = useState([]);

  useEffect(() => {
    async function carregarAnime() {
      try {
        const response = await fetch("http://localhost:3004/animes/" + id);
        if (response.ok) {
          const animeData = await response.json();
          console.log(animeData);
          setAnime(animeData);
          setSelectedGenre(animeData.genero);
        } else {
          toast.error("Erro ao carregar detalhes do anime.");
        }
      } catch (error) {
        console.error("Erro ao carregar anime:", error);
        toast.error("Erro ao carregar anime. Verifique o console para mais detalhes.");
      }
    }

    async function carregarGeneros() {
      try {
        const response = await fetch("http://localhost:3004/generos");
        if (response.ok) {
          const generosData = await response.json();
          console.log(generosData);
          setGeneros(generosData);
        } else {
          toast.error("Erro ao carregar gêneros.");
        }
      } catch (error) {
        console.error("Erro ao carregar gêneros:", error);
        toast.error("Erro ao carregar gêneros. Verifique o console para mais detalhes.");
      }
    }

    async function carregarFavEp() {
      try {
        const response = await fetch("http://localhost:3004/favEp");
        if (response.ok) {
          const favEpData = await response.json();
          console.log(favEpData);
          setFavEp(favEpData);
        } else {
          toast.error("Erro ao carregar lista de episódios favoritos.");
        }
      } catch (error) {
        console.error("Erro ao carregar lista de episódios favoritos:", error);
        toast.error("Erro ao carregar lista de episódios favoritos. Verifique o console para mais detalhes.");
      }
    }
    carregarAnime();
    carregarGeneros();
    carregarFavEp();
  }, [params.id]);

  const onSubmit = async (data) => {
    const { epEscolhido } = data;
    const favEpData = {
      usuarioId: parseInt(userId, 10), // Certifique-se de que seja um número inteiro
      animeId: parseInt(id, 10), // Certifique-se de que seja um número inteiro
      epEscolhido: epEscolhido,
    };
  
    try {
      const response = await fetch("http://localhost:3004/favEp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favEpData),
      });
  
      if (response.ok) {
        toast.success("Novo favEp criado com sucesso!");
        reset();
      } else {
        toast.error("Erro ao criar novo favEp.");
      }
    } catch (error) {
      console.error("Erro ao criar novo favEp:", error);
      toast.error("Erro ao criar novo favEp. Verifique o console para mais detalhes.");
    }
  };

  return (
    <div className="container mx-auto p-4">

  
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      
      {anime ? <div> 
        {/* anime info */}
        <h1>
          {anime?.titulo}
        </h1>
        <h1>
          {anime?.genero}
        </h1>
        <h1>
          {anime?.temporadas}
        </h1>
        <img src={anime?.capa ?? ""} alt="" />
      </div>:"Carregando..."}

        <div className="mb-4">
          {status === "logado"? <h1 className="text-2xl font-bold mb-4">Anime: ${anime?.titulo}</h1> : null}
          {status === "deslogado"? <h1 className="text-2xl font-bold mb-4">Usuário não autenticado</h1> : null}
          {status === "loading"? <h1 className="text-2xl font-bold mb-4">Carregando</h1> : null}

          <label htmlFor="usuarioId" className="block text-gray-700 text-sm font-bold mb-2">ID do Usuário:</label>
       <h1>{userId}</h1>
        </div>
        <div className="mb-4">
          
        </div>
        <div className="mb-4">
          <label htmlFor="epEscolhido" className="block text-gray-700 text-sm font-bold mb-2">Episódio Escolhido:</label>
          <input
            type="text"
            {...register("epEscolhido")}
            id="epEscolhido"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Digite o episódio escolhido"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Criar novo favEp
          </button>
        </div>
      </form>
    </div>
  );
  
  
  
  
}
