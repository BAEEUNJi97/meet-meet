'use client';

import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/providers/AuthProvider';

interface Gathering {
  id: number;
  name: string;
  image: string;
  location: string;
  type: string;
  participantCount: number;
  capacity: number;
  dateTime: string;
  createdBy: number;
}

export default function CreatedGatherings() {
  const { token, userId } = useContext(AuthContext);
  const router = useRouter();

  const fetchCreatedGatherings = async (
    token: string,
  ): Promise<Gathering[]> => {
    const { data } = await axios.get(
      `/api/gatherings?createdBy=${userId}&limit=1000`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
  };

  const {
    data: gatherings = [],
    isLoading,
    error,
  } = useQuery<Gathering[], Error>({
    queryKey: ['createdGatherings', token],
    queryFn: () => fetchCreatedGatherings(token!),
    enabled: !!token,
  });

  const isEmpty = !isLoading && !error && gatherings.length === 0;

  return (
    <div className="flex w-full flex-col gap-4">
      {isLoading && <div className="text-center text-gray-500">로딩 중...</div>}
      {error && (
        <div className="text-center text-red-500">
          에러 발생: {(error as Error).message}
        </div>
      )}
      {isEmpty && (
        <div className="text-center text-gray-700">
          내가 만든 모임이 없어요.
        </div>
      )}

      {!isLoading &&
        !error &&
        gatherings.map(g => (
          <button
            key={g.id}
            className="w-full rounded-lg border-2 p-4 text-left hover:opacity-80"
            onClick={() => router.push(`/gatherings/detail/${g.id}`)}
          >
            <h3 className="text-lg font-semibold">{g.name}</h3>
            <Image
              src={g.image}
              alt="모임 이미지"
              className="my-2 rounded-lg"
              width={100}
              height={100}
            />
            <p className="text-gray-600">위치: {g.location}</p>
            <p className="text-gray-600">유형: {g.type}</p>
            <p className="text-gray-600">
              참여자 수: {g.participantCount}/{g.capacity}
            </p>
            <p className="text-gray-600">
              일시: {new Date(g.dateTime).toLocaleString()}
            </p>
          </button>
        ))}
    </div>
  );
}
