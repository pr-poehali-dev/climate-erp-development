import { useState } from 'react';
import { Search, FileText, Building, Calendar, DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Contract {
  id: string;
  clientName: string;
  contractNumber: string;
  startDate: string;
  endDate: string;
  value: number;
  status: 'Активен' | 'Истекает' | 'Завершен';
  objectsCount: number;
}

const mockContracts: Contract[] = [
  {
    id: '1',
    clientName: 'ООО "ТехноСервис"',
    contractNumber: 'ДОГ-2024-001',
    startDate: '2024-01-15',
    endDate: '2025-01-14',
    value: 1500000,
    status: 'Активен',
    objectsCount: 12,
  },
  {
    id: '2',
    clientName: 'АО "ПромСтрой"',
    contractNumber: 'ДОГ-2024-002',
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    value: 850000,
    status: 'Истекает',
    objectsCount: 5,
  },
  {
    id: '3',
    clientName: 'ИП Смирнов А.П.',
    contractNumber: 'ДОГ-2023-045',
    startDate: '2023-06-01',
    endDate: '2024-05-31',
    value: 320000,
    status: 'Завершен',
    objectsCount: 2,
  },
];

const ContractsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Активен':
        return 'bg-green-100 text-green-700';
      case 'Истекает':
        return 'bg-yellow-100 text-yellow-700';
      case 'Завершен':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredContracts = mockContracts.filter(contract => {
    const matchesSearch = 
      contract.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.contractNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Подряды</h2>
          <p className="text-gray-600 mt-1">Управление договорами с подрядчиками</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Поиск по договорам..."
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
          <option value="Активен">Активен</option>
          <option value="Истекает">Истекает</option>
          <option value="Завершен">Завершен</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContracts.map((contract) => (
          <div key={contract.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="text-purple-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{contract.contractNumber}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contract.status)}`}>
                    {contract.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Building size={16} className="text-gray-400" />
                <span className="text-gray-700">{contract.clientName}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-gray-600">
                  {contract.startDate} — {contract.endDate}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <DollarSign size={16} className="text-gray-400" />
                <span className="text-gray-900 font-semibold">
                  {contract.value.toLocaleString('ru-RU')} ₽
                </span>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-600">
                  Объектов: <span className="font-medium text-gray-900">{contract.objectsCount}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContracts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">Договоры не найдены</p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        Показано договоров: {filteredContracts.length} из {mockContracts.length}
      </div>
    </div>
  );
};

export default ContractsList;
