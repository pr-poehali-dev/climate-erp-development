import { useState } from 'react';
import { Search, Calendar, Plus, Edit2, Trash2, Clock, MapPin, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MaintenanceSchedule {
  id: string;
  name: string;
  serviceObjectName: string;
  serviceType: string;
  frequency: 'Ежедневно' | 'Еженедельно' | 'Ежемесячно' | 'Ежеквартально' | 'Ежегодно';
  dayOfWeek?: string;
  dayOfMonth?: number;
  time: string;
  duration: number;
  assignedEmployeeId?: string;
  assignedEmployeeName?: string;
  active: boolean;
  lastExecuted?: string;
  nextExecution: string;
}

const mockSchedules: MaintenanceSchedule[] = [
  {
    id: 'SCH-001',
    name: 'Проверка кондиционеров',
    serviceObjectName: 'ТЦ "Мега"',
    serviceType: 'Кондиционирование',
    frequency: 'Ежемесячно',
    dayOfMonth: 1,
    time: '09:00',
    duration: 120,
    assignedEmployeeId: 'E001',
    assignedEmployeeName: 'Иванов Иван',
    active: true,
    lastExecuted: '2024-01-01',
    nextExecution: '2024-02-01',
  },
  {
    id: 'SCH-002',
    name: 'ТО вентиляции',
    serviceObjectName: 'Офис "БизнесЦентр"',
    serviceType: 'Вентиляция',
    frequency: 'Ежеквартально',
    time: '10:00',
    duration: 180,
    active: true,
    nextExecution: '2024-04-01',
  },
  {
    id: 'SCH-003',
    name: 'Замена фильтров',
    serviceObjectName: 'Склад "Логистик"',
    serviceType: 'Вентиляция',
    frequency: 'Еженедельно',
    dayOfWeek: 'Понедельник',
    time: '08:00',
    duration: 60,
    assignedEmployeeId: 'E003',
    assignedEmployeeName: 'Сидоров Сергей',
    active: true,
    lastExecuted: '2024-01-08',
    nextExecution: '2024-01-15',
  },
];

const ScheduledMaintenance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [schedules, setSchedules] = useState(mockSchedules);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = 
      schedule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.serviceObjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && schedule.active) ||
      (statusFilter === 'inactive' && !schedule.active);
    
    return matchesSearch && matchesStatus;
  });

  const toggleActive = (id: string) => {
    setSchedules(schedules.map(s => 
      s.id === id ? { ...s, active: !s.active } : s
    ));
  };

  const getFrequencyColor = (frequency: string): string => {
    switch (frequency) {
      case 'Ежедневно':
        return 'bg-purple-100 text-purple-700';
      case 'Еженедельно':
        return 'bg-blue-100 text-blue-700';
      case 'Ежемесячно':
        return 'bg-green-100 text-green-700';
      case 'Ежеквартально':
        return 'bg-yellow-100 text-yellow-700';
      case 'Ежегодно':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Плановое обслуживание</h2>
          <p className="text-gray-600 mt-1">Настройка регулярных планово-предупредительных работ (ППР)</p>
        </div>
        <Button>
          <Plus size={20} className="mr-2" />
          Добавить расписание
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Поиск расписаний..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Все расписания</option>
          <option value="active">Активные</option>
          <option value="inactive">Неактивные</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Расписание
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Объект
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Периодичность
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Время
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Исполнитель
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Следующее выполнение
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSchedules.map((schedule) => (
              <tr key={schedule.id} className={`hover:bg-gray-50 ${!schedule.active ? 'opacity-50' : ''}`}>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{schedule.name}</span>
                    <span className="text-xs text-gray-500">{schedule.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-900">{schedule.serviceObjectName}</span>
                      <span className="text-xs text-gray-500">{schedule.serviceType}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFrequencyColor(schedule.frequency)} w-fit`}>
                      {schedule.frequency}
                    </span>
                    {schedule.dayOfWeek && (
                      <span className="text-xs text-gray-500">{schedule.dayOfWeek}</span>
                    )}
                    {schedule.dayOfMonth && (
                      <span className="text-xs text-gray-500">{schedule.dayOfMonth} число</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-900">{schedule.time}</span>
                      <span className="text-xs text-gray-500">{schedule.duration} мин</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {schedule.assignedEmployeeName ? (
                    <span className="text-sm text-gray-900">{schedule.assignedEmployeeName}</span>
                  ) : (
                    <span className="text-sm text-gray-400 italic">Не назначен</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-900">{schedule.nextExecution}</span>
                      {schedule.lastExecuted && (
                        <span className="text-xs text-gray-500">Последнее: {schedule.lastExecuted}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleActive(schedule.id)}
                      title={schedule.active ? 'Отключить' : 'Включить'}
                    >
                      <RefreshCw size={16} className={schedule.active ? 'text-green-600' : 'text-gray-400'} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => console.log('Edit', schedule.id)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm('Удалить расписание?')) {
                          setSchedules(schedules.filter(s => s.id !== schedule.id));
                        }
                      }}
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredSchedules.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Расписания не найдены</p>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Показано расписаний: {filteredSchedules.length} из {schedules.length}
      </div>
    </div>
  );
};

export default ScheduledMaintenance;
