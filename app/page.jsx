'use client'

import { useEffect, useState } from "react"
import ItemAnime from './components/ItemAnime';

export default function Home() {
  const [animes, setAnimes] = useState([])


  useEffect(() => {
    async function getAnimes() {
      const response = await fetch("http://localhost:3004/animeApi/animes/")
      const dados = await response.json()
      setAnimes(dados)
    }
    getAnimes()
  }, [])
  const animesReversos = [...animes].reverse();



  return (

    <div>
      <div className="relative">
        <img src="./jujutsu.png" alt="jujutsu" />
        <div className="absolute inset-0 flex items-center mx-4">
          <div className="flex flex-col items-start text-white">
            <img src="./Jujutsu_Kaisen.png" alt="logoJujutsu" className="w-2/3 md:w-2/5 lg:w-2/6" />
            <p className="text-sm md:text-base lg:text-lg" style={{ maxWidth: '34rem' }}>
              “Sofrimento, arrependimento, vergonha: os sentimentos negativos dos humanos tornam-se Maldições, causando terríveis acidentes que podem levar até mesmo à morte.
              E pra piorar, Maldições só podem ser exorcizadas por outras Maldições.
              Certo dia, para salvar amigos que estavam sendo atacados por Maldições,
              Yuji Itadori engole o dedo do Ryomen-Sukuna, absorvendo sua Maldição.
              Ele então decide se matricular no Colégio Técnico de Feitiçaria de Tóquio, uma organização que combate as Maldições... e assim começa a heróica lenda do garoto que tornou-se uma Maldição para exorcizar uma Maldição.”
            </p>
          </div>
        </div>
      </div>


      <div className="container max-w-[90%] mx-auto mt-3">
        <h1 className="text-3xl text-gray-200 font-semibold mb-6 mt-8">Animes em Destaque</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {animesReversos
            .filter((anime) => anime.destaque === true) // Filtra apenas os animes com destaque true
            .map((anime, index) => (
              <ItemAnime key={anime.id} anime={anime} />
            ))}
        </div>
      </div>

    </div>
  );
}