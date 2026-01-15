import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ServiceObject, Client, Employee } from '@/types/snrd';

interface ServiceObjectModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (obj: Partial<ServiceObject>) => void;
  serviceObject?: ServiceObject | null;
  clients: Client[];
  employees: Employee[];
  serviceObjects: ServiceObject[];
}

const ServiceObjectModal = ({ 
  open, 
  onClose, 
  onSave, 
  serviceObject, 
  clients, 
  employees,
  serviceObjects 
}: ServiceObjectModalProps) => {
  const [formData, setFormData] = useState<Partial<ServiceObject>>({
    name: '',
    type: 'Локация',
    clientId: '',
    address: '',
    coordinates: undefined,
    parentId: undefined,
    assignedEmployees: [],
    timezone: 'Europe/Moscow',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (serviceObject) {
      setFormData(serviceObject);
    } else {
      setFormData({
        name: '',
        type: 'Локация',
        clientId: '',
        address: '',
        coordinates: undefined,
        parentId: undefined,
        assignedEmployees: [],
        timezone: 'Europe/Moscow',
      });
    }
    setErrors({});
  }, [serviceObject, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = 'Введите название объекта';
    if (!formData.clientId) newErrors.clientId = 'Выберите клиента';
    if (!formData.address?.trim()) newErrors.address = 'Введите адрес';
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const dataToSave: Partial<ServiceObject> = {
      ...formData,
      id: formData.id || `OBJ-${Date.now().toString().slice(-4)}`,
    };

    onSave(dataToSave);
    onClose();
  };

  const availableParents = serviceObjects.filter(
    obj => obj.type === 'Локация' && obj.clientId === formData.clientId && obj.id !== formData.id
  );

  const toggleEmployee = (empId: string) => {
    const current = formData.assignedEmployees || [];
    if (current.includes(empId)) {
      setFormData({
        ...formData,
        assignedEmployees: current.filter(id => id !== empId),
      });
    } else {
      setFormData({
        ...formData,
        assignedEmployees: [...current, empId],
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {serviceObject ? 'Редактировать объект обслуживания' : 'Добавить объект обслуживания'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Название объекта *</Label>
              <Input 
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Сервер холодоснабжения №1"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Тип объекта</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData({ ...formData, type: value as 'Локация' | 'Актив', parentId: undefined })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Локация">Локация</SelectItem>
                  <SelectItem value="Актив">Актив</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientId">Клиент *</Label>
            <Select 
              value={formData.clientId} 
              onValueChange={(value) => setFormData({ ...formData, clientId: value, parentId: undefined })}
            >
              <SelectTrigger className={errors.clientId ? 'border-red-500' : ''}>
                <SelectValue placeholder="Выберите клиента" />
              </SelectTrigger>
              <SelectContent>
                {clients.map(client => (
                  <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.clientId && <p className="text-sm text-red-500">{errors.clientId}</p>}
          </div>

          {formData.type === 'Актив' && availableParents.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="parentId">Родительская локация (опционально)</Label>
              <Select 
                value={formData.parentId || 'none'} 
                onValueChange={(value) => setFormData({ ...formData, parentId: value === 'none' ? undefined : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Не указано" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Не указано</SelectItem>
                  {availableParents.map(loc => (
                    <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="address">Адрес *</Label>
            <Input 
              id="address"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="г. Москва, ул. Ленина, д. 10"
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Широта (опционально)</Label>
              <Input 
                id="latitude"
                type="number"
                step="0.000001"
                value={formData.coordinates?.lat || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  coordinates: {
                    lat: parseFloat(e.target.value) || 0,
                    lng: formData.coordinates?.lng || 0
                  }
                })}
                placeholder="55.751244"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longitude">Долгота (опционально)</Label>
              <Input 
                id="longitude"
                type="number"
                step="0.000001"
                value={formData.coordinates?.lng || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  coordinates: {
                    lat: formData.coordinates?.lat || 0,
                    lng: parseFloat(e.target.value) || 0
                  }
                })}
                placeholder="37.618423"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Часовой пояс</Label>
            <Select 
              value={formData.timezone} 
              onValueChange={(value) => setFormData({ ...formData, timezone: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Europe/Moscow">Europe/Moscow (UTC+3)</SelectItem>
                <SelectItem value="Europe/Kaliningrad">Europe/Kaliningrad (UTC+2)</SelectItem>
                <SelectItem value="Europe/Samara">Europe/Samara (UTC+4)</SelectItem>
                <SelectItem value="Asia/Yekaterinburg">Asia/Yekaterinburg (UTC+5)</SelectItem>
                <SelectItem value="Asia/Omsk">Asia/Omsk (UTC+6)</SelectItem>
                <SelectItem value="Asia/Krasnoyarsk">Asia/Krasnoyarsk (UTC+7)</SelectItem>
                <SelectItem value="Asia/Irkutsk">Asia/Irkutsk (UTC+8)</SelectItem>
                <SelectItem value="Asia/Yakutsk">Asia/Yakutsk (UTC+9)</SelectItem>
                <SelectItem value="Asia/Vladivostok">Asia/Vladivostok (UTC+10)</SelectItem>
                <SelectItem value="Asia/Magadan">Asia/Magadan (UTC+11)</SelectItem>
                <SelectItem value="Asia/Kamchatka">Asia/Kamchatka (UTC+12)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Назначенные сотрудники</Label>
            <div className="border rounded-lg p-4 max-h-48 overflow-y-auto space-y-2">
              {employees.map(emp => (
                <div key={emp.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{emp.fullName}</p>
                    <p className="text-sm text-gray-500">{emp.position} • {emp.territory}</p>
                  </div>
                  <Button
                    type="button"
                    variant={formData.assignedEmployees?.includes(emp.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleEmployee(emp.id)}
                  >
                    {formData.assignedEmployees?.includes(emp.id) ? 'Назначен' : 'Назначить'}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Подсказка:</strong> Локация — это место (здание, объект), а Актив — это оборудование внутри локации.
              Для активов можно указать родительскую локацию для иерархической структуры.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Отмена</Button>
          <Button onClick={handleSave}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceObjectModal;
