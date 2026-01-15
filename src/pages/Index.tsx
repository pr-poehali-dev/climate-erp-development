import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const dashboardStats = [
    { title: 'Активные заказы', value: '24', change: '+12%', icon: 'Clipboard', color: 'text-blue-600' },
    { title: 'SLA выполнение', value: '94.5%', change: '+2.3%', icon: 'Target', color: 'text-green-600' },
    { title: 'Рентабельность', value: '42%', change: '+5%', icon: 'TrendingUp', color: 'text-purple-600' },
    { title: 'Склад (позиций)', value: '156', change: '-8', icon: 'Package', color: 'text-orange-600' },
  ];

  const revenueData = [
    { month: 'Янв', revenue: 65000, costs: 42000 },
    { month: 'Фев', revenue: 78000, costs: 48000 },
    { month: 'Мар', revenue: 92000, costs: 55000 },
    { month: 'Апр', revenue: 88000, costs: 52000 },
    { month: 'Май', revenue: 105000, costs: 61000 },
    { month: 'Июн', revenue: 118000, costs: 68000 },
  ];

  const slaData = [
    { name: 'Выполнено вовремя', value: 85, color: '#0EA5E9' },
    { name: 'С опозданием', value: 12, color: '#F97316' },
    { name: 'В работе', value: 3, color: '#10B981' },
  ];

  const orders = [
    { id: 'ORD-001', client: 'ООО "Торговый Дом"', equipment: 'Чиллер Daikin', status: 'В работе', priority: 'Высокий', date: '2026-01-15', engineer: 'Иванов И.И.' },
    { id: 'ORD-002', client: 'ТЦ "Галерея"', equipment: 'Кондиционер VRV', status: 'Назначен', priority: 'Средний', date: '2026-01-14', engineer: 'Петров П.П.' },
    { id: 'ORD-003', client: 'Отель "Премьер"', equipment: 'Вентиляция', status: 'Завершен', priority: 'Низкий', date: '2026-01-13', engineer: 'Сидоров С.С.' },
    { id: 'ORD-004', client: 'БЦ "Сити Плаза"', equipment: 'Чиллер York', status: 'Новый', priority: 'Срочно', date: '2026-01-15', engineer: '-' },
  ];

  const clients = [
    { id: 1, name: 'ООО "Торговый Дом"', objects: 3, equipment: 12, lastService: '2026-01-10', contract: 'Активен' },
    { id: 2, name: 'ТЦ "Галерея"', objects: 1, equipment: 8, lastService: '2026-01-05', contract: 'Активен' },
    { id: 3, name: 'Отель "Премьер"', objects: 5, equipment: 24, lastService: '2026-01-12', contract: 'Активен' },
    { id: 4, name: 'БЦ "Сити Плаза"', objects: 2, equipment: 15, lastService: '2025-12-28', contract: 'На продлении' },
  ];

  const services = [
    { id: 1, name: 'ТО чиллера (базовое)', price: 15000, time: '4 ч', materials: 3, profitability: 38 },
    { id: 2, name: 'Заправка фреоном R410A', price: 8500, time: '2 ч', materials: 2, profitability: 45 },
    { id: 3, name: 'Замена компрессора', price: 65000, time: '8 ч', materials: 5, profitability: 28 },
    { id: 4, name: 'Диагностика системы', price: 5000, time: '1.5 ч', materials: 0, profitability: 72 },
  ];

  const warehouse = [
    { id: 1, name: 'Фреон R410A (1кг)', quantity: 45, min: 20, price: 1200, supplier: 'Химснаб' },
    { id: 2, name: 'Компрессор Danfoss', quantity: 3, min: 2, price: 42000, supplier: 'Daikin' },
    { id: 3, name: 'Фильтр-осушитель', quantity: 28, min: 15, price: 850, supplier: 'ТехноХолод' },
    { id: 4, name: 'Термостат цифровой', quantity: 12, min: 10, price: 3500, supplier: 'Холод-Сервис' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'В работе': return 'bg-blue-100 text-blue-700';
      case 'Назначен': return 'bg-purple-100 text-purple-700';
      case 'Завершен': return 'bg-green-100 text-green-700';
      case 'Новый': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Срочно': return 'bg-red-100 text-red-700';
      case 'Высокий': return 'bg-orange-100 text-orange-700';
      case 'Средний': return 'bg-yellow-100 text-yellow-700';
      case 'Низкий': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <Icon name="Wind" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">ClimateERP</h1>
              <p className="text-xs text-gray-500">Управление сервисом</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Главная', icon: 'LayoutDashboard' },
              { id: 'orders', label: 'Заказы', icon: 'Clipboard' },
              { id: 'clients', label: 'Клиенты', icon: 'Users' },
              { id: 'services', label: 'Услуги', icon: 'Wrench' },
              { id: 'warehouse', label: 'Склад', icon: 'Package' },
              { id: 'analytics', label: 'Аналитика', icon: 'BarChart3' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon name={item.icon} size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <Icon name="User" size={16} className="text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Администратор</p>
              <p className="text-xs text-gray-500">admin@company.ru</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {activeTab === 'dashboard' && 'Главная панель'}
                {activeTab === 'orders' && 'Управление заказами'}
                {activeTab === 'clients' && 'База клиентов'}
                {activeTab === 'services' && 'Каталог услуг'}
                {activeTab === 'warehouse' && 'Складской учет'}
                {activeTab === 'analytics' && 'Аналитика и отчеты'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">15 января 2026</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
              <Button size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Создать
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, index) => (
                  <Card key={index} className="hover-scale">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                          <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change} за неделю
                          </p>
                        </div>
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center ${stat.color}`}>
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
                    <CardTitle>Выручка и затраты</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#0EA5E9" name="Выручка" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="costs" fill="#33C3F0" name="Затраты" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Выполнение SLA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={slaData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.name}: ${entry.value}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {slaData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Последние заказы</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Номер</TableHead>
                        <TableHead>Клиент</TableHead>
                        <TableHead>Оборудование</TableHead>
                        <TableHead>Инженер</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Приоритет</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.slice(0, 5).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.client}</TableCell>
                          <TableCell>{order.equipment}</TableCell>
                          <TableCell>{order.engineer}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(order.priority)}>{order.priority}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Все заказы</CardTitle>
                    <div className="flex gap-2">
                      <Input placeholder="Поиск по клиенту..." className="w-64" />
                      <Select defaultValue="all">
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все статусы</SelectItem>
                          <SelectItem value="new">Новый</SelectItem>
                          <SelectItem value="progress">В работе</SelectItem>
                          <SelectItem value="completed">Завершен</SelectItem>
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
                        <TableHead>Дата</TableHead>
                        <TableHead>Клиент</TableHead>
                        <TableHead>Оборудование</TableHead>
                        <TableHead>Инженер</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Приоритет</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.client}</TableCell>
                          <TableCell>{order.equipment}</TableCell>
                          <TableCell>{order.engineer}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(order.priority)}>{order.priority}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Icon name="Eye" size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>База клиентов</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Клиент</TableHead>
                        <TableHead>Объектов</TableHead>
                        <TableHead>Оборудование</TableHead>
                        <TableHead>Последнее ТО</TableHead>
                        <TableHead>Договор</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>{client.objects}</TableCell>
                          <TableCell>{client.equipment} ед.</TableCell>
                          <TableCell>{client.lastService}</TableCell>
                          <TableCell>
                            <Badge className={client.contract === 'Активен' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                              {client.contract}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Icon name="Eye" size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Icon name="Building2" size={16} />
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
          )}

          {activeTab === 'services' && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Каталог услуг</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Услуга</TableHead>
                        <TableHead>Цена</TableHead>
                        <TableHead>Время</TableHead>
                        <TableHead>Материалов</TableHead>
                        <TableHead>Рентабельность</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">{service.name}</TableCell>
                          <TableCell>{service.price.toLocaleString()} ₽</TableCell>
                          <TableCell>{service.time}</TableCell>
                          <TableCell>{service.materials} поз.</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{ width: `${service.profitability}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{service.profitability}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Icon name="FileText" size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'warehouse' && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Складской учет</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Наименование</TableHead>
                        <TableHead>Остаток</TableHead>
                        <TableHead>Мин. остаток</TableHead>
                        <TableHead>Цена</TableHead>
                        <TableHead>Поставщик</TableHead>
                        <TableHead>Статус</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {warehouse.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>
                            <span className={item.quantity < item.min ? 'text-red-600 font-semibold' : ''}>
                              {item.quantity}
                            </span>
                          </TableCell>
                          <TableCell>{item.min}</TableCell>
                          <TableCell>{item.price.toLocaleString()} ₽</TableCell>
                          <TableCell>{item.supplier}</TableCell>
                          <TableCell>
                            {item.quantity < item.min ? (
                              <Badge className="bg-red-100 text-red-700">Требуется заказ</Badge>
                            ) : (
                              <Badge className="bg-green-100 text-green-700">В наличии</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Динамика выручки</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#0EA5E9" strokeWidth={3} name="Выручка" />
                        <Line type="monotone" dataKey="costs" stroke="#F97316" strokeWidth={3} name="Затраты" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ключевые показатели</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Средний чек</span>
                        <span className="text-lg font-bold">28,450 ₽</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Заказов в месяц</span>
                        <span className="text-lg font-bold">48</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Время на заказ</span>
                        <span className="text-lg font-bold">4.2 ч</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Удовлетворенность</span>
                        <span className="text-lg font-bold">4.8/5.0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Повторные клиенты</span>
                        <span className="text-lg font-bold">68%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Топ услуг по выручке</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.sort((a, b) => b.price - a.price).map((service, index) => (
                      <div key={service.id} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{service.name}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>Цена: {service.price.toLocaleString()} ₽</span>
                            <span>•</span>
                            <span>Рентабельность: {service.profitability}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
