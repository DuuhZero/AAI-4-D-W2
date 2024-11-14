import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const History = () => {
  const [products, setProducts] = useState([]);

  // Buscar histórico de produtos
  useEffect(() => {
    axios
      .get("http://localhost:5000/history")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar histórico de produtos:", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">Histórico de Produtos</h1>

      <table className="min-w-full bg-gray-700 shadow-lg mb-6">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-6 py-3 text-left border-r border-gray-500">Nome do Produto</th>
            <th className="px-6 py-3 text-left border-r border-gray-500">ID do Produto</th>
            <th className="px-6 py-3 text-left border-r border-gray-500">Nome do Fornecedor</th>
            <th className="px-6 py-3 text-left border-r border-gray-500">ID do Fornecedor</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-600">
              <td className="px-6 py-4 border-r border-gray-500">{product.name}</td>
              <td className="px-6 py-4 border-r border-gray-500">{product.id}</td>
              <td className="px-6 py-4 border-r border-gray-500">{product.supplier.name}</td>
              <td className="px-6 py-4 border-r border-gray-500">{product.supplier.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
