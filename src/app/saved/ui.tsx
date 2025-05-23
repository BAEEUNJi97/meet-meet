'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Gathering } from '@/lib/types/gatherings';
import { getSavedGatherings, setSavedGatherings } from '@/lib/api/gatherings';
import axios from 'axios';

export default function LikedMeetingsPage() {
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<'DALLAEMFIT' | 'WORKATION'>('DALLAEMFIT');
  const [selectedType, setSelectedType] = useState<'ALL' | 'OFFICE_STRETCHING' | 'MINDFULNESS'>('ALL');

  // 찜 목록 조회
  const { data: likedList = [] } = useQuery({
    queryKey: ['savedGatherings'],
    queryFn: getSavedGatherings,
    staleTime: Infinity,
  });

  // 찜 토글 기능
  const toggleSavedMutation = useMutation({
    mutationFn: (gatheringId: string) => {
      const currentSaved = getSavedGatherings();
      const newSaved = currentSaved.includes(gatheringId)
        ? currentSaved.filter(id => id !== gatheringId)
        : [...currentSaved, gatheringId];
      setSavedGatherings(newSaved);
      return Promise.resolve(newSaved);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedGatherings'] });
    },
  });

  // 전체 모임 목록 불러오기
  const { data: meetings = [] } = useQuery<Gathering[]>({
    queryKey: ['allGatherings'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/gatherings', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    },
  });

  // 찜한 모임 중 필터 조건에 맞는 항목만 필터링
  const likedGatherings = meetings.filter((g) => {
    if (!likedList.includes(String(g.id))) return false;
    if (selectedCategory === 'DALLAEMFIT') {
      if (selectedType === 'ALL') {
        return g.type === 'OFFICE_STRETCHING' || g.type === 'MINDFULNESS';
      } else {
        return g.type === selectedType;
      }
    } else {
      return g.type === 'WORKATION';
    }
  });

  return (
    <main className="contents-container">
      {/* 헤더 */}
      <div className="flex items-center gap-[13px] h-[72px]">
        <div className="w-[72px] h-[72px]">
          <Image src="/icons/saved-logo.svg" alt="찜 아이콘" width={72} height={72} className="pointer-events-none"/>
        </div>
        <div className="flex flex-col justify-center gap-[4px]">
          <h1 className="text-[24px] font-semibold leading-[32px] text-gray-900">찜한 모임</h1>
          <p className="text-[14px] font-medium leading-[20px] text-gray-700">마감되기 전에 지금 바로 참여해보세요 👀</p>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex items-center justify-between">
        <button onClick={() => setSelectedCategory('DALLAEMFIT')} className={`${selectedCategory === 'DALLAEMFIT' ? "px-4 py-2 border-b-2 border-[#A864E4] font-medium text-[#] flex items-center" : "px-4 py-2 text-gray-500 flex items-center"}`}>
          달램핏 ☪️
        </button>
        <button onClick={() => setSelectedCategory('WORKATION')} className={`${selectedCategory === 'WORKATION' ? "px-4 py-2 border-b-2 border-[#A864E4] font-medium text-[#] flex items-center" : "px-4 py-2 text-gray-500 flex items-center"}`}>
          워케이션 ⭐
        </button>
      </div>

      {/* 서브 타입 필터 */}
      {selectedCategory === 'DALLAEMFIT' && (
        <div className="flex gap-2 py-3 border-b border-gray-200">
          {['ALL', 'OFFICE_STRETCHING', 'MINDFULNESS'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as any)}
              className={`${selectedType === type ? "bg-gray-800 text-white" : "bg-white border text-gray-700"} px-4 py-1.5 rounded-full text-sm`}
            >
              {type === 'ALL' ? '전체' : type === 'OFFICE_STRETCHING' ? '오피스 스트레칭' : '마인드풀'}
            </button>
          ))}
        </div>
      )}

      {/* 모임 카드 목록 */}
      <div className="space-y-6 pt-4">
        {likedGatherings.map((gathering) => {
          const isLiked = likedList.includes(String(gathering.id));
          return (
            <div key={gathering.id} className="border rounded-lg overflow-hidden shadow-sm flex flex-col md:flex-row">
              {/* 이미지 영역 */}
              <div className="relative w-full md:w-[20rem] h-[14rem]">
                <div className="absolute top-2 left-2 bg-main-300 text-white text-xs font-semibold rounded-full px-3 py-1 z-10 flex items-center">
                  <span className="text-white mr-1">🔔</span>
                  <span className="font-medium">오늘 21시 마감</span>
                </div>
                <Image
                  src={gathering.image || '/placeholder.jpg'}
                  alt="모임 이미지"
                  fill
                  className="rounded-t-lg sm:rounded-l-lg sm:rounded-t-none object-cover pointer-events-none"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* 정보 영역 */}
              <div className="flex-1 p-4 flex flex-col justify-between mb-5">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <h1 className="text-lg font-semibold">{gathering.name}</h1>
                      <span className="text-gray-400">|</span>
                      <span className="text-gray-500">{gathering.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSavedMutation.mutate(String(gathering.id))}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isLiked ? 'bg-main-300 text-white' : 'bg-[#fff0f5] text-main-300'
                    }`}
                  >
                    <Heart fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm font-medium mb-1 text-main-300">
                    <span><span>👤</span>18/20</span>
                    <span className="text-right">개설확정</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-main-300 h-2 rounded-full w-[90%]" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* 찜한 모임이 없을 때 */}
        {likedGatherings.length === 0 && (
          <div className="w-full h-[100px] flex flex-col justify-center items-center border-2 border-gray-500">
            <p className="text-gray-600 font-medium">아직 찜한 모임이 없어요</p>
            <p className="text-gray-600 font-medium">관심있는 모임을 찜해보세요!</p>
          </div>
        )}
      </div>
    </main>
  );
}