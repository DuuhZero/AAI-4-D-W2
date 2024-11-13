import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificação dos dados antes de enviar
    if (!name || !description || !price || !quantity) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    // Enviando dados para o backend
    axios
      .post("http://localhost:5000/products", { name, description, price: parseFloat(price), quantity: parseInt(quantity) })
      .then((response) => {
        alert("Produto adicionado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao adicionar produto:", error);  // Log detalhado do erro
        alert("Erro ao adicionar produto.");
      });
  };

  return (
    <div>
      <h1>Adicionar Produto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default AddProduct;
