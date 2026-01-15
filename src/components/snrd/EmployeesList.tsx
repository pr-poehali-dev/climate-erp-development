import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { Employee } from '@/types/snrd';

interface EmployeesListProps {
  employees: Employee[];
  onEdit: (emp: Employee) => void;
  onDelete: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const EmployeesList = ({ 
  employees, 
  onEdit, 
  onDelete, 
  searchQuery, 
  setSearchQuery 
}: EmployeesListProps) => {
  const filteredEmployees = employees.filter(emp => 
    emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.territory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'На смене': return 'bg-green-100 text-green-700';
      case 'Перерыв': return 'bg-yellow-100 text-yellow-700';
      case 'Обед': return 'bg-orange-100 text-orange-700';
      case 'Завершил смену': return 'bg-gray-100 text-gray-700';
      case 'Больничный': return 'bg-red-100 text-red-700';
      case 'Отпуск': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Выездные сотрудники ({filteredEmployees.length})</CardTitle>
            <Input 
              placeholder="Поиск по ФИО, должности или территории..." 
              className="w-96" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ФИО</TableHead>
                <TableHead>Должность</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Территория</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Компетенции</TableHead>
                <TableHead>График</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {emp.fullName}
                      {emp.licensed && (
                        <Badge variant="outline" className="text-xs">
                          <Icon name="Award" size={12} className="mr-1" />
                          Лицензия
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{emp.position}</TableCell>
                  <TableCell>{emp.phone}</TableCell>
                  <TableCell>{emp.territory}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(emp.status)}>{emp.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {emp.competencies.slice(0, 2).map((comp) => (
                        <Badge key={comp} variant="secondary" className="text-xs">
                          {comp}
                        </Badge>
                      ))}
                      {emp.competencies.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{emp.competencies.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{emp.workSchedule}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(emp)}>
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onDelete(emp.id)}>
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

export default EmployeesList;
