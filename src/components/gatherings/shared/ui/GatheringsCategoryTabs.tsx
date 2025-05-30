'use client';

import { Category } from '@/types/tabFilters';

interface Props {
  selected: Category;
  onChange: (category: Category) => void;
}

const GatheringsCategoryTabs = ({ selected, onChange }: Props) => {
  return (
    <div className="flex flex-row">
      <button
        onClick={() => onChange(Category.DALLAEMFIT)}
        className={`text-gray-900 text-lg font-semibold px-4 py-1 ${
          selected === Category.DALLAEMFIT ? 'border-b-2 border-gray-900' : ''
        }`}
      >
        E 복적복적 Meet
      </button>
      <button
        onClick={() => onChange(Category.WORKATION)}
        className={`text-gray-900 text-lg font-semibold px-4 py-1 ${
          selected === Category.WORKATION ? 'border-b-2 border-gray-900' : ''
        }`}
      >
        I 도란도란 Meet
      </button>
    </div>
  );
};

export default GatheringsCategoryTabs;
