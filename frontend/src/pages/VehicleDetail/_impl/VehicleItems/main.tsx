import { useState } from 'react';
import type { VehicleItemsProps } from './types';
import type { VehicleItem } from '@/domain/vehicle/types';

export const VehicleItems = ({ itensSerie, opcionais }: VehicleItemsProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const ITEMS_LIMIT = 10;

  const groupByCategory = (items: VehicleItem[]) => {
    const grouped: Record<string, VehicleItem[]> = {};
    items.forEach((item) => {
      if (!grouped[item.categoria]) {
        grouped[item.categoria] = [];
      }
      grouped[item.categoria].push(item);
    });
    return grouped;
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const renderItemGroup = (title: string, items: VehicleItem[]) => {
    if (items.length === 0) return null;

    const grouped = groupByCategory(items);

    return (
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="space-y-4">
          {Object.entries(grouped).map(([category, categoryItems]) => {
            const isExpanded = expandedCategories[category];
            const visibleItems = isExpanded ? categoryItems : categoryItems.slice(0, ITEMS_LIMIT);
            const hasMore = categoryItems.length > ITEMS_LIMIT;

            return (
              <div key={category} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h4 className="text-lg font-medium text-gray-800 mb-3">{category}</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {visibleItems.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">{item.nome}</span>
                    </li>
                  ))}
                </ul>
                {hasMore && (
                  <button
                    onClick={() => toggleCategory(category)}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {isExpanded
                      ? 'Ver menos'
                      : `Ver mais (${categoryItems.length - ITEMS_LIMIT} itens)`}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Itens e Opcionais</h2>
      {renderItemGroup('Itens de Série', itensSerie)}
      {opcionais.length > 0 && renderItemGroup('Opcionais', opcionais)}
    </div>
  );
};
