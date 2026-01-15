import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { Application } from '@/types/snrd';

interface ApplicationsListProps {
  applications: Application[];
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  priorityFilter: string;
  setPriorityFilter: (filter: string) => void;
}

const ApplicationsList = ({
  applications,
  getStatusColor,
  getPriorityColor,
  onEdit,
  onDelete,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}: ApplicationsListProps) => {
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || app.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const slaWarning = (deadline: string) => {
    const now = new Date();
    const sla = new Date(deadline);
    const hoursLeft = (sla.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursLeft < 0) return 'Нарушен';
    if (hoursLeft < 2) return `Осталось ${Math.floor(hoursLeft * 60)} мин`;
    if (hoursLeft < 24) return `Осталось ${Math.floor(hoursLeft)} ч`;
    return `${Math.floor(hoursLeft / 24)} дн`;
  };

  const slaColor = (deadline: string) => {
    const now = new Date();
    const sla = new Date(deadline);
    const hoursLeft = (sla.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursLeft < 0) return 'text-red-600 font-bold';
    if (hoursLeft < 2) return 'text-red-600 font-semibold';
    if (hoursLeft < 24) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Все заявки ({filteredApplications.length})</CardTitle>
            <div className="flex gap-2">
              <Input 
                placeholder="Поиск по номеру или описанию..." 
                className="w-64" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="Новая">Новая</SelectItem>
                  <SelectItem value="В работе">В работе</SelectItem>
                  <SelectItem value="Приостановлена">Приостановлена</SelectItem>
                  <SelectItem value="Выполнена">Выполнена</SelectItem>
                  <SelectItem value="Отменена">Отменена</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все приоритеты</SelectItem>
                  <SelectItem value="Низкий">Низкий</SelectItem>
                  <SelectItem value="Средний">Средний</SelectItem>
                  <SelectItem value="Высокий">Высокий</SelectItem>
                  <SelectItem value="Срочно">Срочно</SelectItem>
                  <SelectItem value="Аварийный">Аварийный</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Номер</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Объект</TableHead>
                <TableHead>Создана</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Приоритет</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead>Аварийная</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.number}</TableCell>
                  <TableCell>Клиент #{app.clientId}</TableCell>
                  <TableCell>Объект #{app.objectId}</TableCell>
                  <TableCell>{new Date(app.createdAt).toLocaleDateString('ru-RU')}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(app.priority)}>{app.priority}</Badge>
                  </TableCell>
                  <TableCell className={slaColor(app.slaDeadline)}>
                    {slaWarning(app.slaDeadline)}
                  </TableCell>
                  <TableCell>
                    {app.isEmergency && (
                      <Badge className="bg-red-100 text-red-700">
                        <Icon name="AlertTriangle" size={12} className="mr-1" />
                        Аварийная
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(app)}>
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onDelete(app.id)}>
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsList;
