import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClienteList from './components/ClienteList';
import ProdutoList from './components/ProdutoList';
import ClienteForm from './components/ClienteForm'; // Caso tenha criado o form de cliente
import ProdutoForm from './components/ProdutoForm'; // Caso tenha criado o form de produto

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="flex gap-4 mb-4">
          <Link to="/clientes" className="text-blue-500">Clientes</Link>
          <Link to="/produtos" className="text-blue-500">Produtos</Link>
        </nav>
        
        <Routes>
          <Route path="/clientes" element={<ClienteList />} />
          <Route path="/produtos" element={<ProdutoList />} />
          <Route path="/clientes/add" element={<ClienteForm />} />
          <Route path="/produtos/add" element={<ProdutoForm />} />
          {/* Caso queira adicionar rotas de edição */}
          <Route path="/clientes/edit/:id" element={<ClienteForm />} />
          <Route path="/produtos/edit/:id" element={<ProdutoForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;