'use client'
import Link from "next/link";
import React from "react";
import { FcGoogle } from 'react-icons/fc';
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../contexts/usuario";
import { useRouter } from "next/navigation";



export default function Login () {

  const {register, handleSubmit,} = useForm();
  const {changeId, changeName, changeAdmin,changeStatus} = useContext(UserContext)

  const router = useRouter()

  async function verificaLogin(data) {
      const login = `username=${data.username}&password=${data.senha}`
      const response = await fetch(`http://localhost:3004/usuarios?${login}`)
      changeStatus("loading")
      const user = await response.json()
    if(user.length == 0){
      changeStatus("deslogado")
      alert('Usuário ou senha incorretos')
    }else{
      changeStatus("logado")
      changeId(user[0].id)
      console.log(user[0].username);
      console.log(user[0].id);
      changeName(user[0].username)
      //changeAdmin(user[0].admin)
      router.push('/')
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
              Username
            </label>
            <input
              type="text"
              id="nome"
              className="border rounded w-full py-2 px-3 text-orange-500"
              required {...register("username")}
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
              required {...register("senha")}
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-8"
          >
            <Link href="/login">Login</Link>
          </button>
          <a href="#" className="text-orange-500 hover:underline">
            Esqueci minha senha
          </a>
          <p className="flex justify-center pt-4 text-orange-700 hover:text-orange-400"><Link href="/registerUser">Cadastre-se</Link></p>
        </form>
        <div className="flex justify-center pt-4 cursor-pointer" >
        <FcGoogle
        size={35}
        />
        </div>
      </div>
    </div>
  );
};
