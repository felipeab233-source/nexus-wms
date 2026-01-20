import React, { useState, useEffect } from 'react';
import { Package, Plus, Search, Trash2, Edit } from 'lucide-react';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");

  // Simulação de busca no backend (Depois conectamos com seu fetch real)
  useEffect(() => {
    fetch('http://localhost:8000/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error("Erro ao buscar produtos:", err));
  }, []);

  const produtosFiltrados = produtos.filter(p => 
    p.nome.toLowerCase().includes(busca.toLowerCase()) || 
    p.sku.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Cadastro de Produtos</h1>
          <p className="text-slate-500">Gerencie o catálogo de itens do armazém.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} /> Novo Produto
        </button>
      </div>

      {/* Barra de Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text"
          placeholder="Buscar por nome ou SKU..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">SKU</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Nome do Produto</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Categoria</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {produtosFiltrados.map((produto) => (
              <tr key={produto.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-blue-600 font-bold">{produto.sku}</td>
                <td className="px-6 py-4 text-slate-800 font-medium">{produto.nome}</td>
                <td className="px-6 py-4 text-slate-500">{produto.categoria || 'Geral'}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                    <Edit size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {produtosFiltrados.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            Nenhum produto encontrado.
          </div>
        )}
      </div>
    </div>
  );
};

export default Produtos;