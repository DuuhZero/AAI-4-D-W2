import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error("Erro ao deletar produto:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    // Verificação adicional no frontend
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.quantity) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    // Enviando dados para o backend
    axios
      .post("http://localhost:5000/products", {
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        quantity: parseInt(newProduct.quantity),
      })
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({ name: "", description: "", price: "", quantity: "" });
      })
      .catch((error) => {
        console.error("Erro ao adicionar produto:", error);  // Log detalhado do erro
        alert("Erro ao adicionar produto.");
      });
  };

  return (
    <div>
      <h1>Produtos</h1>
      
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          name="name"
          placeholder="Nome do produto"
          value={newProduct.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          value={newProduct.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Preço"
          value={newProduct.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantidade"
          value={newProduct.quantity}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Adicionar Produto</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
