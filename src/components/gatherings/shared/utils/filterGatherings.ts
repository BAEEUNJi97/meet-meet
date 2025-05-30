// ✅ filterGatherings.ts
import { Gathering } from '@/types/gatherings';
import { Category, DallaemfitType } from '@/types/tabFilters';

const DALLAEMFIT_TYPES: DallaemfitType[] = [
  DallaemfitType.OFFICE_STRETCHING,
  DallaemfitType.MINDFULNESS,
];

export function filterGatherings(
  gatherings: Gathering[],
  likedIds: string[],
  filter: { category: Category; type: DallaemfitType }
): Gathering[] {
  return gatherings.filter((g) => {
    const isLiked = likedIds.includes(String(g.id));
    const isDallaemfit = filter.category === Category.DALLAEMFIT;
    const isTypeMatched = isDallaemfit
      ? filter.type === DallaemfitType.ALL
        ? DALLAEMFIT_TYPES.includes(g.type as DallaemfitType)
        : g.type === filter.type
      : g.type === filter.category;

    const passed = isLiked && isTypeMatched;

    if (passed) {
      console.log('[✅ 통과된 모임]', {
        id: g.id,
      isLiked,
        name: g.name,
        type: g.type,
        location: g.location,
        date: g.dateTime,
      });
    }

    return passed;
  });
}
