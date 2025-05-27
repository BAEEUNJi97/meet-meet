/** 
 * 날짜 형식 변환
 * @param dateTime 날짜
 * @returns YYYY-MM-DD 변환
 */
export function formatDate(dateTime: string) {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
}

/** 
 * 시간 형식 변환
 * @param dateTime 시간
 * @returns HH:MM 변환
 */
export function formatTime(dateTime: string) {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[1].slice(0, 5);
}

/**
 * 마감시간 계산
 * @param registrationEnd 마감시간
 * @returns '남은 시간' 또는 '마감됨' 반환
 */
export const getTimeRemaining = (registrationEnd: string) => {
    const end = new Date(registrationEnd);
    const now = new Date();
    const diff = end.getTime() - now.getTime();

    // 이미 마감된 경우
    if (diff < 0) {
        return '마감됨';
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    // 1일 이상 남은 경우
    if (days > 0) {
        return `${days}일 후 마감`;
    }

    // 1시간 이상 남은 경우
    if (hours > 0) {
        return `${hours}시간 후 마감`;
    }

    // 1시간 미만인 경우
    if (minutes > 0) {
        return `${minutes}분 후 마감`;
    }

    // 1분 미만인 경우
    return '곧 마감';
};