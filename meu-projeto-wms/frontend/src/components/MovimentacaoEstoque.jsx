import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  PackageSearch, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  ClipboardList, 
  AlertCircle,
  CheckCircle,
  History,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';

const MovimentacaoEstoque = () => {
  // --- ESTADOS (STATES) ---
  const [produtos, setProdutos] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });
  
  const [form, setForm] = useState({
    produto_id: '',
    quantidade: '',
    tipo: 'ENTRADA',
    endereco_id: 1, // Valor padrão inicial
    observacao: ''
  });

  // --- CARREGAMENTO INICIAL ---
  useEffect(() => {
    fetchDados();
  }, []);

  const fetchDados = async () => {
    try {
      // Busca produtos e histórico simultaneamente
      const [resProd, resHist] = await Promise.all([
        axios.get('http://localhost:8000/produtos'),
        axios.get('http://localhost:8000/movimentacoes')
      ]);
      setProdutos(resProd.data);
      setHistorico(resHist.data);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    }
  };

  // --- FUNÇÕES DE AÇÃO ---
  const showStatus = (type, message) => {
    setStatus({ type, message });
    setTimeout(() => setStatus({ type: null, message: '' }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.produto_id || !form.quantidade) {
      showStatus('error', 'Preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:8000/movimentar', {
        ...form,
        produto_id: parseInt(form.produto_id),
        quantidade: parseInt(form.quantidade)
      });
      
      showStatus('success', `Movimentação de ${form.tipo} concluída!`);
      
      // Limpa campos específicos e atualiza o histórico
      setForm({ ...form, quantidade: '', observacao: '' });
      fetchDados(); 
      
    } catch (err) {
      showStatus('error', err.response?.data?.detail || 'Erro na operação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        
        {/* CABEÇALHO */}
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <PackageSearch className="text-indigo-600" size={36} />
            Gestão de Movimentação
          </h1>
          <p className="text-slate-500 mt-2">Controle de entradas e saídas do armazém em tempo real.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUNA DO FORMULÁRIO */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              
              {/* Seleção de Tipo (Entrada ou Saída) */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, tipo: 'ENTRADA' })}
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all font-bold ${
                    form.tipo === 'ENTRADA' 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                    : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                  }`}
                >
                  <ArrowUpCircle size={24} /> ENTRADA
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, tipo: 'SAIDA' })}
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all font-bold ${
                    form.tipo === 'SAIDA' 
                    ? 'border-rose-500 bg-rose-50 text-rose-700' 
                    : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                  }`}
                >
                  <ArrowDownCircle size={24} /> SAÍDA
                </button>
              </div>

              <div className="space-y-5">
                {/* Seleção de Produto */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Produto</label>
                  <select
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    value={form.produto_id}
                    onChange={(e) => setForm({ ...form, produto_id: e.target.value })}
                  >
                    <option value="">Selecione um item do catálogo...</option>
                    {produtos.map(p => (
                      <option key={p.id} value={p.id}>[{p.sku}] {p.nome}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Quantidade */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Quantidade</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                      value={form.quantidade}
                      onChange={(e) => setForm({ ...form, quantidade: e.target.value })}
                    />
                  </div>
                  {/* Endereço (Simulado) */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Endereço (Picking)</label>
                    <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="1">A-01-10 (Principal)</option>
                    </select>
                  </div>
                </div>

                {/* Observações */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Observações / Motivo</label>
                  <textarea
                    rows="2"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ex: Nota Fiscal nº 450 ou Ajuste de Inventário"
                    value={form.observacao}
                    onChange={(e) => setForm({ ...form, observacao: e.target.value })}
                  />
                </div>

                {/* Mensagens de Feedback */}
                {status.message && (
                  <div className={`p-4 rounded-lg flex items-center gap-3 animate-pulse ${
                    status.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span className="text-sm font-bold">{status.message}</span>
                  </div>
                )}

                {/* Botão de Enviar */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 ${
                      form.tipo === 'ENTRADA' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                    } disabled:opacity-50`} 
                    >
                    {loading ? "PROCESSANDO..." : `CONFIRMAR ${form.tipo}`}
                </button>
              </div>
            </form>
          </div>

          {/* COLUNA LATERAL (RESUMO) */}
          <div className="space-y-6">
            <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-400">
                <AlertCircle size={20} />
                Regras de Negócio
              </h3>
              <ul className="text-sm space-y-3 text-slate-300">
                <li>• <b>Saídas:</b> O sistema valida automaticamente se há saldo disponível antes de processar.</li>
                <li>• <b>Rastreabilidade:</b> Cada movimento gera um ID único de auditoria.</li>
                <li>• <b>Endereçamento:</b> Certifique-se de que o item cabe na prateleira de destino.</li>
              </ul>
            </div>
          </div>

          {/* TABELA DE HISTÓRICO (OCUPA TODA A LARGURA ABAIXO) */}
          <div className="lg:col-span-3 mt-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center gap-2">
                <History className="text-indigo-600" size={24} />
                <h3 className="font-bold text-slate-800 text-lg">Movimentações Recentes</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                      <th className="px-6 py-4">Data/Hora</th>
                      <th className="px-6 py-4">Produto ID</th>
                      <th className="px-6 py-4 text-center">Tipo</th>
                      <th className="px-6 py-4 text-right">Qtd</th>
                      <th className="px-6 py-4">Observação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {historico.map((m) => (
                      <tr key={m?.id || Math.random()} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-600 flex items-center gap-2 font-mono">
                          <Calendar size={14} className="text-slate-400" />
                          {/* Proteção 2: Verifica se a data existe antes de formatar */}
                          {m?.data_movimentacao ? new Date(m.data_movimentacao).toLocaleString('pt-BR') : 'Data pendente'}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                          #{m?.produto_id}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            m?.tipo === 'ENTRADA' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {m?.tipo}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-mono">{m?.quantidade}</span>
                        </td>
                        <td className="px-6 py-4">
                          {m?.observacao || '-'}
                        </td>
                      </tr>
))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovimentacaoEstoque;