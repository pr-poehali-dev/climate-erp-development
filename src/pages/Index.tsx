import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TabContent from '@/components/TabContent';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const dashboardStats = [
    { title: 'Активные заказы', value: '24', change: '+12%', icon: 'Clipboard', color: 'text-blue-600' },
    { title: 'SLA выполнение', value: '94.5%', change: '+2.3%', icon: 'Target', color: 'text-green-600' },
    { title: 'Рентабельность', value: '42%', change: '+5%', icon: 'TrendingUp', color: 'text-purple-600' },
    { title: 'Склад (позиций)', value: '156', change: '-8', icon: 'Package', color: 'text-orange-600' },
  ];

  const revenueData = [
    { month: 'Янв', revenue: 65000, costs: 42000 },
    { month: 'Фев', revenue: 78000, costs: 48000 },
    { month: 'Мар', revenue: 92000, costs: 55000 },
    { month: 'Апр', revenue: 88000, costs: 52000 },
    { month: 'Май', revenue: 105000, costs: 61000 },
    { month: 'Июн', revenue: 118000, costs: 68000 },
  ];

  const slaData = [
    { name: 'Выполнено вовремя', value: 85, color: '#0EA5E9' },
    { name: 'С опозданием', value: 12, color: '#F97316' },
    { name: 'В работе', value: 3, color: '#10B981' },
  ];

  const orders = [
    { id: 'ORD-001', client: 'ООО "Торговый Дом"', equipment: 'Чиллер Daikin', status: 'В работе', priority: 'Высокий', date: '2026-01-15', engineer: 'Иванов И.И.' },
    { id: 'ORD-002', client: 'ТЦ "Галерея"', equipment: 'Кондиционер VRV', status: 'Назначен', priority: 'Средний', date: '2026-01-14', engineer: 'Петров П.П.' },
    { id: 'ORD-003', client: 'Отель "Премьер"', equipment: 'Вентиляция', status: 'Завершен', priority: 'Низкий', date: '2026-01-13', engineer: 'Сидоров С.С.' },
    { id: 'ORD-004', client: 'БЦ "Сити Плаза"', equipment: 'Чиллер York', status: 'Новый', priority: 'Срочно', date: '2026-01-15', engineer: '-' },
  ];

  const clients = [
    { id: 1, name: 'ООО "Торговый Дом"', objects: 3, equipment: 12, lastService: '2026-01-10', contract: 'Активен' },
    { id: 2, name: 'ТЦ "Галерея"', objects: 1, equipment: 8, lastService: '2026-01-05', contract: 'Активен' },
    { id: 3, name: 'Отель "Премьер"', objects: 5, equipment: 24, lastService: '2026-01-12', contract: 'Активен' },
    { id: 4, name: 'БЦ "Сити Плаза"', objects: 2, equipment: 15, lastService: '2025-12-28', contract: 'На продлении' },
  ];

  const services = [
    { id: 1, name: 'ТО чиллера (базовое)', price: 15000, time: '4 ч', materials: 3, profitability: 38 },
    { id: 2, name: 'Заправка фреоном R410A', price: 8500, time: '2 ч', materials: 2, profitability: 45 },
    { id: 3, name: 'Замена компрессора', price: 65000, time: '8 ч', materials: 5, profitability: 28 },
    { id: 4, name: 'Диагностика системы', price: 5000, time: '1.5 ч', materials: 0, profitability: 72 },
  ];

  const warehouse = [
    { id: 1, name: 'Фреон R410A (1кг)', quantity: 45, min: 20, price: 1200, supplier: 'Химснаб' },
    { id: 2, name: 'Компрессор Danfoss', quantity: 3, min: 2, price: 42000, supplier: 'Daikin' },
    { id: 3, name: 'Фильтр-осушитель', quantity: 28, min: 15, price: 850, supplier: 'ТехноХолод' },
    { id: 4, name: 'Термостат цифровой', quantity: 12, min: 10, price: 3500, supplier: 'Холод-Сервис' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'В работе': return 'bg-blue-100 text-blue-700';
      case 'Назначен': return 'bg-purple-100 text-purple-700';
      case 'Завершен': return 'bg-green-100 text-green-700';
      case 'Новый': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Срочно': return 'bg-red-100 text-red-700';
      case 'Высокий': return 'bg-orange-100 text-orange-700';
      case 'Средний': return 'bg-yellow-100 text-yellow-700';
      case 'Низкий': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-auto">
        <Header activeTab={activeTab} />
        <TabContent
          activeTab={activeTab}
          dashboardStats={dashboardStats}
          revenueData={revenueData}
          slaData={slaData}
          orders={orders}
          clients={clients}
          services={services}
          warehouse={warehouse}
          getStatusColor={getStatusColor}
          getPriorityColor={getPriorityColor}
        />
      </main>
    </div>
  );
};

export default Index;
