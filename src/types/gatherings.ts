/**
 * 모임 프로퍼티
 * @type {string} teamId 팀 아이디
 * @type {number} id 모임 아이디
 * @type {"DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION"} type 모임 타입 (타입 리터럴)
 * @type {string} name 모임 이름
 * @type {string} dateTime 모임 날짜와 시간
 * @type {string} registrationEnd 참여 마감 일시
 * @type {string} location 모임 위치
 * @type {number} participantCount 모임 참여자 수
 * @type {number} capacity 모임 최대 정원
 * @type {string} image 모임 썸네일
 * @type {number} createdBy 모임 생성자 아이디
 * @type {string} canceledAt 모임 취소 일시
 */
export interface Gathering {
    teamId: string;
    id: number;
    type: "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
    name: string;
    dateTime: string;
    registrationEnd: string;
    location: string;
    participantCount: number;
    capacity: number;
    image: string;
    createdBy: number;
    canceledAt: string | null;
}

/**
 * 모임 목록 컴포넌트 프로퍼티
 * @type {Gathering[]} gatherings 모임 목록
 * @type {boolean} loading 로딩 여부
 * @type {string} error 에러 메시지
 * @type {string[]} savedGatheringIds 저장된 모임 아이디 배열
 * @type {function} onToggleSaved 저장된 모임 아이디 배열 업데이트 함수
 * @type {boolean} fetchFromApi API 호출 여부
 */
export interface GatheringsListProps {
    gatherings?: Gathering[];
    loading?: boolean;
    error?: string;
    savedGatheringIds?: string[];
    onToggleSaved?: (id: string) => void;
    fetchFromApi?: boolean;
}

/**
 * 참여한 모임 프로퍼티
 * @type {string} joinedAt 참여 일시
 * @type {boolean} isCompleted 마감 여부
 * @type {boolean} isReviewed 나의 리뷰 작성 여부
 */
export interface JoinedGathering extends Gathering {
    joinedAt: string;
    isCompleted: boolean;
    isReviewed: boolean;
}