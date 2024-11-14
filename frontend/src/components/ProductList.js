import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    supplierId: "",
  });

  // Buscar produtos
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

  // Buscar fornecedores
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

  // Função para deletar um produto
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

  // Função para editar um produto
  const handleEditProduct = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setNewProduct({
      id: productToEdit.id,
      name: productToEdit.name,
      description: productToEdit.description,
      price: productToEdit.price,
      quantity: productToEdit.quantity,
      supplierId: productToEdit.supplierId,
    });
  };

  // Função para atualizar o estado dos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Função para adicionar ou atualizar um produto
  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();
    const { name, description, price, quantity, supplierId, id } = newProduct;

    if (!name || !description || !price || !quantity || !supplierId) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    if (id) {
      // Atualizar produto
      axios
        .put(`http://localhost:5000/products/${id}`, {
          name,
          description,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          supplierId: parseInt(supplierId),
        })
        .then((response) => {
          setProducts(
            products.map((product) =>
              product.id === response.data.id ? response.data : product
            )
          );
          setNewProduct({
            id: "",
            name: "",
            description: "",
            price: "",
            quantity: "",
            supplierId: "",
          });
        })
        .catch((error) => {
          console.error("Erro ao atualizar produto:", error);
          alert("Erro ao atualizar produto.");
        });
    } else {
      // Adicionar novo produto
      axios
        .post("http://localhost:5000/products", {
          name,
          description,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          supplierId: parseInt(supplierId),
        })
        .then((response) => {
          setProducts([...products, response.data]);
          setNewProduct({
            id: "",
            name: "",
            description: "",
            price: "",
            quantity: "",
            supplierId: "",
          });
        })
        .catch((error) => {
          console.error("Erro ao adicionar produto:", error);
          alert("Erro ao adicionar produto.");
        });
    }
  };

  return (
    <div>
      <h1>Produtos</h1>

      <form onSubmit={handleAddOrUpdateProduct}>
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

        <select
          name="supplierId"
          value={newProduct.supplierId}
          onChange={handleInputChange}
          required
        >
          <option value="">Selecione um fornecedor</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>

        <button type="submit">{newProduct.id ? "Atualizar Produto" : "Adicionar Produto"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Fornecedor</th>
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
              <td>{suppliers.find((s) => s.id === product.supplierId)?.name || "Desconhecido"}</td>
              <td>
                <button onClick={() => handleEditProduct(product.id)}>Editar</button>
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
