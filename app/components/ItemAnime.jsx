import React, { useState } from 'react';

export default function ItemAnime(props) {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div
            className="max-w-sm bg-gelo border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <a href="#">
                <img src={props?.anime?.capa} alt="" className="w-full h-80 object-cover" />
            </a>
            {hovered && (
                <div className="overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
                    <div>
                        <span className="movie-title" style={{ color: '#FFFFFF', WebkitTextStroke: '1px #FFFFFF' }}>
                            {props?.anime?.titulo}
                        </span>
                        <p className="text-sm" style={{ color: '#FFFFFF'}}>
                            {props?.anime?.temporadas} temporadas
                        </p>
                        <p className="text-sm text-gray-600 mt-2">{props?.anime?.descricao}</p>
                    </div>
                </div>
            )}

        </div>
    );
}
