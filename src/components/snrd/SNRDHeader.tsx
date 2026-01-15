import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface SNRDHeaderProps {
  activeTab: string;
  onCreateNew: () => void;
}

const tabTitles: Record<string, string> = {
  dashboard: 'Главная панель',
  applications: 'Заявки',
  'application-drafts': 'Черновики заявок',
  'work-orders': 'Наряды',
  contracts: 'Подряды',
  'work-drafts': 'Черновики работ',
  'completion-acts': 'Акты выполненных работ',
  'assign-executors': 'Назначение исполнителей',
  'auto-planning': 'Автоматическое планирование',
  'survey-templates': 'Шаблоны анкет',
  'survey-journal': 'Журнал анкет',
  'scheduled-maintenance': 'Плановое обслуживание',
  reports: 'Отчеты и аналитика',
  employees: 'Выездные сотрудники',
  contractors: 'Подрядчики',
  clients: 'Клиенты',
  'service-objects': 'Объекты обслуживания',
  'service-types': 'Виды работ и услуг',
  'typed-tasks': 'Типовые задачи',
  sla: 'Соглашения об уровнях сервиса',
  territories: 'Территории обслуживания',
  licensing: 'Лицензирование',
  'office-users': 'Пользователи офиса',
  'work-groups': 'Рабочие группы',
  roles: 'Конструктор ролей',
  integrations: 'Интеграции с внешними системами',
  import: 'Импорт данных',
};

const SNRDHeader = ({ activeTab, onCreateNew }: SNRDHeaderProps) => {
  const showCreateButton = [
    'applications',
    'work-orders',
    'contracts',
    'employees',
    'contractors',
    'clients',
    'service-objects',
    'service-types',
    'typed-tasks',
    'sla',
    'scheduled-maintenance',
    'survey-templates',
  ].includes(activeTab);

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {tabTitles[activeTab] || 'SNRD Платформа'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {new Date().toLocaleDateString('ru-RU', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт
          </Button>
          {showCreateButton && (
            <Button size="sm" onClick={onCreateNew}>
              <Icon name="Plus" size={16} className="mr-2" />
              Создать
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default SNRDHeader;
