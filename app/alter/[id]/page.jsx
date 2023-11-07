"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Alteracao = () => {
  const { register, handleSubmit, reset } = useForm();
  const params = useParams();

  const [anime, setAnime] = useState(null);
  const [generos, setGeneros] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    async function carregarAnime() {
      try {
        const response = await fetch(
          "http://localhost:3004/animes/" + params.id
        );
        if (response.ok) {
          const animeData = await response.json();
          setAnime(animeData);
          setSelectedGenre(animeData.genero);
        } else {
          toast.error("Erro ao carregar detalhes do anime.");
        }
      } catch (error) {
        console.error("Erro ao carregar anime:", error);
        toast.error(
          "Erro ao carregar anime. Verifique o console para mais detalhes."
        );
      }
    }

    async function carregarGeneros() {
      try {
        const response = await fetch("http://localhost:3004/generos");
        if (response.ok) {
          const generosData = await response.json();
          setGeneros(generosData);
        } else {
          toast.error("Erro ao carregar gêneros.");
        }
      } catch (error) {
        console.error("Erro ao carregar gêneros:", error);
        toast.error(
          "Erro ao carregar gêneros. Verifique o console para mais detalhes."
        );
      }
    }

    carregarAnime();
    carregarGeneros();
  }, [params.id]);

  const enviaDados = async (data) => {
    const anime = await fetch("http://localhost:3004/animes/" + params.id, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ...data }),
    });
    if (anime.status == 200) {
      toast.success("Alterado com sucesso!");
    } else {
      toast.error("Erro ao fazer alteração!");
    }
  };

  return (
    <div className="container mx-auto mt-5 p-6 bg-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Alteração de Anime
      </h2>
      {anime && (
        <form onSubmit={handleSubmit(enviaDados)}>
          <div className="mb-4">
            <label
              htmlFor="nome"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Nome
            </label>
            <input
              type="text"
              id="titulo"
              {...register("titulo")}
              className="border rounded text-orange-500 w-full py-2 px-3"
              defaultValue={anime.titulo}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="genero"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Gênero
            </label>
            <select
              id="genero"
              {...register("genero")}
              className="border rounded w-full py-2 px-3 text-orange-500"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              required
            >
              <option value="" disabled>
                Selecione o gênero
              </option>
              {generos.map((genero) => (
                <option key={genero.id} value={genero.nome}>
                  {genero.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="temporadas"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Temporadas
            </label>
            <input
              type="number"
              id="temporadas"
              {...register("temporadas")}
              className="border rounded text-orange-500 w-full py-2 px-3"
              defaultValue={anime.temporadas}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="episodios"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Episódios
            </label>
            <input
              type="number"
              id="episodios"
              {...register("episodios")}
              className="border rounded text-orange-500 w-full py-2 px-3"
              defaultValue={anime.episodios}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="produtora"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Produtora
            </label>
            <input
              type="text"
              id="produtora"
              {...register("produtora")}
              className="border rounded text-orange-500 w-full py-2 px-3"
              defaultValue={anime.produtora}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="capa"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Capa
            </label>
            <input
              type="url"
              id="capa"
              {...register("capa")}
              className="border rounded w-full text-orange-500 py-2 px-3"
              defaultValue={anime.capa}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="nota"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Nota
            </label>
            <input
              type="number"
              id="nota"
              {...register("nota")}
              className="border rounded text-orange-500 w-full py-2 px-3"
              defaultValue={anime.nota}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-3"
          >
            Atualizar
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Limpar
          </button>
        </form>
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Alteracao;
