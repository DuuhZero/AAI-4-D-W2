import React, { useState } from 'react';
import api from '../api';

function ProdutoForm({ onAdd }) {
  const [produto, setProduto] = useState({ nome: '', preco: '', marca: '', data_validade: '' });

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post('/produtos', produto);
    onAdd(response.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="nome" placeholder="Nome" value={produto.nome} onChange={handleChange} required />
      <input type="number" step="0.01" name="preco" placeholder="Preço" value={produto.preco} onChange={handleChange} required />
      <input type="text" name="marca" placeholder="Marca" value={produto.marca} onChange={handleChange} required />
      <input type="date" name="data_validade" value={produto.data_validade} onChange={handleChange} required />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4">Adicionar Produto</button>
    </form>
  );
}

export default ProdutoForm; 