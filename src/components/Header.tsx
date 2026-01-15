import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeTab: string;
}

const Header = ({ activeTab }: HeaderProps) => {
  return (
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
  );
};

export default Header;
