'use client'
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm()

  async function verificaLogin(data) {
        const login = `email=${data.email}&senha=${data.senha}`
    const response = await fetch(`http://localhost:3004/clientes?${login}`)
    const cliente = await response.json()
    if (cliente.length == 0) {
      alert("Não está cadastrado")
    } else {
      // alert("Ok!")
      mudaId(cliente[0].id)
      mudaNome(cliente[0].nome)
      localStorage.setItem("cliente_logado", JSON.stringify({id: cliente[0].id, nome: cliente[0].nome}))
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center  bg-fundo2 mt-20">
      <div className="bg-gelo p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-orange-800">Login</h2>
        <form onSubmit={handleSubmit(verificaLogin)}>
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
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-3">

            <Link href="/" onSubmit={handleSubmit(verificaLogin)} >Login</Link>
          </button>
          <a href="#" className="text-orange-500 hover:underline">
            Esqueci minha senha
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
