'use client';

import { DallaemfitType, DALLAEMFIT_LABEL } from '@/types/tabFilters';

interface Props {
  selected: DallaemfitType;
  onChange: (type: DallaemfitType) => void;
}

const GatheringsFilterTabs = ({ selected, onChange }: Props) => {
  return (
    <div className="w-full flex flex-col justify-start py-5 border-b-2 border-gray-200">
      <div className="flex flex-row items-center gap-2">
        {Object.values(DallaemfitType).map((type) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`${
              selected === type ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'
            } text-sm font-medium px-4 py-2 rounded-lg`}
          >
            {DALLAEMFIT_LABEL[type]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GatheringsFilterTabs;
