import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white font-semibold text-xl">Gestão de Estoque</h1>
        <div className="flex space-x-4">
          <Link to="/products" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
            Produtos
          </Link>
          <Link to="/suppliers" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
            Fornecedores
          </Link>
          <Link to="/history" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
            Histórico de Produtos
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
