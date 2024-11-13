import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ClienteList() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('/api/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    };
    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/clientes/${id}`);
      setClientes(clientes.filter(cliente => cliente.id !== id));
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Clientes</h2>
      <Link to="/clientes/add" className="text-blue-500 mb-4 inline-block">Adicionar Cliente</Link>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Nome</th>
            <th className="border border-gray-300 p-2 text-left">RG</th>
            <th className="border border-gray-300 p-2 text-left">Data de Nascimento</th>
            <th className="border border-gray-300 p-2 text-left">Sexo</th>
            <th className="border border-gray-300 p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length > 0 ? (
            clientes.map(cliente => (
              <tr key={cliente.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{cliente.nome}</td>
                <td className="border border-gray-300 p-2">{cliente.rg}</td>
                <td className="border border-gray-300 p-2">{new Date(cliente.data_nascimento).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">{cliente.sexo}</td>
                <td className="border border-gray-300 p-2">
                  <Link to={`/clientes/edit/${cliente.id}`} className="text-blue-500 mr-2">Editar</Link>
                  <button
                    onClick={() => handleDelete(cliente.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">Nenhum cliente encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ClienteList;