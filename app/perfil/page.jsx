'use client';
import React from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactModal from "react-modal";

export default function Perfil(props) {
  const router = useRouter();
  const userName = localStorage?.getItem('User Name');
  const userEmail = localStorage?.getItem('User Email');
  const userRole = localStorage?.getItem('User Role');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [codigoValidacao, setCodigoValidacao] = React.useState('');


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCodigoChange = (e) => {
    setCodigoValidacao(e.target.value);
  };

  const handleValidarCodigo = async () => {
    try {
      const response = await fetch(`http://localhost:3004/animeApi/user/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('User Token')}`
        },
        body: JSON.stringify({ code: codigoValidacao })
      });

      if (response.ok) {
        alert('Código validado com sucesso!');
        localStorage.setItem('User Role', 'commonUser');
        closeModal();
      } else {
        alert('Código inválido!');
      }
    } catch (error) {
      console.error('Erro ao validar código:', error);
      toast.error('Erro ao validar código. Verifique o console para mais detalhes.');
    }
  };

  const logout = () => {
    localStorage.removeItem('User Id');
    localStorage.removeItem('User Token');
    localStorage.removeItem('User Name');
    localStorage.removeItem('User Email');
    localStorage.removeItem('User Role');

    router.push('/');

    toast.success('Logout realizado com sucesso!');
  };

  async function enviaEmail() {
    try {
      const response = await fetch(`http://localhost:3004/animeApi/user/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('User Token')}`
        }
      });
      
      alert('Código enviado por email com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar código por email:', error);
      toast.error('Erro ao enviar código por email. Verifique o console para mais detalhes.');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-fundo2 mt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="font-bold text-gray-800 text-2xl mb-4 text-center">Perfil</h1>
        <div className="flex flex-col space-y-2">
          <div className="text-gray-900">
            <span className="font-semibold">Nome:</span> {userName}
          </div>
          <div className="text-gray-900">
            <span className="font-semibold">Email:</span> {userEmail}
          </div>
          <div className="text-gray-900">
            <span className="font-semibold">Função:</span> {userRole}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={enviaEmail}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Enviar Código por Email
          </button>
          <button
            onClick={openModal}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Validar Código
          </button>
        </div>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Validar Código Modal"
        className="absolute inset-1/4 bg-gelo p-8 rounded-lg shadow-lg w-1/2"
      >
        <h2 className="font-semibold text-gray-800 text-xl mb-4">Validar Código</h2>
        <label htmlFor="codigo" className="block mb-2">Código:</label>
        <input
          type="text"
          id="codigo"
          value={codigoValidacao}
          onChange={handleCodigoChange}
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
        />
        <div className="flex justify-end">
          <button onClick={handleValidarCodigo} className="bg-orange-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Validar Código
          </button>
          <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Fechar
          </button>
        </div>
      </ReactModal>
      <button
        onClick={logout}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
}