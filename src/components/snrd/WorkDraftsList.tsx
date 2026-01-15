import { useState } from 'react';
import { Search, Clock, User, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WorkDraft {
  id: string;
  applicationId: string;
  employeeId: string;
  employeeName: string;
  serviceObjectName: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  status: 'Ожидает утверждения' | 'Утверждён' | 'Отклонён';
  createdBy: 'Автоматический планировщик' | 'Ручное назначение';
  confidence: number;
}

const mockWorkDrafts: WorkDraft[] = [
  {
    id: 'WD-001',
    applicationId: 'APP-2024-001',
    employeeId: 'E001',
    employeeName: 'Иванов Иван',
    serviceObjectName: 'ТЦ "Мега" - Кондиционер 1',
    scheduledDate: '2024-01-16',
    scheduledTime: '10:00',
    duration: 120,
    status: 'Ожидает утверждения',
    createdBy: 'Автоматический планировщик',
    confidence: 92,
  },
  {
    id: 'WD-002',
    applicationId: 'APP-2024-002',
    employeeId: 'E002',
    employeeName: 'Петров Петр',
    serviceObjectName: 'Офис "БизнесЦентр" - Вентиляция',
    scheduledDate: '2024-01-16',
    scheduledTime: '14:00',
    duration: 90,
    status: 'Ожидает утверждения',
    createdBy: 'Автоматический планировщик',
    confidence: 87,
  },
  {
    id: 'WD-003',
    applicationId: 'APP-2024-005',
    employeeId: 'E003',
    employeeName: 'Сидоров Сергей',
    serviceObjectName: 'Склад "Логистик" - Вентиляция 2',
    scheduledDate: '2024-01-17',
    scheduledTime: '09:00',
    duration: 180,
    status: 'Ожидает утверждения',
    createdBy: 'Ручное назначение',
    confidence: 100,
  },
];

const WorkDraftsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [drafts, setDrafts] = useState(mockWorkDrafts);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDrafts = drafts.filter(draft => {
    const matchesSearch = 
      draft.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      draft.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      draft.serviceObjectName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || draft.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: string) => {
    setDrafts(drafts.map(d => d.id === id ? { ...d, status: 'Утверждён' as const } : d));
  };

  const handleReject = (id: string) => {
    setDrafts(drafts.map(d => d.id === id ? { ...d, status: 'Отклонён' as const } : d));
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Ожидает утверждения':
        return 'bg-yellow-100 text-yellow-700';
      case 'Утверждён':
        return 'bg-green-100 text-green-700';
      case 'Отклонён':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Черновики работ</h2>
          <p className="text-gray-600 mt-1">Работы, созданные планировщиком, ожидают утверждения</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => drafts.filter(d => d.status === 'Ожидает утверждения').forEach(d => handleApprove(d.id))}
            variant="default"
          >
            Утвердить все
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Поиск по черновикам..."
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
          <option value="all">Все статусы</option>
          <option value="Ожидает утверждения">Ожидает утверждения</option>
          <option value="Утверждён">Утверждён</option>
          <option value="Отклонён">Отклонён</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredDrafts.map((draft) => (
          <div key={draft.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-gray-900">{draft.id}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(draft.status)}`}>
                    {draft.status}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                    {draft.createdBy}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User size={16} className="text-gray-400" />
                    <span className="text-gray-700">{draft.employeeName}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-gray-700">{draft.serviceObjectName}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-gray-700">
                      {draft.scheduledDate} в {draft.scheduledTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle size={16} className="text-gray-400" />
                    <span className="text-gray-700">
                      Длительность: {draft.duration} мин
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Уверенность алгоритма:</span>
                  <span className={`text-sm font-semibold ${getConfidenceColor(draft.confidence)}`}>
                    {draft.confidence}%
                  </span>
                </div>
              </div>

              {draft.status === 'Ожидает утверждения' && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleApprove(draft.id)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Утвердить
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReject(draft.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <XCircle size={16} className="mr-2" />
                    Отклонить
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredDrafts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Clock className="mx-auto text-gray-400 mb-3" size={48} />
          <p className="text-gray-500">Черновики не найдены</p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        Показано черновиков: {filteredDrafts.length} из {drafts.length}
      </div>
    </div>
  );
};

export default WorkDraftsList;
