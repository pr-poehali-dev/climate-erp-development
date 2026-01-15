import { useState } from 'react';
import SNRDSidebar from '@/components/snrd/SNRDSidebar';
import SNRDHeader from '@/components/snrd/SNRDHeader';
import Dashboard from '@/components/snrd/Dashboard';
import ApplicationsList from '@/components/snrd/ApplicationsList';
import EmployeesList from '@/components/snrd/EmployeesList';
import ClientsList from '@/components/snrd/ClientsList';
import ServiceObjectsList from '@/components/snrd/ServiceObjectsList';
import ApplicationModal from '@/components/snrd/ApplicationModal';
import EmployeeModal from '@/components/snrd/EmployeeModal';
import ClientModal from '@/components/snrd/ClientModal';
import ServiceObjectModal from '@/components/snrd/ServiceObjectModal';
import { toast } from 'sonner';
import { Application, WorkOrder, ApplicationStatus, Priority, WorkOrderStatus, Employee, Client, ServiceObject } from '@/types/snrd';
import { mockApplications, mockWorkOrders, mockClients, mockEmployees, mockServiceObjects, mockServiceTypes } from '@/data/snrdTestData';

const SNRD = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const [employeeSearchQuery, setEmployeeSearchQuery] = useState('');
  const [clientSearchQuery, setClientSearchQuery] = useState('');
  const [objectSearchQuery, setObjectSearchQuery] = useState('');

  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(mockWorkOrders);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [serviceObjects, setServiceObjects] = useState<ServiceObject[]>(mockServiceObjects);

  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [serviceObjectModalOpen, setServiceObjectModalOpen] = useState(false);
  
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [editingServiceObject, setEditingServiceObject] = useState<ServiceObject | null>(null);

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
    switch (activeTab) {
      case 'applications':
        setEditingApplication(null);
        setApplicationModalOpen(true);
        break;
      case 'employees':
        setEditingEmployee(null);
        setEmployeeModalOpen(true);
        break;
      case 'clients':
        setEditingClient(null);
        setClientModalOpen(true);
        break;
      case 'service-objects':
        setEditingServiceObject(null);
        setServiceObjectModalOpen(true);
        break;
      default:
        toast.info('Создание элемента для этого раздела в разработке');
    }
  };

  const handleEdit = (app: Application) => {
    setEditingApplication(app);
    setApplicationModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setApplications(applications.filter(a => a.id !== id));
    toast.success('Заявка удалена');
  };

  const handleSaveApplication = (appData: Partial<Application>) => {
    if (editingApplication) {
      setApplications(applications.map(a => a.id === editingApplication.id ? { ...editingApplication, ...appData } : a));
      toast.success('Заявка обновлена');
    } else {
      const newApp: Application = {
        id: `APP-${Date.now()}`,
        number: appData.number || `APP-${Date.now().toString().slice(-6)}`,
        clientId: appData.clientId!,
        objectId: appData.objectId!,
        serviceTypeId: appData.serviceTypeId!,
        status: appData.status || 'Новая',
        priority: appData.priority || 'Средний',
        createdAt: appData.createdAt || new Date().toISOString(),
        slaDeadline: appData.slaDeadline || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        description: appData.description!,
        isEmergency: appData.isEmergency || false,
        plannedStartDate: appData.plannedStartDate,
        plannedEndDate: appData.plannedEndDate,
      };
      setApplications([...applications, newApp]);
      toast.success('Заявка создана');
    }
  };

  const handleSaveEmployee = (empData: Partial<Employee>) => {
    if (editingEmployee) {
      setEmployees(employees.map(e => e.id === editingEmployee.id ? { ...editingEmployee, ...empData } : e));
      toast.success('Данные сотрудника обновлены');
    } else {
      const newEmp: Employee = {
        id: empData.id || `E${Date.now().toString().slice(-3)}`,
        fullName: empData.fullName!,
        position: empData.position!,
        phone: empData.phone!,
        email: empData.email!,
        status: empData.status || 'На смене',
        competencies: empData.competencies || [],
        workSchedule: empData.workSchedule || '5/2',
        employmentType: empData.employmentType || 'Сотрудник компании',
        territory: empData.territory || '',
        workGroup: empData.workGroup || '',
        licensed: empData.licensed || false,
      };
      setEmployees([...employees, newEmp]);
      toast.success('Сотрудник добавлен');
    }
  };

  const handleSaveClient = (clientData: Partial<Client>) => {
    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { ...editingClient, ...clientData } : c));
      toast.success('Данные клиента обновлены');
    } else {
      const newClient: Client = {
        id: clientData.id || `C${Date.now().toString().slice(-3)}`,
        name: clientData.name!,
        contactPerson: clientData.contactPerson!,
        phone: clientData.phone!,
        email: clientData.email!,
        contract: clientData.contract || 'Активен',
        slaAgreement: clientData.slaAgreement || `SLA-${Date.now().toString().slice(-3)}`,
        objectsCount: clientData.objectsCount || 0,
        assetsCount: clientData.assetsCount || 0,
      };
      setClients([...clients, newClient]);
      toast.success('Клиент добавлен');
    }
  };

  const handleSaveServiceObject = (objData: Partial<ServiceObject>) => {
    if (editingServiceObject) {
      setServiceObjects(serviceObjects.map(o => o.id === editingServiceObject.id ? { ...editingServiceObject, ...objData } : o));
      toast.success('Объект обслуживания обновлен');
    } else {
      const newObj: ServiceObject = {
        id: objData.id || `OBJ-${Date.now().toString().slice(-4)}`,
        name: objData.name!,
        type: objData.type || 'Локация',
        clientId: objData.clientId!,
        address: objData.address!,
        coordinates: objData.coordinates,
        parentId: objData.parentId,
        assignedEmployees: objData.assignedEmployees || [],
        timezone: objData.timezone || 'Europe/Moscow',
      };
      setServiceObjects([...serviceObjects, newObj]);
      toast.success('Объект обслуживания добавлен');
    }
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
          <EmployeesList
            employees={employees}
            onEdit={(emp) => {
              setEditingEmployee(emp);
              setEmployeeModalOpen(true);
            }}
            onDelete={(id) => {
              setEmployees(employees.filter(e => e.id !== id));
              toast.success('Сотрудник удален');
            }}
            searchQuery={employeeSearchQuery}
            setSearchQuery={setEmployeeSearchQuery}
          />
        );

      case 'clients':
        return (
          <ClientsList
            clients={clients}
            onEdit={(client) => {
              setEditingClient(client);
              setClientModalOpen(true);
            }}
            onDelete={(id) => {
              setClients(clients.filter(c => c.id !== id));
              toast.success('Клиент удален');
            }}
            searchQuery={clientSearchQuery}
            setSearchQuery={setClientSearchQuery}
          />
        );

      case 'service-objects':
        return (
          <ServiceObjectsList
            serviceObjects={serviceObjects}
            clients={clients}
            onEdit={(obj) => {
              setEditingServiceObject(obj);
              setServiceObjectModalOpen(true);
            }}
            onDelete={(id) => {
              setServiceObjects(serviceObjects.filter(o => o.id !== id));
              toast.success('Объект удален');
            }}
            searchQuery={objectSearchQuery}
            setSearchQuery={setObjectSearchQuery}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
          />
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

      <ApplicationModal
        open={applicationModalOpen}
        onClose={() => {
          setApplicationModalOpen(false);
          setEditingApplication(null);
        }}
        onSave={handleSaveApplication}
        application={editingApplication}
        clients={clients}
        serviceObjects={serviceObjects}
        serviceTypes={mockServiceTypes}
      />

      <EmployeeModal
        open={employeeModalOpen}
        onClose={() => {
          setEmployeeModalOpen(false);
          setEditingEmployee(null);
        }}
        onSave={handleSaveEmployee}
        employee={editingEmployee}
      />

      <ClientModal
        open={clientModalOpen}
        onClose={() => {
          setClientModalOpen(false);
          setEditingClient(null);
        }}
        onSave={handleSaveClient}
        client={editingClient}
      />

      <ServiceObjectModal
        open={serviceObjectModalOpen}
        onClose={() => {
          setServiceObjectModalOpen(false);
          setEditingServiceObject(null);
        }}
        onSave={handleSaveServiceObject}
        serviceObject={editingServiceObject}
        clients={clients}
        employees={employees}
        serviceObjects={serviceObjects}
      />
    </div>
  );
};

export default SNRD;