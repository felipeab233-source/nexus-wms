import React from 'react';
import { Box, ArrowUpRight, ArrowDownLeft, AlertTriangle, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, detail }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
    <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
      <Activity size={12} /> {detail}
    </p>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Painel de Controle</h1>
        <p className="text-slate-500">Bem-vindo ao NexusWMS. Veja o que está acontecendo agora.</p>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total em Estoque" 
          value="1.248" 
          icon={Box} 
          color="bg-blue-500" 
          detail="Itens registrados"
        />
        <StatCard 
          title="Entradas (Hoje)" 
          value="+ 42" 
          icon={ArrowDownLeft} 
          color="bg-green-500" 
          detail="Recebimentos concluídos"
        />
        <StatCard 
          title="Saídas (Hoje)" 
          value="- 18" 
          icon={ArrowUpRight} 
          color="bg-red-500" 
          detail="Pedidos expedidos"
        />
        <StatCard 
          title="Alerta de Ruptura" 
          value="5" 
          icon={AlertTriangle} 
          color="bg-amber-500" 
          detail="Produtos com estoque baixo"
        />
      </div>

      {/* Espaço para Gráficos ou Atividade Recente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-64 flex items-center justify-center text-slate-400 italic">
          [Espaço para Gráfico de Movimentação Semanal]
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-64 flex items-center justify-center text-slate-400 italic">
          [Espaço para Lista de Últimas Atividades]
        </div>
      </div>
    </div>
  );
};

export default Dashboard;