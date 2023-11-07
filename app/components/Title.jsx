import Link from "next/link";

export default function Title({ children }) {
  return (
    <body class="pagina-especifica">
      <header className="flex justify-between items-center bg-fundo py-2 px-6">
        <div className="flex items-center">
          <img src="../logo.png" className="w-14 h-14 rounded-full" />
          <Link href="/">
            <h1 className="text-2xl font-semibold text-laranja ml-4">
              AnimeCom
            </h1>
          </Link>
        </div>

        <div className="flex items-center">
          {/**   <div className="search-bar rounded-full flex items-center mr-4">
            <input
              type="text"
              placeholder="Pesquisar"
              className="px-2 py-1 rounded-full"
            />
          </div>
          <Link href="" className="text-gray-200 text-2xl hover:text-laranja">
            <i className="bi bi-search-heart"></i>
          </Link>
*/}
          <Link
            href="/listing"
            className="text-gray-200 text-2xl hover:text-laranja ml-4"
          >
            <i className="bi bi-collection-play"></i>
          </Link>
          <Link
            href="/register"
            className="text-gray-200 text-2xl hover:text-laranja ml-4"
          >
            <i className="bi bi-postcard-heart"></i>
          </Link>
          <Link
            href="/graphic"
            className="text-gray-200 text-2xl hover:text-laranja ml-4"
          >
            <i class="bi bi-buildings"></i>
          </Link>
          <Link
            href="/login"
            className="text-gray-200 text-2xl hover:text-laranja ml-4"
          >
            <i className="bi bi-person-circle"></i>
          </Link>
        </div>
      </header>
    </body>
  );
}
