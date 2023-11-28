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

      
      console.log('response', response);
      console.log(codigoValidacao);

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
      const response = await fetch(`http://localhost:3004/animeApi/user/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('User Token')}`
        }
      });
      
      
      alert('Código enviado por email com sucesso!');
      
      
      const data = await response.json();
  
  }

  return (
    <div className="mt-10 p-6 bg-gelo rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="font-bold text-gray-800 text-2xl">
          Perfil
        </h1>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="text-gray-900">Nome: {userName}</div>
            <div className="text-gray-900">Email: {userEmail}</div>
            <div className="text-gray-900">Função: {userRole}</div>
          </div>
        </div>
      </div>
      <button
        onClick={enviaEmail}
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
      >
        Enviar Código por Email
      </button>

      <button
      className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
        onClick={openModal}
      >
        validar Código
      </button>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Validar Código Modal"
        className=""
      >
        <h2 className="">Validar Código</h2>
        <label htmlFor="codigo">Código:</label>
        <input
          type="text"
          id="codigo"
          value={codigoValidacao}
          onChange={handleCodigoChange}
        />
        <button onClick={handleValidarCodigo}>Validar Código</button>
        <button onClick={closeModal}>Fechar</button>
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
