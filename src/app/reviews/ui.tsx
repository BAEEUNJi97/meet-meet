'use client';


import Image from 'next/image';



export default function LikedMeetingsPage() {
 
  return (
    <main className="contents-container">
    {/* ✅ 로고 + 텍스트 묶음 */}
      <div className="flex items-center gap-[13px] h-[72px]">
        <div className="w-[72px] h-[72px]">
           <Image src="/icons/saved-logo.svg" alt="찜 아이콘" width={72} height={72} className="pointer-events-none" />
        </div>
        <div className="flex flex-col justify-center gap-[4px]">
          <h1 className="text-[24px] font-semibold leading-[32px] text-gray-900">
            모든 리뷰
          </h1>
          <p className="text-[14px] font-medium leading-[20px] text-gray-700">
           미밋을 이용한 분들은 이렇게 느꼈어요 ♥️
          </p>
        </div>
      </div>
      <div className="">
      <div className="flex items-center justify-between  ">
        <div className=" flex ">
          <button className="px-4 py-2 border-b-2 border-[#A864E4] font-medium text-[#] flex items-center">
            달램핏 <span className="ml-1">☪️</span>
          </button>
        </div>
        <div className="flex-1 flex ">
          <button className="px-4 py-2 text-gray-500 flex items-center">
            위케이션 <span className="ml-1">⭐</span>
          </button>
        </div>
      </div>
    </div>
      

      
    </main>
  );
}