import React from 'react';
import Swal from 'sweetalert2';

export default function AnimeList(props) {
    function deleteAnimes (id){
            Swal.fire({
        title: 'Tem certeza que deseja excluir?',
        text: "Essa ação não poderá ser revertida!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Excluir!'
      }).then((result) => {
        if (result.isConfirmed) {
          props.delete(id)
          Swal.fire(
            'Concluído',
            'Esse anime foi deletado com sucesso',
            'Sucess'
          )
        }
      })

    }

    return (
        <tr className="bg-gelo hover:bg-cinza200 transition-all ">
            <td className="py-3 px-4">
                <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden">
                    <img src={props.anime.capa} alt="" className="w-full h-full object-cover" />
                </div>
            </td>
            <td className="py-3 px-4">
                <div className="text-gray-900">{props.anime.titulo}</div>
            </td>
            <td className="py-3 px-4">
                <div className="text-gray-900">{props.anime.genero}</div>
            </td>
            <td className="py-3 px-4">
                <div className="text-gray-900">{props.anime.produtora}</div>
            </td>
            <td className="py-3 px-4">
                <div className="text-gray-900">{props.anime.temporadas}</div>
            </td>
            <td className="py-3 px-4">
                <div className="text-gray-900">{props.anime.episodios}</div>
            </td>
            <td className="py-3 px-4">
           
                <div className="text-gray-900">{props.anime.nota}
                <i className="bi bi-balloon-heart cursor-pointer" onClick={props.alterNote}></i> </div>
            </td>
            <td className="py-3 px-4">
          <i className="bi bi-pencil-square hover:bg-laranja text-gray-900 mr-2 cursor-pointer" onClick={props.alter} title='alter'></i>
          <i className="bi bi-calendar2-x hover:bg-laranja text-gray-900 cursor-pointer mr-2" onClick={()=>deleteAnimes(props.anime.id)}
          title='Delete'></i>
          <i className="bi bi-star hover:bg-laranja text-gray-900 cursor-pointer" ></i>
            </td>
        </tr>
    );
}
