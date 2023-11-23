"use client";
import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/navigation";
import AnimeList from "../components/AnimeList";
import Pesq from "../components/Pesq";
export default function Listing() {
  const [animes, setAnimes] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [userRole, setUserRole] = useState("");
  const router = useRouter();

  async function getAllAnimes() {
    const response = await fetch("http://localhost:3004/animeApi/animes");
    const data = await response.json();
    console.log(data);
    setAnimes(data);
  }

  useEffect(() => {
    const storedUserRole = localStorage.getItem("User Role");
    setUserRole(storedUserRole);
  }, []);
  useEffect(() => {
    getAllAnimes();
  }, []);

  useEffect(() => {
    async function getGeneros() {
      const response = await fetch("http://localhost:3004/animeApi/generos");
      const data = await response.json();
      console.log(data);
      setGeneros(data);
    }
    getGeneros();
  }, []);

  async function deleteAn(id) {
    const response = await fetch(
      `http://localhost:3004/animeApi/animes/${id}`,
      {
        method: "DELETE",
      }
    );
    console.log(response);
    setAnimes(animes.filter((anime) => anime.id !== id));
  }

  function filtrarAnime(data) {
    async function getAnimes() {
      const response = await fetch(
        "http://localhost:3004/animeApi/animes?titulo_like=" + data.pesq
      );
      console.log(response);
      const dados = await response.json();
      setAnimes(dados);
    }
    getAnimes();
  }

  function ordenarNota() {
    async function getAnimes() {
      const response = await fetch(
        "http://localhost:3004/animes?_sort=nota&_order=desc"
      );
      console.log(response);
      const dados = await response.json();
      setAnimes(dados);
    }
    getAnimes();
  }

  async function alterarDestaque(id) {
    try {
      const response = await fetch(
        "http://localhost:3004/animeApi/animes/destaque/" + id,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + localStorage.getItem("Token"),

          },
        }
      );
      await response.json();
      await getAllAnimes()
    } catch (error) {
      console.error('Catch', error)
    }
  }


  return (
    <div>
      <Pesq filtrarAnime={filtrarAnime} ordenarNota={ordenarNota} />
      <table className="min-w-full divide-y divide-gray-200 bg-fundo">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Imagem
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gênero
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Produtora
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Número de temporadas
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Número de episódios
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nota
            </th>
            {userRole === "admin" && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>)}
          </tr>
        </thead>
        <tbody>
          {animes?.map((anime) => (
            <AnimeList
              key={anime.id}
              anime={anime}
              delete={() => deleteAn(anime.id)}
              alter={() => router.push("alter/" + anime.id)}
              alterNote={() => router.push("alterNote/" + anime.id)}
              alterDestaque={() => alterarDestaque(anime.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
