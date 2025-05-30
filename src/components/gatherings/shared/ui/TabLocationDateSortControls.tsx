'use client';

interface Props {
  selectedLocation: string;
  setLocation: (location: string) => void;
  selectedDate: string;
  setDate: (date: string) => void;
  sortBy: string;
  setSort: (sort: string) => void;
  showSort?: boolean; // ✅ 선택적 props 추가
}

export default function TabLocationDateSortControls({
  selectedLocation,
  setLocation,
  selectedDate,
  setDate,
  sortBy,
  setSort,
  showSort = true, // 기본값 true
}: Props) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <select
        value={selectedLocation}
        onChange={(e) => setLocation(e.target.value)}
        className="border px-3 py-2 rounded-lg text-sm"
      >
        <option value="">지역 전체</option>
        <option value="을지로3가">을지로3가</option>
        <option value="건대입구">건대입구</option>
        <option value="신림">신림</option>
        <option value="홍대입구">홍대입구</option>
      </select>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setDate(e.target.value)}
        className="border px-3 py-2 rounded-lg text-sm"
      />

      {showSort && ( // ✅ 조건부 렌더링 추가
        <select
          value={sortBy}
          onChange={(e) => setSort(e.target.value)}
          className="ml-auto border px-3 py-2 rounded-lg text-sm"
        >
          <option value="">정렬 선택</option>
          <option value="createdAt">최신순</option>
          <option value="score">리뷰 높은 순</option>
          <option value="participantCount">참여 인원 순</option>
        </select>
      )}
    </div>
  );
}
