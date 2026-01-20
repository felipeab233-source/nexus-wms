import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ArrowLeftRight, Warehouse, Settings } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Package, label: 'Produtos', path: '/produtos' },
    { icon: ArrowLeftRight, label: 'Movimentação', path: '/movimentacao' },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-10 px-2">
        <Warehouse className="text-blue-400" size={32} />
        <span className="text-xl font-bold tracking-wider">WMS<span className="text-blue-400">PRO</span></span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.path 
              ? 'bg-blue-600 text-white' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-slate-800 pt-4">
        <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white w-full">
          <Settings size={20} />
          <span>Configurações</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;