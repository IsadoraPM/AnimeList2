"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function AnimeChart() {
  const [episodesData, setEpisodesData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3004/animeApi/favorite-episode/popular", {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + localStorage.getItem("User Token"),
          },
        });

        if (!response.ok) {
          throw new Error("Erro na solicitação à API");
        }

        const episodesData = await response.json();
        console.log(episodesData);

        setEpisodesData(episodesData);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="mt-10 p-6 bg-gelo rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="font-bold text-gray-800 text-2xl">
          Gráfico de Episódios Mais Favoritados
        </h1>
      </div>

      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={[
          ["Anime", "Episódio", "Quantidade de Favoritos", { role: "style" }],
          ...episodesData.map((episode) => [
            episode.animeTitulo,
            parseInt(episode.favoriteEpisode_episode, 10), // Convertendo para número
            parseInt(episode.userCount, 10), // Convertendo para número
            pickColorByCount(parseInt(episode.userCount, 10)),
          ]),
        ]}
        options={{
          titleTextStyle: {
            color: "#333",
            fontSize: 18,
            bold: true,
          },
          hAxis: {
            title: "Anime e Episódio",
            titleTextStyle: {
              color: "#333",
              fontSize: 14,
            },
            textStyle: {
              color: "#333",
            },
          },
          vAxis: {
            title: "Quantidade de Favoritos",
            titleTextStyle: {
              color: "#333",
              fontSize: 14,
              italic: false,
            },
            textStyle: {
              color: "#333",
            },
          },
        }}
      />
    </div>
  );
}

function pickColorByCount(count) {
  // Defina sua lógica para escolher a cor com base na contagem
  // Exemplo simples: escolher verde se mais de 5 favoritos, senão azul
  return count > 5 ? "green" : "blue";
}