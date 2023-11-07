"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function AnimeChart() {
  const [animesPorNota, setAnimesPorNota] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3004/animes");
        if (!response.ok) {
          throw new Error("Erro na solicitação à API");
        }
        const animesData = await response.json();

        const animesPorNota = {};

        animesData.forEach((anime) => {
          const notaAnime = anime.nota || "Sem Nota";
          if (notaAnime in animesPorNota) {
            animesPorNota[notaAnime]++;
          } else {
            animesPorNota[notaAnime] = 1;
          }
        });

        setAnimesPorNota(animesPorNota);
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
          Gráfico de Animes por Nota
        </h1>
      </div>

      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={[
          ["Nota", "Quantidade", { role: "style" }],
          ...Object.entries(animesPorNota).map(([nota, quantidade]) => [
            nota,
            quantidade,
            pickColorByNota(nota),
          ]),
        ]}
        options={{
          titleTextStyle: {
            color: "#333",
            fontSize: 18,
            bold: true,
          },
          hAxis: {
            title: "Nota",
            titleTextStyle: {
              color: "#333",
              fontSize: 14,
            },
            textStyle: {
              color: "#333",
            },
          },
          vAxis: {
            title: "Quantidade",
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

function pickColorByNota(nota) {
  const colorPalette = ["#4CAF50", "#2196F3", "#FFC107", "#FF5722"];

  const notaFloat = parseFloat(nota);
  if (notaFloat >= 4.5) return colorPalette[0];
  if (notaFloat >= 3.5) return colorPalette[1];
  if (notaFloat >= 2.5) return colorPalette[2];
  return colorPalette[3];
}
