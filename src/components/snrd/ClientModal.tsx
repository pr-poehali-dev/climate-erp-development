import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Client, ContractStatus } from '@/types/snrd';

interface ClientModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (client: Partial<Client>) => void;
  client?: Client | null;
}

const ClientModal = ({ open, onClose, onSave, client }: ClientModalProps) => {
  const [formData, setFormData] = useState<Partial<Client>>({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    contract: 'Активен',
    slaAgreement: '',
    objectsCount: 0,
    assetsCount: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (client) {
      setFormData(client);
    } else {
      setFormData({
        name: '',
        contactPerson: '',
        phone: '',
        email: '',
        contract: 'Активен',
        slaAgreement: '',
        objectsCount: 0,
        assetsCount: 0,
      });
    }
    setErrors({});
  }, [client, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = 'Введите название компании';
    if (!formData.contactPerson?.trim()) newErrors.contactPerson = 'Введите контактное лицо';
    if (!formData.phone?.trim()) newErrors.phone = 'Введите телефон';
    if (!formData.email?.trim()) newErrors.email = 'Введите email';
    if (formData.email && !formData.email.includes('@')) newErrors.email = 'Некорректный email';
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const dataToSave: Partial<Client> = {
      ...formData,
      id: formData.id || `C${Date.now().toString().slice(-3)}`,
      slaAgreement: formData.slaAgreement || `SLA-${Date.now().toString().slice(-3)}`,
    };

    onSave(dataToSave);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{client ? 'Редактировать клиента' : 'Добавить клиента'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Название компании *</Label>
            <Input 
              id="name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder='ООО "Торговый Центр"'
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Контактное лицо *</Label>
              <Input 
                id="contactPerson"
                value={formData.contactPerson || ''}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder="Иванов Иван Иванович"
                className={errors.contactPerson ? 'border-red-500' : ''}
              />
              {errors.contactPerson && <p className="text-sm text-red-500">{errors.contactPerson}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Телефон *</Label>
              <Input 
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (495) 123-45-67"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input 
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="contact@company.ru"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contract">Статус договора</Label>
              <Select 
                value={formData.contract} 
                onValueChange={(value) => setFormData({ ...formData, contract: value as ContractStatus })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Активен">Активен</SelectItem>
                  <SelectItem value="На продлении">На продлении</SelectItem>
                  <SelectItem value="Истек">Истек</SelectItem>
                  <SelectItem value="Приостановлен">Приостановлен</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slaAgreement">Номер SLA соглашения</Label>
              <Input 
                id="slaAgreement"
                value={formData.slaAgreement || ''}
                onChange={(e) => setFormData({ ...formData, slaAgreement: e.target.value })}
                placeholder="SLA-001"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="objectsCount">Количество объектов обслуживания</Label>
              <Input 
                id="objectsCount"
                type="number"
                min="0"
                value={formData.objectsCount || 0}
                onChange={(e) => setFormData({ ...formData, objectsCount: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assetsCount">Количество активов</Label>
              <Input 
                id="assetsCount"
                type="number"
                min="0"
                value={formData.assetsCount || 0}
                onChange={(e) => setFormData({ ...formData, assetsCount: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Примечание:</strong> После создания клиента вы сможете добавить для него объекты обслуживания 
              и активы в соответствующих разделах справочников.
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

export default ClientModal;
