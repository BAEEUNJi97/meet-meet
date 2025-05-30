
/**
 * 메인 탭 필터: 모임 주제
 */
export enum Category {
  DALLAEMFIT = 'DALLAEMFIT',
  WORKATION = 'WORKATION',
}

/**
 * 서브 탭 필터: 달램핏 세부 주제
 */
export enum DallaemfitType {
  ALL = 'ALL',
  OFFICE_STRETCHING = 'OFFICE_STRETCHING',
  MINDFULNESS = 'MINDFULNESS',
}

/**
 * 서브 탭 라벨 (UI용)
 */
export const DALLAEMFIT_LABEL: Record<DallaemfitType, string> = {
  ALL: '전체',
  OFFICE_STRETCHING: '엔터테인먼트',
  MINDFULNESS: '액티비티티',
};
