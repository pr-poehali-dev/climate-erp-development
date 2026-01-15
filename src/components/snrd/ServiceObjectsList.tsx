import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { ServiceObject, Client } from '@/types/snrd';

interface ServiceObjectsListProps {
  serviceObjects: ServiceObject[];
  clients: Client[];
  onEdit: (obj: ServiceObject) => void;
  onDelete: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  typeFilter: string;
  setTypeFilter: (filter: string) => void;
}

const ServiceObjectsList = ({ 
  serviceObjects, 
  clients,
  onEdit, 
  onDelete, 
  searchQuery, 
  setSearchQuery,
  typeFilter,
  setTypeFilter
}: ServiceObjectsListProps) => {
  const filteredObjects = serviceObjects.filter(obj => {
    const matchesSearch = obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         obj.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || obj.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getClientName = (clientId: string) => {
    return clients.find(c => c.id === clientId)?.name || clientId;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Объекты обслуживания ({filteredObjects.length})</CardTitle>
            <div className="flex gap-2">
              <Input 
                placeholder="Поиск по названию или адресу..." 
                className="w-80" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="Локация">Локация</SelectItem>
                  <SelectItem value="Актив">Актив</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Адрес</TableHead>
                <TableHead>Часовой пояс</TableHead>
                <TableHead>Назначенные сотрудники</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredObjects.map((obj) => (
                <TableRow key={obj.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {obj.type === 'Локация' ? (
                        <Icon name="Building2" size={16} className="text-blue-500" />
                      ) : (
                        <Icon name="Box" size={16} className="text-purple-500" />
                      )}
                      {obj.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={obj.type === 'Локация' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}>
                      {obj.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{getClientName(obj.clientId)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Icon name="MapPin" size={14} className="text-gray-400" />
                      {obj.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {obj.timezone.split('/')[1]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Icon name="Users" size={14} className="text-gray-400" />
                      {obj.assignedEmployees.length}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(obj)}>
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onDelete(obj.id)}>
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

export default ServiceObjectsList;
