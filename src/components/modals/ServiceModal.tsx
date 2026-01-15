import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ServiceModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (service: any) => void;
  service?: any;
}

const ServiceModal = ({ open, onClose, onSave, service }: ServiceModalProps) => {
  const [formData, setFormData] = useState(service || {
    name: '',
    price: 0,
    time: '',
    materials: 0,
    profitability: 0,
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService = {
      ...formData,
      id: service?.id || Date.now(),
    };
    onSave(newService);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{service ? 'Редактировать услугу' : 'Добавить новую услугу'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name">Название услуги</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="ТО чиллера (базовое)"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Цена (₽)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Время выполнения</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="4 ч"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="materials">Материалов (позиций)</Label>
              <Input
                id="materials"
                type="number"
                value={formData.materials}
                onChange={(e) => setFormData({ ...formData, materials: parseInt(e.target.value) || 0 })}
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profitability">Рентабельность (%)</Label>
              <Input
                id="profitability"
                type="number"
                value={formData.profitability}
                onChange={(e) => setFormData({ ...formData, profitability: parseInt(e.target.value) || 0 })}
                min="0"
                max="100"
                required
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Описание / Спецификация</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Детальное описание услуги, необходимые материалы, этапы работ..."
                rows={4}
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

export default ServiceModal;
