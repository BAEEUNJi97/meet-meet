import { PageProps } from '@/types/pageProps';
import GatheringsDetailPageUI from './ui';

export default function GatheringsDetailPage({ params }: PageProps) {
    return <GatheringsDetailPageUI params={params} />
}