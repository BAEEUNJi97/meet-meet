'use client';

import { useContext } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { AuthContext } from '@/providers/AuthProvider';
import { useTabFilter } from '@/hooks/gathering/useTabFilter';
import { useFilteredGatherings } from '@/hooks/gathering/useFilteredGatherings';
import GatheringsCategoryTabs from '@/components/gatherings/shared/ui/GatheringsCategoryTabs';
import GatheringsFilterTabs from '@/components/gatherings/shared/ui/GatheringsFilterTabs';
import TabLocationDateSortControls from '@/components/gatherings/shared/ui/TabLocationDateSortControls';
import { Review, ReviewItem } from '@/types/reviews';

export default function ReviewPage() {
const {
  filter,
  selectedLocation,
  selectedDate,
  sortBy,
  setLocation,
  setDate,
  setSort,
  handleCategoryChange,
  handleTypeChange,
} = useTabFilter();

const filterState = {
  filter,
  selectedLocation,
  selectedDate,
  sortBy,
};

  const { token } = useContext(AuthContext);

const {
  data: reviewResponse,
  isLoading,
  error,
} = useFilteredGatherings<Review>('/api/reviews', filterState, token ?? undefined)

  const reviews: ReviewItem[] = reviewResponse?.data ?? [];

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.score, 0)
      : 0;

  const ratingCounts: Record<1 | 2 | 3 | 4 | 5, number> = {
    5: reviews.filter((r: ReviewItem) => r.score === 5).length,
    4: reviews.filter((r: ReviewItem) => r.score === 4).length,
    3: reviews.filter((r: ReviewItem) => r.score === 3).length,
    2: reviews.filter((r: ReviewItem) => r.score === 2).length,
    1: reviews.filter((r: ReviewItem) => r.score === 1).length,
  };

  const maxCount = Math.max(...Object.values(ratingCounts));

  const HeartRating = ({ score }: { score: number }) => (
    <div className="flex gap-[2px]">
      {[...Array(5)].map((_, i) => (
        <Heart
          key={i}
          className={`w-4 h-4 ${
            i < score ? 'fill-main-500 stroke-main-500' : 'fill-gray-200 stroke-gray-200'
          }`}
        />
      ))}
    </div>
  );

  return (
    <main className="contents-container">
      <div className="w-full flex flex-col">
        <div className="w-full pt-10 flex flex-row justify-between items-center">
          <Image
            src="/icons/saved-logo.svg"
            alt="찜 아이콘"
            width={70}
            height={70}
            className="rounded-full border-2 border-black mr-1 pointer-events-none"
            priority
          />
          <div className="w-full flex flex-col justify-start px-2">
            <p className="text-[#374151] text-sm font-medium mb-2">모임 리뷰</p>
            <p className="text-gray-900 text-lg font-semibold">다른 사람들의 후기를 참고해보세요 👀</p>
          </div>
        </div>

        <div className="w-full flex flex-col justify-start py-5">
          <GatheringsCategoryTabs selected={filter.category} onChange={handleCategoryChange} />
          {filter.category === 'DALLAEMFIT' && (
            <GatheringsFilterTabs selected={filter.type} onChange={handleTypeChange} />
          )}
        </div>

        <TabLocationDateSortControls
          selectedLocation={selectedLocation}
          setLocation={setLocation}
          selectedDate={selectedDate}
          setDate={setDate}
          sortBy={sortBy}
          setSort={setSort}
          showSort={true}
        />
      </div>

      <section className="bg-white border border-gray-200 px-6 py-6 rounded-lg mb-10">
        <div className="flex items-center gap-6">
          <div className="w-40 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {average.toFixed(1)}<span className="text-gray-500 text-lg"> / 5</span>
            </h2>
            {average > 0 ? (
              <HeartRating score={Math.round(average)} />
            ) : (
              <>
                <HeartRating score={0} />
                <span className="text-xs text-gray-400 mt-1">리뷰가 없습니다</span>
              </>
            )}
          </div>

          <div className="flex-1 max-w-[20rem]">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center mb-1">
                <span className="w-6 text-xs">{rating}점</span>
                <div className="flex-1 bg-gray-100 h-2 rounded-full mx-2 overflow-hidden">
                  <div
                    className="h-full bg-main-500 transition-all duration-300"
                    style={{
                      width: maxCount
                        ? `${(ratingCounts[rating as 1 | 2 | 3 | 4 | 5] / maxCount) * 100}%`
                        : '0%',
                    }}
                  />
                </div>
                <span className="w-6 text-xs text-right">
                  {ratingCounts[rating as 1 | 2 | 3 | 4 | 5]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-gray-900">📝 모든 리뷰</h3>
        {isLoading && <p className="text-gray-500">리뷰 불러오는 중...</p>}
        {error && <p className="text-red-500">에러 발생: {(error as Error).message}</p>}
        {!isLoading &&
          !error &&
          reviews.map((review: ReviewItem) => (
            <div key={review.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex gap-4">
                <div className="w-[10rem] h-[6rem] relative rounded-lg overflow-hidden">
                  <Image
                    src={review.Gathering.image || '/images/placeholder.jpg'}
                    alt="review image"
                    fill
                    className="object-cover pointer-events-none"
                  />
                </div>
                <div className="flex-1">
                  <HeartRating score={review.score} />
                  <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {review.Gathering.name} · {review.Gathering.location}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {review.User.name} | {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
