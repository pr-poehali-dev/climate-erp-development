import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
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
  );
};

export default Sidebar;
