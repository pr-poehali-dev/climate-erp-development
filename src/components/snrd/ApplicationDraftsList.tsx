import { useState } from 'react';
import { Search, AlertTriangle, RefreshCw, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ApplicationDraft {
  id: string;
  source: string;
  receivedAt: string;
  errorType: string;
  errorMessage: string;
  rawData: Record<string, unknown>;
  attemptCount: number;
}

const mockDrafts: ApplicationDraft[] = [
  {
    id: 'DRAFT-001',
    source: 'Email Integration',
    receivedAt: '2024-01-15 10:23:45',
    errorType: 'Validation Error',
    errorMessage: 'Не указан обязательный параметр: clientId',
    rawData: {
      subject: 'Требуется ремонт кондиционера',
      description: 'Не работает охлаждение в офисе',
      priority: 'Высокий',
    },
    attemptCount: 2,
  },
  {
    id: 'DRAFT-002',
    source: 'API Webhook',
    receivedAt: '2024-01-15 11:45:12',
    errorType: 'Format Error',
    errorMessage: 'Неверный формат даты в поле scheduledDate',
    rawData: {
      clientId: 'C123',
      serviceType: 'Техобслуживание',
      scheduledDate: '15/01/2024',
    },
    attemptCount: 1,
  },
  {
    id: 'DRAFT-003',
    source: 'Mobile App',
    receivedAt: '2024-01-15 14:20:33',
    errorType: 'Reference Error',
    errorMessage: 'Объект обслуживания с ID OBJ-999 не найден',
    rawData: {
      objectId: 'OBJ-999',
      description: 'Плановая проверка',
      priority: 'Средний',
    },
    attemptCount: 3,
  },
];

const ApplicationDraftsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [drafts, setDrafts] = useState(mockDrafts);

  const filteredDrafts = drafts.filter(draft => 
    draft.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    draft.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
    draft.errorMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRetry = (id: string) => {
    console.log('Retry draft:', id);
  };

  const handleApprove = (id: string) => {
    setDrafts(drafts.filter(d => d.id !== id));
    console.log('Draft approved and converted to application:', id);
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить черновик безвозвратно?')) {
      setDrafts(drafts.filter(d => d.id !== id));
    }
  };

  const getErrorColor = (attemptCount: number): string => {
    if (attemptCount >= 3) return 'text-red-600';
    if (attemptCount >= 2) return 'text-orange-600';
    return 'text-yellow-600';
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Черновики заявок</h2>
          <p className="text-gray-600 mt-1">Заявки с ошибками из внешних систем</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Поиск по черновикам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredDrafts.map((draft) => (
          <div key={draft.id} className="bg-white rounded-lg shadow-sm border border-orange-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <AlertTriangle className={getErrorColor(draft.attemptCount)} size={24} />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{draft.id}</h3>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                      {draft.source}
                    </span>
                    <span className="text-sm text-gray-500">{draft.receivedAt}</span>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      {draft.errorType}
                    </p>
                    <p className="text-sm text-red-600">
                      {draft.errorMessage}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-500 mb-2">Исходные данные:</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto">
                      {JSON.stringify(draft.rawData, null, 2)}
                    </pre>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <span className="text-gray-600">
                      Попыток обработки: <span className={`font-semibold ${getErrorColor(draft.attemptCount)}`}>
                        {draft.attemptCount}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRetry(draft.id)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Повторить
                </Button>
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
                  onClick={() => handleDelete(draft.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={16} className="mr-2" />
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDrafts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <AlertTriangle className="mx-auto text-gray-400 mb-3" size={48} />
          <p className="text-gray-500">Черновики не найдены</p>
          <p className="text-sm text-gray-400 mt-1">Все заявки успешно обработаны</p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        Показано черновиков: {filteredDrafts.length} из {drafts.length}
      </div>
    </div>
  );
};

export default ApplicationDraftsList;
