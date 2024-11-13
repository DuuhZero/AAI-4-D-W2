import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProdutoList() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('/api/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    fetchProdutos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/produtos/${id}`);
      setProdutos(produtos.filter(produto => produto.id !== id));
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de Produtos</h2>
      <Link to="/produtos/add" className="text-blue-500">Adicionar Produto</Link>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Marca</th>
            <th className="border p-2">Preço</th>
            <th className="border p-2">Data de Validade</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id}>
              <td className="border p-2">{produto.nome}</td>
              <td className="border p-2">{produto.marca}</td>
              <td className="border p-2">R$ {produto.preco}</td>
              <td className="border p-2">{produto.data_validade}</td>
              <td className="border p-2">
                <Link to={`/produtos/edit/${produto.id}`} className="text-blue-500 mr-2">Editar</Link>
                <button onClick={() => handleDelete(produto.id)} className="text-red-500">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProdutoList;