'use client'
import Link from "next/link";

export default function Title({ children }) {
  const userName = localStorage.getItem('User Name');
  const userRole = localStorage.getItem('User Role');
  
  return (
    <body className="pagina-especifica">
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
          <Link
            href="/listing"
            className="text-gray-200 text-2xl hover:text-laranja ml-4"
            title="Listar"
          >
            <i className="bi bi-collection-play"></i>
          </Link>

          {/* Renderiza o link de cadastro apenas se a função do usuário for 'admin' */}
          {userRole === 'admin' && (
            <Link
              href="/register"
              className="text-gray-200 text-2xl hover:text-laranja ml-4"
              title="Cadastrar"
            >
              <i className="bi bi-postcard-heart"></i>
            </Link>
          )}

          <Link
            href="/graphic"
            className="text-gray-200 text-2xl hover:text-laranja ml-4"
            alt="graphic"
            title="Graficos"
          >
            <i className="bi bi-buildings"></i>
          </Link>

          <div className="flex flex-col items-center ml-8">
            <Link href='/login'>
              <i className="bi bi-person-circle text-gray-200 text-2xl pt-2"></i>
            </Link>
            <p className="text-sm text-gray-200">
              {userName ? userName : 'Login'}
            </p>
          </div>
        </div>
      </header>
    </body>
  );
}
