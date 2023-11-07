'use client'
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from 'react-icons/fc';

export default function Cadastro() {
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [senhaIncorreta, setSenhaIncorreta] = useState(false);

  const handleCadastro = (e) => {
    e.preventDefault();

    if (senha === repetirSenha) {
     
      console.log("Cadastro bem-sucedido!");
      
    } else {
      // A senha não coincide, definimos o estado 'senhaIncorreta' como verdadeiro
      setSenhaIncorreta(true);
    }
  };

  return (
    <div className="flex flex-col items-center bg-fundo2 mt-20">
      <div className="bg-gelo p-8 rounded-lg shadow-lg my-4 w-3/5">
        <h2 className="text-2xl font-bold mb-4 text-orange-800">Cadastro</h2>
        <form onSubmit={handleCadastro}>
          <div className="mb-4">
            <label
              htmlFor="nome"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              className="border rounded w-full py-2 px-3 text-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="border rounded w-full py-2 px-3 text-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="senha"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Senha
            </label>
            <input
              type="password"
              id="senha"
              className="border rounded w-full py-2 px-3 text-orange-500"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="repetirSenha"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Repetir Senha
            </label>
            <input
              type="password"
              id="repetirSenha"
              className="border rounded w-full py-2 px-3 text-orange-500"
              required
              value={repetirSenha}
              onChange={(e) => setRepetirSenha(e.target.value)}
            />
          </div>
          {senhaIncorreta && (
            <p className="text-red-500 text-sm mb-2">As senhas não coincidem. Tente novamente.</p>
          )}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-8 w-full"
          >
          
            <Link href="/">Cadastrar</Link>
          </button>
        </form>
        <p className="flex justify-center pt-4 text-orange-700 hover:text-orange-400">
          Já possui uma conta? <Link href="/login">Faça login</Link>
        </p>
        <div className="flex justify-center pt-4">
          <FcGoogle size={35} />
        </div>
      </div>
    </div>
  );
}