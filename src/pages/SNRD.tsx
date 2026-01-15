import { useState } from 'react';
import SNRDSidebar from '@/components/snrd/SNRDSidebar';
import SNRDHeader from '@/components/snrd/SNRDHeader';
import Dashboard from '@/components/snrd/Dashboard';
import ApplicationsList from '@/components/snrd/ApplicationsList';
import { toast } from 'sonner';
import { Application, WorkOrder, ApplicationStatus, Priority, WorkOrderStatus } from '@/types/snrd';
import { mockApplications, mockWorkOrders, mockClients, mockEmployees, mockServiceObjects } from '@/data/snrdTestData';

const SNRD = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(mockWorkOrders);

  const getStatusColor = (status: ApplicationStatus | WorkOrderStatus): string => {
    switch (status) {
      case 'Новая':
      case 'Назначен':
        return 'bg-blue-100 text-blue-700';
      case 'В работе':
      case 'Принят':
        return 'bg-green-100 text-green-700';
      case 'В пути':
        return 'bg-yellow-100 text-yellow-700';
      case 'Выполнена':
      case 'Выполнен':
        return 'bg-purple-100 text-purple-700';
      case 'Отменена':
      case 'Отменен':
        return 'bg-gray-100 text-gray-700';
      case 'Приостановлена':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: Priority): string => {
    switch (priority) {
      case 'Аварийный':
        return 'bg-red-100 text-red-700 font-bold';
      case 'Срочно':
        return 'bg-red-100 text-red-700';
      case 'Высокий':
        return 'bg-orange-100 text-orange-700';
      case 'Средний':
        return 'bg-yellow-100 text-yellow-700';
      case 'Низкий':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCreateNew = () => {
    toast.info('Модальное окно создания в разработке');
  };

  const handleEdit = (app: Application) => {
    toast.info(`Редактирование заявки ${app.number}`);
  };

  const handleDelete = (id: string) => {
    setApplications(applications.filter(a => a.id !== id));
    toast.success('Заявка удалена');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            applications={applications}
            workOrders={workOrders}
            getStatusColor={getStatusColor}
            getPriorityColor={getPriorityColor}
          />
        );
      
      case 'applications':
        return (
          <ApplicationsList
            applications={applications}
            getStatusColor={getStatusColor}
            getPriorityColor={getPriorityColor}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />
        );

      case 'application-drafts':
        return (
          <div className="p-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Черновики заявок</h3>
              <p className="text-blue-700">Заявки с ошибками из внешних систем будут отображаться здесь</p>
            </div>
          </div>
        );

      case 'work-orders':
        return (
          <div className="p-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Наряды</h3>
              <p className="text-green-700">Список нарядов для сотрудников компании ({workOrders.length} активных)</p>
            </div>
          </div>
        );

      case 'contracts':
        return (
          <div className="p-8">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Подряды</h3>
              <p className="text-purple-700">Работы для подрядчиков</p>
            </div>
          </div>
        );

      case 'work-drafts':
        return (
          <div className="p-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Черновики работ</h3>
              <p className="text-yellow-700">Работы, созданные автоматическим планировщиком, ожидают утверждения</p>
            </div>
          </div>
        );

      case 'assign-executors':
        return (
          <div className="p-8">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">Назначение исполнителей</h3>
              <p className="text-indigo-700">Ручное назначение работ на выездных сотрудников с автоматическим подбором</p>
            </div>
          </div>
        );

      case 'auto-planning':
        return (
          <div className="p-8">
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-cyan-900 mb-2">Автоматическое планирование</h3>
              <p className="text-cyan-700">Массовое создание черновиков работ с помощью алгоритма пчелиной колонии</p>
            </div>
          </div>
        );

      case 'employees':
        return (
          <div className="p-8">
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-teal-900 mb-2">Выездные сотрудники</h3>
              <p className="text-teal-700">Справочник сотрудников с типом найма "Сотрудник компании"</p>
            </div>
          </div>
        );

      case 'clients':
        return (
          <div className="p-8">
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-pink-900 mb-2">Клиенты</h3>
              <p className="text-pink-700">База клиентов и управление их объектами обслуживания</p>
            </div>
          </div>
        );

      case 'scheduled-maintenance':
        return (
          <div className="p-8">
            <div className="bg-violet-50 border border-violet-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-violet-900 mb-2">Плановое обслуживание</h3>
              <p className="text-violet-700">Настройка регулярных планово-предупредительных работ (ППР)</p>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="p-8">
            <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-fuchsia-900 mb-2">Отчеты и аналитика</h3>
              <p className="text-fuchsia-700">Сводная отчетность по различным срезам данных</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Раздел в разработке</h3>
              <p className="text-gray-700">Функционал раздела "{activeTab}" будет добавлен позже</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SNRDSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-auto">
        <SNRDHeader 
          activeTab={activeTab} 
          onCreateNew={handleCreateNew}
        />
        {renderContent()}
      </main>
    </div>
  );
};

export default SNRD;