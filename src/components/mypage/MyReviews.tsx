'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { AuthContext } from '@/providers/AuthProvider';
import ReviewDialog from './ReviewDialog';

interface Gathering {
  id: string;
  name: string;
  image: string;
  location: string;
  type: string;
  participantCount: number;
  capacity: number;
  dateTime: string;
  isCompleted?: boolean;
  isReviewed?: boolean;
}

export default function MyReviews() {
  const [reviews, setReviews] = useState(0);

  const teamId = process.env.TEAM_ID_DEV!;
  const { token, userId } = useContext(AuthContext);
  const router = useRouter();
  const [selectedReviewData, setSelectedReviewData] = useState<{
    teamId: string;
    userId: number;
    gatheringId: number;
  } | null>(null);

  const fetchGatherings = (token: string): Promise<Gathering[]> => {
    return axios
      .get('/api/gatherings/joined?&limit=1000', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => res.data);
  };

  const {
    data: gatherings = [],
    isLoading,
    error,
  } = useQuery<Gathering[], Error>({
    queryKey: ['myGatheringReviews', token],
    queryFn: () => fetchGatherings(token!),
    enabled: !!token && !!userId,
  });

  {
    /*isReviewed 여부로 작성/미작성 모임 분리*/
  }
  const reviewedGatherings = gatherings.filter(g => g.isReviewed);
  const writableGatherings = gatherings.filter(g => !g.isReviewed);
  const list = reviews === 0 ? writableGatherings : reviewedGatherings;

  const isSuccess = !isLoading && !error;
  const isEmpty = isSuccess && list.length === 0;

  return (
    <div className="flex w-full flex-col justify-start gap-5">
      {/* 탭 버튼 */}
      <div className="mx-5 flex items-center gap-2">
        <button
          onClick={() => setReviews(0)}
          className={`rounded-lg px-4 py-2 text-sm transition-colors ${reviews === 0 ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          작성 가능한 리뷰
        </button>
        <button
          onClick={() => setReviews(1)}
          className={`rounded-lg px-4 py-2 text-sm transition-colors ${reviews === 1 ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          작성한 리뷰
        </button>
      </div>

      {/* 상태 처리 */}
      {isLoading && (
        <div className="flex h-[100px] w-full items-center justify-center text-gray-500">
          로딩 중...
        </div>
      )}
      {error && (
        <div className="flex h-[100px] w-full items-center justify-center text-red-500">
          에러 발생: {(error as Error).message}
        </div>
      )}

      {/* 리뷰 없음 안내 */}
      {!isLoading && !error && isEmpty ? (
        <div className="flex h-[100px] w-full items-center justify-center text-gray-700">
          <h1>
            {reviews === 0
              ? '작성 가능한 리뷰가 없어요'
              : '아직 작성한 리뷰가 없어요'}
          </h1>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {list.map(g => (
            <div
              key={g.id}
              className="flex min-h-[100px] w-full flex-col rounded-lg border-2 border-blue-500 p-4 text-left transition hover:opacity-90"
            >
              <div
                className="cursor-pointer"
                onClick={() => router.push(`/gatherings/detail/${g.id}`)}
              >
                <h1 className="text-lg font-semibold">{g.name}</h1>
                <Image
                  src={g.image}
                  alt="모임 이미지"
                  className="my-2 rounded-lg"
                  width={100}
                  height={100}
                />
                <p className="text-gray-600">위치: {g.location}</p>
                <p className="text-gray-600">종류: {g.type}</p>
                <p className="text-gray-600">
                  참여자: {g.participantCount}/{g.capacity}명
                </p>
                {g.dateTime && (
                  <p className="text-gray-600">
                    날짜: {new Date(g.dateTime).toLocaleDateString()}
                  </p>
                )}
              </div>

              {reviews === 0 && (
                <div className="mt-4 self-end">
                  <button
                    className="bg-main-500 hover:bg-main-600 rounded-md px-4 py-2 text-sm text-white transition-colors"
                    onClick={() =>
                      setSelectedReviewData({
                        teamId: teamId,
                        userId: userId,
                        gatheringId: Number(g.id),
                      })
                    }
                  >
                    리뷰 작성하기
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {selectedReviewData && (
        <ReviewDialog
          reviewData={selectedReviewData}
          onClose={() => setSelectedReviewData(null)}
        />
      )}
    </div>
  );
}
