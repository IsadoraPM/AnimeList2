import { useForm } from "react-hook-form";

export default function Pesq(props) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    props.filtrarAnime(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-fundo flex justify-end">
      <div className="search-bar rounded-full flex items-center">
        <input
          type="text"
          placeholder="Pesquisar"
          className="px-2 py-1 rounded-full text-orange-400"
          {...register("pesq")}
        />
          <button type="submit" className="bi bi-search text-white hover:text-laranja mr-4">
          </button>
        <button type="button" onClick={props.ordenarNota}
        className="bg-cinza text-white hover:bg-laranja rounded px-3 py-1">
          Listar por melhor nota
        </button>
      </div>
    </form>
  );
  
}
