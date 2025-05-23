import { Metadata } from 'next';
import AllReviewsUI from './ui';

export const metadata: Metadata = {
  title: '모든 리뷰 | Meet2',
  description: '미밋을 이용한 분들은 이렇게 느꼈어요.',
};

export default function AllReviewsPage() {
  return <AllReviewsUI />;
}
