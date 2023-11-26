import React, { useContext } from 'react';
import Swal from 'sweetalert2';

export default function AnimeListFav({ favoriteAnime, onDelete }) {
    const userRoles = localStorage.getItem('User Role');

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você realmente deseja excluir este anime favorito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
    });

    if (result.isConfirmed) {
      try {
        await onDelete(favoriteAnime.id);
        Swal.fire('Excluído!', 'O anime favorito foi removido com sucesso.', 'success');
      } catch (error) {
        console.error('Erro ao excluir anime:', error);
        Swal.fire('Erro', 'Ocorreu um erro ao excluir o anime favorito.', 'error');
      }
    }
  };

    const isAdmin = userRoles === 'admin';

  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-4 relative flex items-center">
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-2 text-orange-500">{favoriteAnime.anime.titulo}</h2>
        <p className="text-gray-700 mb-2">Episódio Favorito: {favoriteAnime.episode}</p>
        <p className="text-gray-700">Usuário: {favoriteAnime?.user?.name}</p>
      </div>
      {isAdmin && (
        <button
          className="text-red-500 hover:text-gray-500"
          onClick={handleDelete}
        >
          <i className="bi bi-ban text-lg"></i>
        </button>
      )}
    </div>
  );
}
