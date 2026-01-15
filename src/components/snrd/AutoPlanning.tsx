import { useState } from 'react';
import { Play, Settings, Activity, TrendingUp, Users, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlanningConfig {
  algorithm: 'bee-colony' | 'genetic' | 'greedy';
  maxIterations: number;
  populationSize: number;
  considerTraffic: boolean;
  considerSkills: boolean;
  considerWorkload: boolean;
}

const AutoPlanning = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [config, setConfig] = useState<PlanningConfig>({
    algorithm: 'bee-colony',
    maxIterations: 1000,
    populationSize: 50,
    considerTraffic: true,
    considerSkills: true,
    considerWorkload: true,
  });

  const [results, setResults] = useState<{
    draftsCreated: number;
    totalApplications: number;
    averageScore: number;
    executionTime: number;
  } | null>(null);

  const handleRunPlanning = () => {
    setIsRunning(true);
    setProgress(0);
    setResults(null);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          setResults({
            draftsCreated: 24,
            totalApplications: 30,
            averageScore: 87.5,
            executionTime: 4.2,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Автоматическое планирование</h2>
        <p className="text-gray-600 mt-1">Массовое создание оптимальных черновиков работ с использованием алгоритма пчелиной колонии</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Заявок для планирования</p>
              <p className="text-2xl font-bold text-gray-900">30</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Доступных сотрудников</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Средняя загрузка</p>
              <p className="text-2xl font-bold text-gray-900">67%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="text-gray-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">Настройки планирования</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Алгоритм
              </label>
              <select
                value={config.algorithm}
                onChange={(e) => setConfig({ ...config, algorithm: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isRunning}
              >
                <option value="bee-colony">Алгоритм пчелиной колонии (рекомендуется)</option>
                <option value="genetic">Генетический алгоритм</option>
                <option value="greedy">Жадный алгоритм</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Максимум итераций: {config.maxIterations}
              </label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={config.maxIterations}
                onChange={(e) => setConfig({ ...config, maxIterations: parseInt(e.target.value) })}
                className="w-full"
                disabled={isRunning}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Размер популяции: {config.populationSize}
              </label>
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={config.populationSize}
                onChange={(e) => setConfig({ ...config, populationSize: parseInt(e.target.value) })}
                className="w-full"
                disabled={isRunning}
              />
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-200">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.considerTraffic}
                  onChange={(e) => setConfig({ ...config, considerTraffic: e.target.checked })}
                  className="rounded"
                  disabled={isRunning}
                />
                <span className="text-sm text-gray-700">Учитывать дорожную обстановку</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.considerSkills}
                  onChange={(e) => setConfig({ ...config, considerSkills: e.target.checked })}
                  className="rounded"
                  disabled={isRunning}
                />
                <span className="text-sm text-gray-700">Учитывать компетенции сотрудников</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.considerWorkload}
                  onChange={(e) => setConfig({ ...config, considerWorkload: e.target.checked })}
                  className="rounded"
                  disabled={isRunning}
                />
                <span className="text-sm text-gray-700">Балансировать загрузку сотрудников</span>
              </label>
            </div>
          </div>

          <Button
            onClick={handleRunPlanning}
            disabled={isRunning}
            className="w-full mt-6"
            size="lg"
          >
            <Play size={20} className="mr-2" />
            {isRunning ? 'Идёт планирование...' : 'Запустить планирование'}
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-gray-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">Результаты планирования</h3>
          </div>

          {isRunning && (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Прогресс выполнения</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Activity className="animate-spin" size={16} />
                <span>Оптимизация маршрутов и назначений...</span>
              </div>
            </div>
          )}

          {results && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="text-green-600" size={20} />
                  <span className="font-semibold text-green-900">Планирование завершено</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Создано черновиков:</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {results.draftsCreated} из {results.totalApplications}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Средний балл решения:</span>
                    <span className="text-sm font-semibold text-green-600">
                      {results.averageScore}%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Время выполнения:</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {results.executionTime} сек
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Метрики оптимизации:</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Снижение пробега</span>
                      <span>24%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '24%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Балансировка загрузки</span>
                      <span>89%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '89%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Соответствие компетенций</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => console.log('Navigate to drafts')}
              >
                Перейти к черновикам
              </Button>
            </div>
          )}

          {!isRunning && !results && (
            <div className="text-center py-12 text-gray-500">
              <Activity className="mx-auto mb-3" size={48} />
              <p>Запустите планирование для получения результатов</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoPlanning;
