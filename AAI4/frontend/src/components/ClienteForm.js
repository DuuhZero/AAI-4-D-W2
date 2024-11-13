import React, { useState } from 'react';
import api from '../api';

function ClienteForm({ onAdd }) {
  const [cliente, setCliente] = useState({ nome: '', rg: '', data_nascimento: '', sexo: '' });

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post('/clientes', cliente);
    onAdd(response.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="nome" placeholder="Nome" value={cliente.nome} onChange={handleChange} required />
      <input type="text" name="rg" placeholder="RG" value={cliente.rg} onChange={handleChange} required />
      <input type="date" name="data_nascimento" value={cliente.data_nascimento} onChange={handleChange} required />
      <select name="sexo" value={cliente.sexo} onChange={handleChange} required>
        <option value="">Selecione o sexo</option>
        <option value="Masculino">Masculino</option>
        <option value="Feminino">Feminino</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4">Adicionar Cliente</button>
    </form>
  );
}

export default ClienteForm;