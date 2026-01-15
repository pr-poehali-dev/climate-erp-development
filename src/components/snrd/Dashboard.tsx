import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Application, WorkOrder } from '@/types/snrd';

interface DashboardProps {
  applications: Application[];
  workOrders: WorkOrder[];
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
}

const Dashboard = ({ applications, workOrders, getStatusColor, getPriorityColor }: DashboardProps) => {
  const stats = [
    { 
      title: 'Активные заявки', 
      value: applications.filter(a => a.status !== 'Выполнена' && a.status !== 'Отменена').length.toString(), 
      change: '+8%', 
      icon: 'ClipboardList', 
      color: 'text-blue-600' 
    },
    { 
      title: 'В работе нарядов', 
      value: workOrders.filter(w => w.status === 'В работе').length.toString(), 
      change: '+12%', 
      icon: 'Wrench', 
      color: 'text-green-600' 
    },
    { 
      title: 'SLA выполнение', 
      value: '96.2%', 
      change: '+1.8%', 
      icon: 'Target', 
      color: 'text-purple-600' 
    },
    { 
      title: 'Выездных сотрудников', 
      value: '24', 
      change: '+2', 
      icon: 'Users', 
      color: 'text-orange-600' 
    },
  ];

  const performanceData = [
    { month: 'Янв', completed: 145, planned: 160, sla: 94 },
    { month: 'Фев', completed: 167, planned: 175, sla: 95 },
    { month: 'Мар', completed: 189, planned: 195, sla: 97 },
    { month: 'Апр', completed: 178, planned: 185, sla: 96 },
    { month: 'Май', completed: 202, planned: 210, sla: 96 },
    { month: 'Июн', completed: 215, planned: 220, sla: 98 },
  ];

  const statusDistribution = [
    { name: 'Новые', value: 18, color: '#3B82F6' },
    { name: 'В работе', value: 45, color: '#10B981' },
    { name: 'На паузе', value: 8, color: '#F59E0B' },
    { name: 'Выполнены', value: 29, color: '#6366F1' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} за месяц
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center ${stat.color}`}>
                  <Icon name={stat.icon} size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Динамика выполнения работ</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#3B82F6" name="Выполнено" radius={[8, 8, 0, 0]} />
                <Bar dataKey="planned" fill="#93C5FD" name="Запланировано" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Распределение по статусам</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>SLA выполнение по месяцам</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" domain={[90, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sla" stroke="#8B5CF6" strokeWidth={3} name="SLA %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Текущие аварийные заявки</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Номер</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>SLA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.filter(a => a.isEmergency).slice(0, 4).map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.number}</TableCell>
                    <TableCell>Клиент #{app.clientId}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                    </TableCell>
                    <TableCell className="text-red-600 font-medium">
                      {new Date(app.slaDeadline).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Последние заявки</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Номер</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Объект</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Приоритет</TableHead>
                <TableHead>Создана</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.slice(0, 8).map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.number}</TableCell>
                  <TableCell>Клиент #{app.clientId}</TableCell>
                  <TableCell>Объект #{app.objectId}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(app.priority)}>{app.priority}</Badge>
                  </TableCell>
                  <TableCell>{new Date(app.createdAt).toLocaleDateString('ru-RU')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
