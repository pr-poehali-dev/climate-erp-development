import { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Users, Calendar, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  const statsCards = [
    {
      title: 'Всего заявок',
      value: '1,247',
      change: '+12.5%',
      changeType: 'positive',
      icon: FileText,
      color: 'blue',
    },
    {
      title: 'Выполнено работ',
      value: '893',
      change: '+8.2%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'green',
    },
    {
      title: 'Активных сотрудников',
      value: '24',
      change: '+2',
      changeType: 'positive',
      icon: Users,
      color: 'purple',
    },
    {
      title: 'Среднее время выполнения',
      value: '4.2 ч',
      change: '-0.5 ч',
      changeType: 'positive',
      icon: Calendar,
      color: 'orange',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      case 'green':
        return 'bg-green-100 text-green-600';
      case 'purple':
        return 'bg-purple-100 text-purple-600';
      case 'orange':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const reportTypes = [
    { id: 'overview', name: 'Общая сводка', icon: BarChart3 },
    { id: 'employees', name: 'По сотрудникам', icon: Users },
    { id: 'clients', name: 'По клиентам', icon: FileText },
    { id: 'services', name: 'По типам услуг', icon: PieChart },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Отчеты и аналитика</h2>
          <p className="text-gray-600 mt-1">Сводная отчетность по различным срезам данных</p>
        </div>
        <Button>
          <Download size={20} className="mr-2" />
          Экспортировать
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="week">За неделю</option>
          <option value="month">За месяц</option>
          <option value="quarter">За квартал</option>
          <option value="year">За год</option>
          <option value="custom">Произвольный период</option>
        </select>

        <div className="flex gap-2">
          {reportTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedReport(type.id)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                selectedReport === type.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <type.icon size={16} />
              {type.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(card.color)}`}>
                <card.icon size={24} />
              </div>
              <span className={`text-sm font-medium ${
                card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {card.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{card.value}</h3>
            <p className="text-sm text-gray-600">{card.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Статистика заявок по статусам</h3>
          <div className="space-y-4">
            {[
              { status: 'Выполнена', count: 893, percent: 71.6, color: 'green' },
              { status: 'В работе', count: 187, percent: 15.0, color: 'blue' },
              { status: 'Новая', count: 124, percent: 9.9, color: 'yellow' },
              { status: 'Отменена', count: 43, percent: 3.5, color: 'red' },
            ].map((item) => (
              <div key={item.status}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700">{item.status}</span>
                  <span className="font-semibold text-gray-900">{item.count} ({item.percent}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.color === 'green' ? 'bg-green-500' :
                      item.color === 'blue' ? 'bg-blue-500' :
                      item.color === 'yellow' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Топ-5 сотрудников по выполненным работам</h3>
          <div className="space-y-4">
            {[
              { name: 'Иванов Иван', count: 127, rating: 4.9 },
              { name: 'Петров Петр', count: 115, rating: 4.8 },
              { name: 'Сидоров Сергей', count: 98, rating: 4.7 },
              { name: 'Козлов Андрей', count: 87, rating: 4.6 },
              { name: 'Новиков Дмитрий', count: 76, rating: 4.5 },
            ].map((employee, index) => (
              <div key={employee.name} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{employee.name}</span>
                    <span className="text-sm text-gray-600">{employee.count} работ</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-yellow-600">★</span>
                    <span className="text-xs text-gray-600">{employee.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Распределение по типам услуг</h3>
          <div className="space-y-3">
            {[
              { type: 'Кондиционирование', count: 487, percent: 39.1 },
              { type: 'Вентиляция', count: 356, percent: 28.6 },
              { type: 'Отопление', count: 234, percent: 18.8 },
              { type: 'Холодоснабжение', count: 170, percent: 13.6 },
            ].map((service) => (
              <div key={service.type}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{service.type}</span>
                  <span className="text-gray-900 font-medium">{service.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${service.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Динамика выполнения по дням</h3>
          <div className="space-y-2">
            {[
              { day: 'Пн', count: 45, maxCount: 60 },
              { day: 'Вт', count: 52, maxCount: 60 },
              { day: 'Ср', count: 48, maxCount: 60 },
              { day: 'Чт', count: 58, maxCount: 60 },
              { day: 'Пт', count: 55, maxCount: 60 },
              { day: 'Сб', count: 32, maxCount: 60 },
              { day: 'Вс', count: 18, maxCount: 60 },
            ].map((day) => (
              <div key={day.day} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 w-8">{day.day}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-6 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(day.count / day.maxCount) * 100}%` }}
                  >
                    <span className="text-xs text-white font-medium">{day.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
