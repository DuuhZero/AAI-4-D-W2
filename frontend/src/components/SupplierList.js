import React, { useEffect, useState } from "react";
import axios from "axios";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    cnpj: "",
    email: "",
    phone: "",
  });
  const [editingSupplier, setEditingSupplier] = useState(null); // Estado para o fornecedor em edição

  // Carregar os fornecedores ao carregar o componente
  useEffect(() => {
    axios
      .get("http://localhost:5000/suppliers")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar fornecedores:", error);
      });
  }, []);

  // Função para excluir fornecedor
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/suppliers/${id}`)
      .then(() => {
        setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
      })
      .catch((error) => {
        console.error("Erro ao deletar fornecedor:", error);
      });
  };

  // Funções para formatar CNPJ e telefone
  const formatCNPJ = (value) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não é dígito
      .replace(/^(\d{2})(\d)/, "$1.$2") // Adiciona ponto após os primeiros 2 dígitos
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Adiciona ponto após os 5 primeiros dígitos
      .replace(/\.(\d{3})(\d)/, ".$1/$2") // Adiciona barra após os 8 primeiros dígitos
      .replace(/(\d{4})(\d)/, "$1-$2") // Adiciona hífen após os 12 primeiros dígitos
      .slice(0, 18); // Limita a 18 caracteres
  };

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não é dígito
      .replace(/^(\d{2})(\d)/, "($1) $2") // Adiciona parênteses em volta dos primeiros 2 dígitos
      .replace(/(\d{4,5})(\d{4})$/, "$1-$2") // Adiciona hífen no meio dos 8 ou 9 dígitos restantes
      .slice(0, 15); // Limita a 15 caracteres
  };

  // Função de manipulação de input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cnpj") {
      formattedValue = formatCNPJ(value);
    } else if (name === "phone") {
      formattedValue = formatPhone(value);
    }

    setNewSupplier({ ...newSupplier, [name]: formattedValue });
  };

  // Função para adicionar fornecedor
  const handleAddSupplier = (e) => {
    e.preventDefault();
    // Verificação adicional no frontend
    if (!newSupplier.name || !newSupplier.cnpj || !newSupplier.email || !newSupplier.phone) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    // Enviando dados para o backend
    axios
      .post("http://localhost:5000/suppliers", newSupplier)
      .then((response) => {
        setSuppliers([...suppliers, response.data]);
        setNewSupplier({ name: "", cnpj: "", email: "", phone: "" });
      })
      .catch((error) => {
        console.error("Erro ao adicionar fornecedor:", error);
        alert("Erro ao adicionar fornecedor.");
      });
  };

  // Função para editar fornecedor
  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier); // Define o fornecedor a ser editado
    setNewSupplier({
      name: supplier.name,
      cnpj: supplier.cnpj,
      email: supplier.email,
      phone: supplier.phone,
    });
  };

  // Função para atualizar fornecedor
  const handleUpdateSupplier = (e) => {
    e.preventDefault();
    // Verificação adicional no frontend
    if (!newSupplier.name || !newSupplier.cnpj || !newSupplier.email || !newSupplier.phone) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    // Enviando dados para o backend
    axios
      .put(`http://localhost:5000/suppliers/${editingSupplier.id}`, newSupplier)
      .then((response) => {
        setSuppliers(
          suppliers.map((supplier) =>
            supplier.id === editingSupplier.id ? response.data : supplier
          )
        );
        setEditingSupplier(null);
        setNewSupplier({ name: "", cnpj: "", email: "", phone: "" });
      })
      .catch((error) => {
        console.error("Erro ao atualizar fornecedor:", error);
        alert("Erro ao atualizar fornecedor.");
      });
  };

  return (
    <div>
      <h1>Fornecedores</h1>
      
      <form onSubmit={editingSupplier ? handleUpdateSupplier : handleAddSupplier}>
        <input
          type="text"
          name="name"
          placeholder="Nome do fornecedor"
          value={newSupplier.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="cnpj"
          placeholder="CNPJ"
          value={newSupplier.cnpj}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newSupplier.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={newSupplier.phone}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editingSupplier ? "Atualizar Fornecedor" : "Adicionar Fornecedor"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.cnpj}</td>
              <td>{supplier.email}</td>
              <td>{supplier.phone}</td>
              <td>
                <button onClick={() => handleEditSupplier(supplier)}>Editar</button>
                <button onClick={() => handleDelete(supplier.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierList;
