import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Employee, EmployeeStatus } from '@/types/snrd';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface EmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (emp: Partial<Employee>) => void;
  employee?: Employee | null;
}

const EmployeeModal = ({ open, onClose, onSave, employee }: EmployeeModalProps) => {
  const [formData, setFormData] = useState<Partial<Employee>>({
    fullName: '',
    position: '',
    phone: '',
    email: '',
    status: 'На смене',
    competencies: [],
    workSchedule: '5/2',
    employmentType: 'Сотрудник компании',
    territory: '',
    workGroup: '',
    licensed: false,
  });

  const [newCompetency, setNewCompetency] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({
        fullName: '',
        position: '',
        phone: '',
        email: '',
        status: 'На смене',
        competencies: [],
        workSchedule: '5/2',
        employmentType: 'Сотрудник компании',
        territory: '',
        workGroup: '',
        licensed: false,
      });
    }
    setErrors({});
    setNewCompetency('');
  }, [employee, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName?.trim()) newErrors.fullName = 'Введите ФИО';
    if (!formData.position?.trim()) newErrors.position = 'Введите должность';
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

    const dataToSave: Partial<Employee> = {
      ...formData,
      id: formData.id || `E${Date.now().toString().slice(-3)}`,
    };

    onSave(dataToSave);
    onClose();
  };

  const addCompetency = () => {
    if (newCompetency.trim() && !formData.competencies?.includes(newCompetency.trim())) {
      setFormData({
        ...formData,
        competencies: [...(formData.competencies || []), newCompetency.trim()],
      });
      setNewCompetency('');
    }
  };

  const removeCompetency = (comp: string) => {
    setFormData({
      ...formData,
      competencies: formData.competencies?.filter(c => c !== comp) || [],
    });
  };

  const predefinedCompetencies = [
    'Ремонт холодильного оборудования',
    'Обслуживание чиллеров',
    'Диагностика систем вентиляции',
    'Электромонтажные работы',
    'Сантехнические работы',
    'Обслуживание систем кондиционирования',
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{employee ? 'Редактировать сотрудника' : 'Добавить сотрудника'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">ФИО *</Label>
              <Input 
                id="fullName"
                value={formData.fullName || ''}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Иванов Иван Иванович"
                className={errors.fullName ? 'border-red-500' : ''}
              />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Должность *</Label>
              <Input 
                id="position"
                value={formData.position || ''}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="Инженер-техник"
                className={errors.position ? 'border-red-500' : ''}
              />
              {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон *</Label>
              <Input 
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (999) 123-45-67"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ivanov@snrd.ru"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData({ ...formData, status: value as EmployeeStatus })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="На смене">На смене</SelectItem>
                  <SelectItem value="Перерыв">Перерыв</SelectItem>
                  <SelectItem value="Обед">Обед</SelectItem>
                  <SelectItem value="Завершил смену">Завершил смену</SelectItem>
                  <SelectItem value="Больничный">Больничный</SelectItem>
                  <SelectItem value="Отпуск">Отпуск</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentType">Тип занятости</Label>
              <Select 
                value={formData.employmentType} 
                onValueChange={(value) => setFormData({ ...formData, employmentType: value as 'Сотрудник компании' | 'Подрядчик' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Сотрудник компании">Сотрудник компании</SelectItem>
                  <SelectItem value="Подрядчик">Подрядчик</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workSchedule">График работы</Label>
              <Input 
                id="workSchedule"
                value={formData.workSchedule || ''}
                onChange={(e) => setFormData({ ...formData, workSchedule: e.target.value })}
                placeholder="5/2, 2/2, Гибкий и т.д."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="territory">Территория обслуживания</Label>
              <Input 
                id="territory"
                value={formData.territory || ''}
                onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
                placeholder="Москва / ЦАО"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workGroup">Рабочая группа</Label>
            <Input 
              id="workGroup"
              value={formData.workGroup || ''}
              onChange={(e) => setFormData({ ...formData, workGroup: e.target.value })}
              placeholder="Группа 1"
            />
          </div>

          <div className="space-y-2">
            <Label>Компетенции</Label>
            <div className="flex gap-2">
              <Input 
                value={newCompetency}
                onChange={(e) => setNewCompetency(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCompetency())}
                placeholder="Добавить компетенцию..."
              />
              <Button type="button" onClick={addCompetency} size="sm">
                <Icon name="Plus" size={16} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.competencies?.map((comp) => (
                <Badge key={comp} variant="secondary" className="flex items-center gap-1">
                  {comp}
                  <button onClick={() => removeCompetency(comp)} className="ml-1 hover:text-red-600">
                    <Icon name="X" size={12} />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-2">Быстрый выбор:</p>
              <div className="flex flex-wrap gap-2">
                {predefinedCompetencies.map((comp) => (
                  <Button
                    key={comp}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (!formData.competencies?.includes(comp)) {
                        setFormData({
                          ...formData,
                          competencies: [...(formData.competencies || []), comp],
                        });
                      }
                    }}
                    disabled={formData.competencies?.includes(comp)}
                  >
                    {comp}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="licensed" 
              checked={formData.licensed}
              onCheckedChange={(checked) => setFormData({ ...formData, licensed: checked as boolean })}
            />
            <Label htmlFor="licensed" className="font-normal cursor-pointer">
              Имеет лицензию на работу с холодильным оборудованием
            </Label>
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

export default EmployeeModal;
