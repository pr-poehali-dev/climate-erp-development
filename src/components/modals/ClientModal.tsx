import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ClientModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (client: any) => void;
  client?: any;
}

const ClientModal = ({ open, onClose, onSave, client }: ClientModalProps) => {
  const [formData, setFormData] = useState(client || {
    name: '',
    objects: 0,
    equipment: 0,
    contract: 'Активен',
    contact: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient = {
      ...formData,
      id: client?.id || Date.now(),
      lastService: client?.lastService || new Date().toISOString().split('T')[0],
    };
    onSave(newClient);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{client ? 'Редактировать клиента' : 'Добавить нового клиента'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name">Название организации</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder='ООО "Название"'
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="objects">Количество объектов</Label>
              <Input
                id="objects"
                type="number"
                value={formData.objects}
                onChange={(e) => setFormData({ ...formData, objects: parseInt(e.target.value) || 0 })}
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="equipment">Единиц оборудования</Label>
              <Input
                id="equipment"
                type="number"
                value={formData.equipment}
                onChange={(e) => setFormData({ ...formData, equipment: parseInt(e.target.value) || 0 })}
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contract">Статус договора</Label>
              <Select value={formData.contract} onValueChange={(value) => setFormData({ ...formData, contract: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Активен">Активен</SelectItem>
                  <SelectItem value="На продлении">На продлении</SelectItem>
                  <SelectItem value="Приостановлен">Приостановлен</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Контактное лицо</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="Иванов Иван Иванович"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@company.ru"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit">Сохранить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientModal;
