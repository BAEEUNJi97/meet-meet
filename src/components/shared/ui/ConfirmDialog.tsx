import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface CheckingModalProps {
    open: boolean;
    text: string;
    onClose: () => void;
    onConfirm?: () => void;
    needLogin?: boolean;
}

/**
 * 프로젝트 공용 팝업 모달
 * @param open 모달 열기 여부
 * @param text 모달에 표시할 텍스트
 * @param onClose 닫기 함수
 * @param onConfirm 확인 함수
 * @param needLogin 로그인 필요 여부 (로그인 페이지로 리다이렉트)
 * @returns 모달 팝업
 */
export default function ConfirmDialog({ open, text, onClose, onConfirm, needLogin }: CheckingModalProps) {
    const router = useRouter();

    if (!open) return null;

    const handleConfirm = () => {
        onClose();
        if (onConfirm) onConfirm();
        else if (needLogin) router.push('/login');
    };

    return (
        <div className="fixed inset-0 z-50 px-4 sm:px-0 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 sm:w-100 flex flex-col gap-4">
                <div className='flex justify-between items-center'>
                    <span className="text-lg font-semibold">{text}</span>
                    <button
                        onClick={onClose}
                        className='cursor-pointer hover:opacity-60 hover:text-button transition'
                    >
                        <X className='w-6 h-6' />
                    </button>
                </div>
                <button
                    className="px-6 py-2 bg-main-500 text-white rounded-md cursor-pointer hover:bg-main-600 transition"
                    onClick={handleConfirm}
                >
                    확인
                </button>
            </div>
        </div>
    );
}

