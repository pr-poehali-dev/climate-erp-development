import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TabContentProps {
  activeTab: string;
  dashboardStats: Array<{ title: string; value: string; change: string; icon: string; color: string }>;
  revenueData: Array<{ month: string; revenue: number; costs: number }>;
  slaData: Array<{ name: string; value: number; color: string }>;
  orders: Array<{ id: string; client: string; equipment: string; status: string; priority: string; date: string; engineer: string }>;
  clients: Array<{ id: number; name: string; objects: number; equipment: number; lastService: string; contract: string }>;
  services: Array<{ id: number; name: string; price: number; time: string; materials: number; profitability: number }>;
  warehouse: Array<{ id: number; name: string; quantity: number; min: number; price: number; supplier: string }>;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
}

const TabContent = ({
  activeTab,
  dashboardStats,
  revenueData,
  slaData,
  orders,
  clients,
  services,
  warehouse,
  getStatusColor,
  getPriorityColor,
}: TabContentProps) => {
  return (
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
  );
};

export default TabContent;
