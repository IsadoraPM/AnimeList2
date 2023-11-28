'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { HiEye, HiEyeOff } from 'react-icons/hi';

const CadastroUsuario = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [senhaIncorreta, setSenhaIncorreta] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const senha = watch('password');
  const confirmaSenha = watch('confirmarSenha');

  const enviaDados = async (data) => {
    try {
      const response = await fetch('http://localhost:3004/animeApi/user', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.status === 201) {
        toast.success('Usuário cadastrado com sucesso!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        reset();
      } else {
        toast.error('Erro ao cadastrar usuário!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      toast.error('Erro ao cadastrar usuário. Verifique o console para mais detalhes.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const verificarSenha = () => {
    setSenhaIncorreta(senha !== confirmaSenha);
  };

  return (
    <div className="container mx-auto mt-5 p-6 bg-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Cadastro de Usuários</h2>
      <form onSubmit={handleSubmit(enviaDados)}>
        <div className="mb-4">
          <label htmlFor="nome" className="block text-gray-800 text-sm font-bold mb-2">Nome</label>
          <input type="text" id="nome" {...register('name')} className="border rounded w-full py-2 px-3 text-orange-500" required />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-800 text-sm font-bold mb-2">E-mail</label>
          <input type="email" id="email" {...register('email')} className="border rounded w-full py-2 px-3 text-orange-500" required />
        </div>

        <div className="mb-4">
          <label htmlFor="senha" className="block text-gray-800 text-sm font-bold mb-2">Senha</label>
          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              id="senha"
              {...register('password')}
              className="border rounded w-full py-2 px-3 text-orange-500"
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? <HiEye className="text-gray-500" /> : <HiEyeOff className="text-gray-500" />}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="confirmarSenha" className="block text-gray-800 text-sm font-bold mb-2">Confirmar Senha</label>
          <input type="password" id="confirmarSenha" {...register('confirmarSenha')} className={`border rounded w-full py-2 px-3 text-orange-500 ${senhaIncorreta ? 'border-red-500' : ''}`} onBlur={verificarSenha} required />
          {senhaIncorreta && (
            <p className="text-red-500 text-sm mt-2">As senhas não coincidem. Tente novamente.</p>
          )}
        </div>

        <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-3">
          Enviar
        </button>
        <button type="button" onClick={() => reset()} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Limpar
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
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

export default CadastroUsuario;
