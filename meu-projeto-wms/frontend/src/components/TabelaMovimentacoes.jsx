import React from 'react';
import { History, ArrowUpRight, ArrowDownLeft, Calendar } from 'lucide-react';

const TabelaMovimentacoes = ({ movimentacoes }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center gap-2">
        <History className="text-slate-400" size={20} />
        <h3 className="font-bold text-slate-800">Histórico Recente (Últimas 10)</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <th className="px-6 py-3">Data/Hora</th>
              <th className="px-6 py-3">Produto (ID)</th>
              <th className="px-6 py-3">Tipo</th>
              <th className="px-6 py-3 text-right">Qtd</th>
              <th className="px-6 py-3">Obs.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {movimentacoes.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-slate-400 italic">
                  Nenhuma movimentação registrada hoje.
                </td>
              </tr>
            ) : (
              movimentacoes.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600 flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    {new Date(m.data_movimentacao).toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">
                    ID: {m.produto_id}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      m.tipo === 'ENTRADA' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-rose-100 text-rose-700'
                    }`}>
                      {m.tipo === 'ENTRADA' ? <ArrowUpRight size={12} /> : <ArrowDownLeft size={12} />}
                      {m.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-mono font-bold text-slate-700">
                    {m.quantidade}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
                    {m.observacao || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaMovimentacoes;