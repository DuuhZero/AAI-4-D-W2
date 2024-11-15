import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-yellow-400 p-4 shadow-md">
      <div className="container flex justify-between items-center">
        <h1 className="text-white font-semibold text-3xl">Gestão de Estoque</h1>
        <div className="flex space-x-5 text-lg absolute right-5">
          <Link to="/products" className="text-white hover:bg-yellow-500 px-3 py-2 rounded">
            Produtos
          </Link>
          <Link to="/suppliers" className="text-white hover:bg-yellow-500 px-3 py-2 rounded">
            Fornecedores
          </Link>
          <Link to="/history" className="text-white hover:bg-yellow-500 px-3 py-2 rounded">
            Histórico de Produtos
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
