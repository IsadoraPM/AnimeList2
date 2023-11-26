import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export default function Pesq(props) {
  const { register, handleSubmit } = useForm();
  const [searchTerm, setSearchTerm] = useState("");

  const onSubmit = (data) => {
    props.filtrarAnime(data);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      props.filtrarAnime({ pesq: searchTerm });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, props.filtrarAnime]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-fundo flex justify-end">
      <div className="search-bar rounded-full flex items-center">
        <input
          type="text"
          placeholder="Pesquisar"
          className="px-2 py-1 rounded-full text-orange-400"
          {...register("pesq")}
          onChange={handleSearchTermChange}
        />
        <button type="submit" className="bi bi-search text-white hover:text-laranja mr-4"></button>
        
        <button 
          type="button"
          onClick={props.ordenarNota}
          className="bg-cinza text-white hover:bg-laranja rounded px-3 py-1">
          Listar por melhor nota
        </button>
      </div>
    </form>
  );
}