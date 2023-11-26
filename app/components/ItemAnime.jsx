import React from 'react';

export default function ItemAnime(props) {
    console.log(props);
    console.log(props?.anime?.id);
    console.log(props?.key);

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img src={props?.anime?.capa} alt="" className="w-full h-48 object-cover" />
            </a>
            <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{props?.anime?.titulo}</h3>
                <p className="text-sm text-gray-600">{props?.anime?.temporadas} temporadas</p>
                <p className="text-sm text-gray-600 mt-2">{props?.anime?.descricao}</p>
            </div>
        </div>
    );
}
