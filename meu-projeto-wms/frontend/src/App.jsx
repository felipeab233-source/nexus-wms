import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar'; 
import Dashboard from './components/Dashboard'; // Importando o Dashboard
import MovimentacaoEstoque from './components/MovimentacaoEstoque';
import Produtos from './components/Produtos'; // Importando o componente Produtos

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-100 text-slate-900">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movimentacao" element={<MovimentacaoEstoque />} />
            <Route path="/produtos" element={<Produtos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;